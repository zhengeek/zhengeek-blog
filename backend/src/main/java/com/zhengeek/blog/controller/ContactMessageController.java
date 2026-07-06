package com.zhengeek.blog.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhengeek.blog.model.ContactMessageRequest;
import com.zhengeek.blog.model.ContactMessageResponse;
import com.zhengeek.blog.service.ContactMessageService;

@RestController
@RequestMapping("/api/messages")
public class ContactMessageController {

  private final ContactMessageService messageService;

  public ContactMessageController(ContactMessageService messageService) {
    this.messageService = messageService;
  }

  @PostMapping
  public ResponseEntity<ContactMessageResponse> createMessage(@RequestBody ContactMessageRequest request) {
    return ResponseEntity.status(201).body(messageService.createMessage(request));
  }
}
