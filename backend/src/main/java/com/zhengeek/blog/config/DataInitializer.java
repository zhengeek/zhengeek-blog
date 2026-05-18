package com.zhengeek.blog.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zhengeek.blog.entity.ArticleEntity;
import com.zhengeek.blog.repository.ArticleRepository;

@Configuration
public class DataInitializer {

  @Bean
  CommandLineRunner initializeArticles(ArticleRepository articleRepository) {
    return args -> {
      if (articleRepository.count() > 0) {
        return;
      }

      articleRepository.save(createArticle(
        "zhengeek-devlog-01",
        "Devlog",
        "2026-05",
        "ZhenGeek Devlog 01: why I upgraded the blog into a personal site",
        "A first note about turning ZhenGeek into a long-term personal website.",
        "positioning,personal-brand,roadmap",
        "published",
        128,
        true,
        "This devlog records why ZhenGeek is moving from static pages toward an API-backed content system."
      ));
      articleRepository.save(createArticle(
        "vue3-vite-init-notes",
        "Frontend",
        "2026-05",
        "Vue 3 + Vite initialization notes",
        "Notes about setting up the frontend structure, routes, styles, and API connection.",
        "Vue3,Vite,TypeScript",
        "published",
        64,
        false,
        "Vue 3 and Vite make the frontend fast to build. This article keeps track of the early setup decisions."
      ));
      articleRepository.save(createArticle(
        "git-add-commit-push",
        "Workflow",
        "2026-04",
        "Git add / commit / push workflow memo",
        "A draft note about daily Git workflow and small, readable commits.",
        "Git,workflow",
        "draft",
        0,
        false,
        "Draft content: collect common Git commands and explain how small commits create a useful project history."
      ));
      articleRepository.save(createArticle(
        "zhengeek-v1-static-frontend-checklist",
        "Archive",
        "2026-03",
        "ZhenGeek v1 static frontend checklist",
        "An archived checklist from the early static frontend stage.",
        "Checklist,archive",
        "archived",
        36,
        false,
        "Archived content: v1 finished the basic static pages before the project moved toward API-driven content."
      ));
    };
  }

  private static ArticleEntity createArticle(String slug, String category, String date, String title, String summary,
      String tags, String status, Integer viewCount, Boolean isPinned, String content) {
    ArticleEntity article = new ArticleEntity();
    article.setSlug(slug);
    article.setCategory(category);
    article.setDate(date);
    article.setTitle(title);
    article.setSummary(summary);
    article.setTags(tags);
    article.setStatus(status);
    article.setViewCount(viewCount);
    article.setIsPinned(isPinned);
    article.setContent(content);
    return article;
  }
}
