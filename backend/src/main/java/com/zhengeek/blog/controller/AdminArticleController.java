package com.zhengeek.blog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhengeek.blog.exception.BusinessException;
import com.zhengeek.blog.model.Article;
import com.zhengeek.blog.service.ArticleService;

@RestController
@RequestMapping("/api/admin/articles")
public class AdminArticleController {

  private final ArticleService articleService;

  public AdminArticleController(ArticleService articleService) {
    this.articleService = articleService;
  }

  @GetMapping
  public List<Article> getAdminArticles() {
    return articleService.getAdminArticles();
  }

  @GetMapping("/slug/{slug}")
  public ResponseEntity<Article> getAdminArticleBySlug(@PathVariable String slug) {
    return articleService.getAdminArticleBySlug(slug)
      .map(ResponseEntity::ok)
      .orElseThrow(() -> new BusinessException(BusinessException.ARTICLE_NOT_FOUND, "Article not found"));
  }

  @PostMapping
  public ResponseEntity<Article> createArticle(@RequestBody Article article) {
    return ResponseEntity.status(201).body(articleService.createArticle(article));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
    return articleService.updateArticle(id, article)
      .map(ResponseEntity::ok)
      .orElseThrow(() -> new BusinessException(BusinessException.ARTICLE_NOT_FOUND, "Article not found"));
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<Article> updateArticleStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
    return articleService.updateArticleStatus(id, body.get("status"))
      .map(ResponseEntity::ok)
      .orElseThrow(() -> new BusinessException(BusinessException.ARTICLE_NOT_FOUND, "Article not found"));
  }

  @PatchMapping("/{id}/pin")
  public ResponseEntity<Article> updateArticlePinned(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
    return articleService.updateArticlePinned(id, body.get("isPinned"))
      .map(ResponseEntity::ok)
      .orElseThrow(() -> new BusinessException(BusinessException.ARTICLE_NOT_FOUND, "Article not found"));
  }
}
