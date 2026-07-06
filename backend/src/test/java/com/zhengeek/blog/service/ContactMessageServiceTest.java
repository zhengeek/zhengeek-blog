package com.zhengeek.blog.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.zhengeek.blog.entity.ContactMessageEntity;
import com.zhengeek.blog.exception.BusinessException;
import com.zhengeek.blog.model.ContactMessageRequest;
import com.zhengeek.blog.model.ContactMessageResponse;
import com.zhengeek.blog.repository.ContactMessageRepository;

@ExtendWith(MockitoExtension.class)
class ContactMessageServiceTest {

  @Mock
  private ContactMessageRepository messageRepository;

  @Mock
  private ContactMessageNotificationService notificationService;

  @InjectMocks
  private ContactMessageService messageService;

  @Test
  void createsMessageAndTriggersNotification() {
    ContactMessageRequest request = request(" Cat ", "cat@example.com", "creative", " Hello ");
    when(messageRepository.save(any(ContactMessageEntity.class))).thenAnswer(invocation -> {
      ContactMessageEntity message = invocation.getArgument(0);
      message.setId(42L);
      return message;
    });

    ContactMessageResponse response = messageService.createMessage(request);

    assertEquals(42L, response.getId());
    verify(messageRepository).save(any(ContactMessageEntity.class));
    verify(notificationService).notifyNewMessage(any(ContactMessageEntity.class));
  }

  @Test
  void rejectsInvalidEmailWithoutSaving() {
    ContactMessageRequest request = request("Cat", "not-an-email", "creative", "Hello");

    assertThrows(BusinessException.class, () -> messageService.createMessage(request));

    verify(messageRepository, never()).save(any(ContactMessageEntity.class));
    verify(notificationService, never()).notifyNewMessage(any(ContactMessageEntity.class));
  }

  @Test
  void rejectsUnknownTopicWithoutSaving() {
    ContactMessageRequest request = request("Cat", "cat@example.com", "unknown", "Hello");

    assertThrows(BusinessException.class, () -> messageService.createMessage(request));

    verify(messageRepository, never()).save(any(ContactMessageEntity.class));
  }

  private static ContactMessageRequest request(String name, String email, String topic, String content) {
    ContactMessageRequest request = new ContactMessageRequest();
    request.setName(name);
    request.setEmail(email);
    request.setTopic(topic);
    request.setContent(content);
    return request;
  }
}
