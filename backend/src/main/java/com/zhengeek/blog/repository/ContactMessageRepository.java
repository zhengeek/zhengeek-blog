package com.zhengeek.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zhengeek.blog.entity.ContactMessageEntity;

public interface ContactMessageRepository extends JpaRepository<ContactMessageEntity, Long> {
}
