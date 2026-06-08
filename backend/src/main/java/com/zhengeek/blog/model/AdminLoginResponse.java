package com.zhengeek.blog.model;

public class AdminLoginResponse {

  private String token;
  private String tokenType;
  private long expiresAt;
  private AdminProfile admin;

  public AdminLoginResponse() {
  }

  public AdminLoginResponse(String token, String tokenType, long expiresAt, AdminProfile admin) {
    this.token = token;
    this.tokenType = tokenType;
    this.expiresAt = expiresAt;
    this.admin = admin;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getTokenType() {
    return tokenType;
  }

  public void setTokenType(String tokenType) {
    this.tokenType = tokenType;
  }

  public long getExpiresAt() {
    return expiresAt;
  }

  public void setExpiresAt(long expiresAt) {
    this.expiresAt = expiresAt;
  }

  public AdminProfile getAdmin() {
    return admin;
  }

  public void setAdmin(AdminProfile admin) {
    this.admin = admin;
  }
}
