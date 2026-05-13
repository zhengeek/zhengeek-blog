package com.zhengeek.blog.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zhengeek.blog.model.Article;

@Service
public class ArticleService {

  private static final String STATUS_PUBLISHED = "published";

  private final List<Article> articles;

  public ArticleService() {
    this.articles = new ArrayList<>();
    this.articles.add(new Article(
      1L,
      "zhengeek-devlog-01",
      "开发日志",
      "2026-05",
      "ZhenGeek Devlog 01：为什么我把博客升级成个人网站",
      "从静态博客到个人网站，把内容、项目和长期身份放到一个可持续演进的地方。",
      List.of("定位", "个人品牌", "项目路线"),
      STATUS_PUBLISHED,
      128,
      true,
      "这是一篇关于 ZhenGeek 升级路线的开发日志。先把文章 API 跑通，再逐步接入后台管理、数据库和真实内容流。"
    ));
    this.articles.add(new Article(
      2L,
      "vue3-vite-init-notes",
      "前端工程",
      "2026-05",
      "Vue 3 + Vite 初始化笔记",
      "记录 ZhenGeek 前端从项目结构、路由到基础样式的初始化过程。",
      List.of("Vue3", "Vite", "TypeScript"),
      STATUS_PUBLISHED,
      64,
      false,
      "Vue 3 和 Vite 很适合快速搭建个人网站前端。这个阶段关注结构清晰、页面可扩展，以及后端 API 能够稳定对接。"
    ));
    this.articles.add(new Article(
      3L,
      "git-add-commit-push",
      "工程习惯",
      "2026-04",
      "Git add / commit / push 工作流备忘",
      "一篇准备完善后再发布的 Git 日常工作流笔记。",
      List.of("Git", "工作流"),
      "draft",
      0,
      false,
      "草稿内容：整理常用 Git 命令、提交信息习惯，以及如何把小步提交变成可回溯的项目记录。"
    ));
    this.articles.add(new Article(
      4L,
      "zhengeek-v1-static-frontend-checklist",
      "项目归档",
      "2026-03",
      "ZhenGeek v1 静态前端检查清单",
      "早期静态前端阶段的检查清单，当前已经归档。",
      List.of("Checklist", "归档"),
      "archived",
      36,
      false,
      "归档内容：v1 静态页面阶段完成了基础展示，但后续会迁移到后端 API 驱动的内容结构。"
    ));
  }

  public List<Article> getPublishedArticles() {
    return articles.stream()
      .filter(article -> STATUS_PUBLISHED.equals(article.getStatus()))
      .sorted(Comparator.comparing(ArticleService::isNotPinned))
      .toList();
  }

  public Optional<Article> getPublishedArticleBySlug(String slug) {
    Optional<Article> article = articles.stream()
      .filter(item -> STATUS_PUBLISHED.equals(item.getStatus()))
      .filter(item -> item.getSlug().equals(slug))
      .findFirst();

    article.ifPresent(item -> item.setViewCount(item.getViewCount() + 1));
    return article;
  }

  public List<Article> getAdminArticles() {
    return List.copyOf(articles);
  }

  private static boolean isNotPinned(Article article) {
    return !Boolean.TRUE.equals(article.getIsPinned());
  }
}
