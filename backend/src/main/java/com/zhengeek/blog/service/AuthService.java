package com.zhengeek.blog.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.zhengeek.blog.exception.BusinessException;
import com.zhengeek.blog.model.AdminLoginRequest;
import com.zhengeek.blog.model.AdminLoginResponse;
import com.zhengeek.blog.model.AdminProfile;
import com.zhengeek.blog.service.TokenService.TokenIssue;

@Service
public class AuthService {

  private final TokenService tokenService;
  private final String adminUsername;
  private final String adminPassword;

  public AuthService(
      TokenService tokenService,
      @Value("${app.admin.username:}") String adminUsername,
      @Value("${app.admin.password:}") String adminPassword) {
    this.tokenService = tokenService;
    this.adminUsername = adminUsername;
    this.adminPassword = adminPassword;
  }

  public AdminLoginResponse login(AdminLoginRequest request) {
    ensureConfigured();

    String username = request == null ? "" : trimToEmpty(request.getUsername());
    String password = request == null ? "" : trimToEmpty(request.getPassword());

    if (!constantEquals(adminUsername, username) || !constantEquals(adminPassword, password)) {
      throw new BusinessException(BusinessException.AUTH_INVALID, "Username or password is invalid");
    }

    TokenIssue token = tokenService.createToken(adminUsername);
    return new AdminLoginResponse(
      token.token(),
      "Bearer",
      token.expiresAt(),
      new AdminProfile(adminUsername)
    );
  }

  public AdminProfile getProfile(String username) {
    return new AdminProfile(username);
  }

  private void ensureConfigured() {
    if (adminUsername == null || adminUsername.isBlank()
        || adminPassword == null || adminPassword.isBlank()) {
      throw new BusinessException(BusinessException.AUTH_CONFIG_MISSING, "Admin credentials are not configured");
    }
  }

  private static boolean constantEquals(String expected, String actual) {
    return MessageDigest.isEqual(
      trimToEmpty(expected).getBytes(StandardCharsets.UTF_8),
      trimToEmpty(actual).getBytes(StandardCharsets.UTF_8)
    );
  }

  private static String trimToEmpty(String value) {
    return value == null ? "" : value.trim();
  }
}
