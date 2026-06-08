package com.zhengeek.blog.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zhengeek.blog.exception.BusinessException;

@Service
public class TokenService {

  private static final String HMAC_ALGORITHM = "HmacSHA256";
  private static final String HEADER = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
  private static final TypeReference<Map<String, Object>> MAP_TYPE = new TypeReference<>() {
  };

  private final ObjectMapper objectMapper;
  private final String secret;
  private final long expiresInSeconds;

  public TokenService(
      ObjectMapper objectMapper,
      @Value("${app.jwt.secret:}") String secret,
      @Value("${app.jwt.expires-in-seconds:86400}") long expiresInSeconds) {
    this.objectMapper = objectMapper;
    this.secret = secret;
    this.expiresInSeconds = expiresInSeconds;
  }

  public TokenIssue createToken(String username) {
    ensureConfigured();

    long expiresAt = Instant.now().getEpochSecond() + expiresInSeconds;
    String payload = toJson(Map.of(
      "sub", username,
      "exp", expiresAt
    ));
    String headerPart = encode(HEADER.getBytes(StandardCharsets.UTF_8));
    String payloadPart = encode(payload.getBytes(StandardCharsets.UTF_8));
    String signature = sign(headerPart + "." + payloadPart);

    return new TokenIssue(headerPart + "." + payloadPart + "." + signature, expiresAt);
  }

  public String validateToken(String token) {
    ensureConfigured();

    String[] parts = token == null ? new String[0] : token.split("\\.");
    if (parts.length != 3) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Token is invalid");
    }

    String expectedSignature = sign(parts[0] + "." + parts[1]);
    if (!MessageDigest.isEqual(
        expectedSignature.getBytes(StandardCharsets.UTF_8),
        parts[2].getBytes(StandardCharsets.UTF_8))) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Token is invalid");
    }

    Map<String, Object> payload = parsePayload(parts[1]);
    long expiresAt = getLong(payload.get("exp"));
    if (expiresAt <= Instant.now().getEpochSecond()) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Token has expired");
    }

    Object username = payload.get("sub");
    if (!(username instanceof String value) || value.isBlank()) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Token is invalid");
    }

    return value;
  }

  private void ensureConfigured() {
    if (secret == null || secret.isBlank()) {
      throw new BusinessException(BusinessException.AUTH_CONFIG_MISSING, "JWT secret is not configured");
    }
  }

  private String sign(String value) {
    try {
      Mac mac = Mac.getInstance(HMAC_ALGORITHM);
      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM));
      return encode(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
    } catch (Exception exception) {
      throw new BusinessException(BusinessException.INTERNAL_ERROR, "Unable to sign token");
    }
  }

  private String toJson(Map<String, Object> payload) {
    try {
      return objectMapper.writeValueAsString(payload);
    } catch (Exception exception) {
      throw new BusinessException(BusinessException.INTERNAL_ERROR, "Unable to create token");
    }
  }

  private Map<String, Object> parsePayload(String payloadPart) {
    try {
      byte[] payload = Base64.getUrlDecoder().decode(payloadPart);
      return objectMapper.readValue(payload, MAP_TYPE);
    } catch (Exception exception) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Token is invalid");
    }
  }

  private static long getLong(Object value) {
    if (value instanceof Number number) {
      return number.longValue();
    }

    throw new BusinessException(BusinessException.AUTH_INVALID, "Token is invalid");
  }

  private static String encode(byte[] value) {
    return Base64.getUrlEncoder().withoutPadding().encodeToString(value);
  }

  public record TokenIssue(String token, long expiresAt) {
  }
}
