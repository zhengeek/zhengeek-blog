package com.zhengeek.blog.service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zhengeek.blog.entity.ArticleEntity;
import com.zhengeek.blog.model.Article;
import com.zhengeek.blog.repository.ArticleRepository;

@Service
public class ArticleService {

  private static final String STATUS_PUBLISHED = "published";
  private static final String STATUS_DRAFT = "draft";
  private static final String STATUS_ARCHIVED = "archived";

  private final ArticleRepository articleRepository;

  public ArticleService(ArticleRepository articleRepository) {
    this.articleRepository = articleRepository;
  }

  public List<Article> getPublishedArticles() {
    return articleRepository.findByStatus(STATUS_PUBLISHED).stream()
      .sorted(ArticleService::comparePinnedFirst)
      .map(this::toModel)
      .toList();
  }

  public Optional<Article> getPublishedArticleBySlug(String slug) {
    Optional<ArticleEntity> article = articleRepository.findBySlug(slug)
      .filter(item -> STATUS_PUBLISHED.equals(item.getStatus()));

    article.ifPresent(item -> {
      item.setViewCount((item.getViewCount() == null ? 0 : item.getViewCount()) + 1);
      articleRepository.save(item);
    });

    return article.map(this::toModel);
  }

  public List<Article> getAdminArticles() {
    return articleRepository.findAll().stream()
      .sorted(ArticleService::comparePinnedFirst)
      .map(this::toModel)
      .toList();
  }

  public Optional<Article> getAdminArticleBySlug(String slug) {
    return articleRepository.findBySlug(slug).map(this::toModel);
  }

  public Article createArticle(Article article) {
    validateSlug(article.getSlug());

    if (articleRepository.existsBySlug(article.getSlug())) {
      throw new IllegalArgumentException("Article slug already exists");
    }

    ArticleEntity entity = toEntity(article);
    entity.setId(null);
    entity.setStatus(isBlank(entity.getStatus()) ? STATUS_DRAFT : entity.getStatus());
    entity.setViewCount(entity.getViewCount() == null ? 0 : entity.getViewCount());
    entity.setIsPinned(entity.getIsPinned() == null ? false : entity.getIsPinned());
    validateStatus(entity.getStatus());

    return toModel(articleRepository.save(entity));
  }

  public Optional<Article> updateArticle(Long id, Article article) {
    return articleRepository.findById(id)
      .map(existing -> {
        validateSlug(article.getSlug());
        validateStatus(article.getStatus());
        ensureSlugIsAvailableForUpdate(id, article.getSlug());

        updateEntityFromArticle(existing, article);
        return toModel(articleRepository.save(existing));
      });
  }

  public Optional<Article> updateArticleStatus(Long id, String status) {
    validateStatus(status);

    return articleRepository.findById(id)
      .map(article -> {
        article.setStatus(status);
        return toModel(articleRepository.save(article));
      });
  }

  public Optional<Article> updateArticlePinned(Long id, Boolean isPinned) {
    return articleRepository.findById(id)
      .map(article -> {
        article.setIsPinned(Boolean.TRUE.equals(isPinned));
        return toModel(articleRepository.save(article));
      });
  }

  private Article toModel(ArticleEntity entity) {
    Article article = new Article();
    article.setId(entity.getId());
    article.setSlug(entity.getSlug());
    article.setCategory(entity.getCategory());
    article.setDate(entity.getDate());
    article.setTitle(entity.getTitle());
    article.setSummary(entity.getSummary());
    article.setTags(toTagList(entity.getTags()));
    article.setStatus(entity.getStatus());
    article.setViewCount(entity.getViewCount());
    article.setIsPinned(entity.getIsPinned());
    article.setContent(entity.getContent());
    return article;
  }

  private ArticleEntity toEntity(Article article) {
    ArticleEntity entity = new ArticleEntity();
    entity.setId(article.getId());
    updateEntityFromArticle(entity, article);
    entity.setViewCount(article.getViewCount());
    return entity;
  }

  private void updateEntityFromArticle(ArticleEntity entity, Article article) {
    entity.setSlug(article.getSlug());
    entity.setTitle(article.getTitle());
    entity.setSummary(article.getSummary());
    entity.setContent(article.getContent());
    entity.setCategory(article.getCategory());
    entity.setDate(article.getDate());
    entity.setTags(toTagString(article.getTags()));
    entity.setStatus(article.getStatus());
    entity.setIsPinned(article.getIsPinned());
  }

  private void ensureSlugIsAvailableForUpdate(Long id, String slug) {
    articleRepository.findBySlug(slug)
      .filter(article -> !article.getId().equals(id))
      .ifPresent(article -> {
        throw new IllegalArgumentException("Article slug already exists");
      });
  }

  private static List<String> toTagList(String tags) {
    if (tags == null || tags.isBlank()) {
      return List.of();
    }

    return Arrays.stream(tags.split(","))
      .map(String::trim)
      .filter(tag -> !tag.isBlank())
      .toList();
  }

  private static String toTagString(List<String> tags) {
    if (tags == null || tags.isEmpty()) {
      return "";
    }

    return String.join(",", tags.stream()
      .map(String::trim)
      .filter(tag -> !tag.isBlank())
      .toList());
  }

  private static int comparePinnedFirst(ArticleEntity left, ArticleEntity right) {
    return Comparator.comparing(ArticleService::isNotPinned)
      .thenComparing(ArticleEntity::getId, Comparator.nullsLast(Comparator.naturalOrder()))
      .compare(left, right);
  }

  private static boolean isNotPinned(ArticleEntity article) {
    return !Boolean.TRUE.equals(article.getIsPinned());
  }

  private static void validateSlug(String slug) {
    if (isBlank(slug)) {
      throw new IllegalArgumentException("Article slug is required");
    }
  }

  private static boolean isBlank(String value) {
    return value == null || value.isBlank();
  }

  private static void validateStatus(String status) {
    if (!STATUS_DRAFT.equals(status) && !STATUS_PUBLISHED.equals(status) && !STATUS_ARCHIVED.equals(status)) {
      throw new IllegalArgumentException("Invalid article status");
    }
  }
}
