package com.zhengeek.blog.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhengeek.blog.model.AdminLoginRequest;
import com.zhengeek.blog.model.AdminLoginResponse;
import com.zhengeek.blog.model.AdminProfile;
import com.zhengeek.blog.service.AuthService;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

  public static final String ADMIN_USERNAME_ATTRIBUTE = "adminUsername";

  private final AuthService authService;

  public AdminAuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {
    return authService.login(request);
  }

  @GetMapping("/me")
  public AdminProfile getMe(HttpServletRequest request) {
    String username = (String) request.getAttribute(ADMIN_USERNAME_ATTRIBUTE);
    return authService.getProfile(username);
  }
}
