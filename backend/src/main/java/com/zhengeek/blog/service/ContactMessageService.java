package com.zhengeek.blog.service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.zhengeek.blog.entity.ContactMessageEntity;
import com.zhengeek.blog.exception.BusinessException;
import com.zhengeek.blog.model.ContactMessageRequest;
import com.zhengeek.blog.model.ContactMessageResponse;
import com.zhengeek.blog.repository.ContactMessageRepository;

@Service
public class ContactMessageService {

  private static final int MAX_NAME_LENGTH = 80;
  private static final int MAX_EMAIL_LENGTH = 254;
  private static final int MAX_CONTENT_LENGTH = 4000;
  private static final Set<String> TOPICS = Set.of("creative", "studio", "technology", "casual");
  private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

  private final ContactMessageRepository messageRepository;
  private final ContactMessageNotificationService notificationService;

  public ContactMessageService(ContactMessageRepository messageRepository,
      ContactMessageNotificationService notificationService) {
    this.messageRepository = messageRepository;
    this.notificationService = notificationService;
  }

  public ContactMessageResponse createMessage(ContactMessageRequest request) {
    ContactMessageEntity message = validateAndMap(request);
    ContactMessageEntity savedMessage = messageRepository.save(message);
    notificationService.notifyNewMessage(savedMessage);
    return new ContactMessageResponse(savedMessage.getId(), savedMessage.getCreatedAt());
  }

  private ContactMessageEntity validateAndMap(ContactMessageRequest request) {
    if (request == null) {
      throw invalid("Message body is required");
    }

    String name = trim(request.getName());
    String email = trim(request.getEmail());
    String topic = trim(request.getTopic());
    String content = trim(request.getContent());

    if (name.isBlank() || name.length() > MAX_NAME_LENGTH) {
      throw invalid("Name is required and must not exceed 80 characters");
    }
    if (email.isBlank() || email.length() > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.matcher(email).matches()) {
      throw invalid("A valid email is required");
    }
    if (!TOPICS.contains(topic)) {
      throw invalid("Message topic is invalid");
    }
    if (content.isBlank() || content.length() > MAX_CONTENT_LENGTH) {
      throw invalid("Message content is required and must not exceed 4000 characters");
    }

    ContactMessageEntity message = new ContactMessageEntity();
    message.setVisitorName(name);
    message.setEmail(email);
    message.setTopic(topic);
    message.setContent(content);
    message.setCreatedAt(LocalDateTime.now());
    return message;
  }

  private static String trim(String value) {
    return value == null ? "" : value.trim();
  }

  private static BusinessException invalid(String message) {
    return new BusinessException(BusinessException.REQUEST_INVALID, message);
  }
}
