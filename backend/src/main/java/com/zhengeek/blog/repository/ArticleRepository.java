package com.zhengeek.blog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zhengeek.blog.entity.ArticleEntity;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Long> {

  Optional<ArticleEntity> findBySlug(String slug);

  boolean existsBySlug(String slug);

  List<ArticleEntity> findByStatus(String status);
}
