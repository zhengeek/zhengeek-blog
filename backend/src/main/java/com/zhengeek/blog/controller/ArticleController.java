package com.zhengeek.blog.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhengeek.blog.model.Article;
import com.zhengeek.blog.service.ArticleService;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

  private final ArticleService articleService;

  public ArticleController(ArticleService articleService) {
    this.articleService = articleService;
  }

  @GetMapping
  public List<Article> getArticles() {
    return articleService.getPublishedArticles();
  }

  @GetMapping("/{slug}")
  public ResponseEntity<Article> getArticleBySlug(@PathVariable String slug) {
    return articleService.getPublishedArticleBySlug(slug)
      .map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
