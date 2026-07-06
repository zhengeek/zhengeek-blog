package com.zhengeek.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ZhenGeekBlogApplication {

  public static void main(String[] args) {
    SpringApplication.run(ZhenGeekBlogApplication.class, args);
  }
}
