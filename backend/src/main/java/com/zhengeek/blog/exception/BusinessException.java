package com.zhengeek.blog.exception;

public class BusinessException extends RuntimeException {

  public static final String ARTICLE_NOT_FOUND = "ARTICLE_NOT_FOUND";
  public static final String ARTICLE_SLUG_DUPLICATED = "ARTICLE_SLUG_DUPLICATED";
  public static final String ARTICLE_STATUS_INVALID = "ARTICLE_STATUS_INVALID";
  public static final String REQUEST_INVALID = "REQUEST_INVALID";
  public static final String INTERNAL_ERROR = "INTERNAL_ERROR";

  private final String code;

  public BusinessException(String code, String message) {
    super(message);
    this.code = code;
  }

  public String getCode() {
    return code;
  }
}
