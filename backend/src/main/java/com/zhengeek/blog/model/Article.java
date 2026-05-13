package com.zhengeek.blog.model;

import java.util.List;

public class Article {

  private Long id;
  private String slug;
  private String category;
  private String date;
  private String title;
  private String summary;
  private List<String> tags;
  private String status;
  private Integer viewCount;
  private Boolean isPinned;
  private String content;

  public Article() {
  }

  public Article(Long id, String slug, String category, String date, String title, String summary,
      List<String> tags, String status, Integer viewCount, Boolean isPinned, String content) {
    this.id = id;
    this.slug = slug;
    this.category = category;
    this.date = date;
    this.title = title;
    this.summary = summary;
    this.tags = tags;
    this.status = status;
    this.viewCount = viewCount;
    this.isPinned = isPinned;
    this.content = content;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSlug() {
    return slug;
  }

  public void setSlug(String slug) {
    this.slug = slug;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public List<String> getTags() {
    return tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Integer getViewCount() {
    return viewCount;
  }

  public void setViewCount(Integer viewCount) {
    this.viewCount = viewCount;
  }

  public Boolean getIsPinned() {
    return isPinned;
  }

  public void setIsPinned(Boolean isPinned) {
    this.isPinned = isPinned;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
