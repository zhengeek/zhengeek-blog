package com.zhengeek.blog.model;

import java.time.LocalDateTime;

public class ContactMessageResponse {

  private final Long id;
  private final LocalDateTime createdAt;

  public ContactMessageResponse(Long id, LocalDateTime createdAt) {
    this.id = id;
    this.createdAt = createdAt;
  }

  public Long getId() {
    return id;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
