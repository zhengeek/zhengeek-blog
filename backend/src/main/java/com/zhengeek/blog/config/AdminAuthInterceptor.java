package com.zhengeek.blog.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.zhengeek.blog.controller.AdminAuthController;
import com.zhengeek.blog.exception.BusinessException;
import com.zhengeek.blog.service.TokenService;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

  private static final String BEARER_PREFIX = "Bearer ";

  private final TokenService tokenService;

  public AdminAuthInterceptor(TokenService tokenService) {
    this.tokenService = tokenService;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      return true;
    }

    String authorization = request.getHeader("Authorization");
    if (authorization == null || !authorization.startsWith(BEARER_PREFIX)) {
      throw new BusinessException(BusinessException.AUTH_REQUIRED, "Authorization token is required");
    }

    String token = authorization.substring(BEARER_PREFIX.length()).trim();
    String username = tokenService.validateToken(token);
    request.setAttribute(AdminAuthController.ADMIN_USERNAME_ATTRIBUTE, username);
    return true;
  }
}
