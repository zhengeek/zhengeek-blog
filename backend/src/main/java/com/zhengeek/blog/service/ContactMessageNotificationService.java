package com.zhengeek.blog.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.zhengeek.blog.entity.ContactMessageEntity;

@Service
public class ContactMessageNotificationService {

  private static final Logger LOGGER = LoggerFactory.getLogger(ContactMessageNotificationService.class);
  private static final Map<String, String> TOPIC_LABELS = Map.of(
    "creative", "创意探讨",
    "studio", "工作室合作",
    "technology", "技术研究",
    "casual", "随便聊聊"
  );

  private final ObjectProvider<JavaMailSender> mailSenderProvider;
  private final RestClient restClient;
  private final boolean emailEnabled;
  private final String emailFrom;
  private final String emailTo;
  private final String wecomWebhookUrl;

  public ContactMessageNotificationService(
      ObjectProvider<JavaMailSender> mailSenderProvider,
      RestClient.Builder restClientBuilder,
      @Value("${app.messages.notification.email.enabled:false}") boolean emailEnabled,
      @Value("${app.messages.notification.email.from:}") String emailFrom,
      @Value("${app.messages.notification.email.to:}") String emailTo,
      @Value("${app.messages.notification.wecom.webhook-url:}") String wecomWebhookUrl) {
    this.mailSenderProvider = mailSenderProvider;
    this.restClient = restClientBuilder.build();
    this.emailEnabled = emailEnabled;
    this.emailFrom = emailFrom;
    this.emailTo = emailTo;
    this.wecomWebhookUrl = wecomWebhookUrl;
  }

  @Async
  public void notifyNewMessage(ContactMessageEntity message) {
    sendEmail(message);
    sendWecomWebhook(message);
  }

  private void sendEmail(ContactMessageEntity message) {
    if (!emailEnabled || emailTo.isBlank()) {
      return;
    }

    JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
    if (mailSender == null) {
      LOGGER.warn("Message email notification is enabled, but no mail sender is configured");
      return;
    }

    try {
      SimpleMailMessage mail = new SimpleMailMessage();
      if (!emailFrom.isBlank()) {
        mail.setFrom(emailFrom);
      }
      mail.setTo(emailTo);
      mail.setReplyTo(message.getEmail());
      mail.setSubject("[CattoCake 留言] " + topicLabel(message.getTopic()));
      mail.setText(notificationText(message));
      mailSender.send(mail);
    } catch (RuntimeException exception) {
      LOGGER.warn("Failed to send email notification for message {}: {}",
        message.getId(), exception.getMessage());
    }
  }

  private void sendWecomWebhook(ContactMessageEntity message) {
    if (wecomWebhookUrl.isBlank()) {
      return;
    }

    try {
      restClient.post()
        .uri(wecomWebhookUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .body(Map.of(
          "msgtype", "text",
          "text", Map.of("content", notificationText(message))))
        .retrieve()
        .toBodilessEntity();
    } catch (RuntimeException exception) {
      LOGGER.warn("Failed to send WeCom notification for message {}: {}",
        message.getId(), exception.getMessage());
    }
  }

  private static String notificationText(ContactMessageEntity message) {
    return "新留言 #" + message.getId()
      + "\n名字：" + message.getVisitorName()
      + "\n邮箱：" + message.getEmail()
      + "\n主题：" + topicLabel(message.getTopic())
      + "\n内容：\n" + message.getContent();
  }

  private static String topicLabel(String topic) {
    return TOPIC_LABELS.getOrDefault(topic, topic);
  }
}
