package com.zhengeek.blog.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
