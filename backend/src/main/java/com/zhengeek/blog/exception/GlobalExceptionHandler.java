package com.zhengeek.blog.exception;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zhengeek.blog.model.ApiErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(BusinessException.class)
  public ResponseEntity<ApiErrorResponse> handleBusinessException(BusinessException exception) {
    return ResponseEntity
      .status(getStatus(exception.getCode()))
      .body(new ApiErrorResponse(exception.getCode(), exception.getMessage()));
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<ApiErrorResponse> handleNoSuchElementException(NoSuchElementException exception) {
    return ResponseEntity
      .status(HttpStatus.NOT_FOUND)
      .body(new ApiErrorResponse(BusinessException.ARTICLE_NOT_FOUND, "Article not found"));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception) {
    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(new ApiErrorResponse(BusinessException.REQUEST_INVALID, exception.getMessage()));
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ApiErrorResponse> handleHttpMessageNotReadableException(
      HttpMessageNotReadableException exception) {
    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(new ApiErrorResponse(BusinessException.REQUEST_INVALID, "Request body is invalid"));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleException(Exception exception) {
    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(new ApiErrorResponse(BusinessException.INTERNAL_ERROR, "Internal server error"));
  }

  private static HttpStatus getStatus(String code) {
    if (BusinessException.ARTICLE_NOT_FOUND.equals(code)) {
      return HttpStatus.NOT_FOUND;
    }

    if (BusinessException.ARTICLE_SLUG_DUPLICATED.equals(code)
        || BusinessException.ARTICLE_STATUS_INVALID.equals(code)
        || BusinessException.REQUEST_INVALID.equals(code)) {
      return HttpStatus.BAD_REQUEST;
    }

    if (BusinessException.AUTH_INVALID.equals(code)
        || BusinessException.AUTH_REQUIRED.equals(code)) {
      return HttpStatus.UNAUTHORIZED;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
