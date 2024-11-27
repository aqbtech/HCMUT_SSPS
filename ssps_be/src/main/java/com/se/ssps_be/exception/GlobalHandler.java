package com.se.ssps_be.exception;

import com.se.ssps_be.dto.response.ResponseAPITemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalHandler {
    @ExceptionHandler(WebServerException.class)
    public ResponseEntity<ResponseAPITemplate<String>> handleWebServerException(WebServerException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatusCode())
                .body(ResponseAPITemplate.<String>builder()
                        .code(e.getErrorCode().getCode())
                        .message(e.getMessage())
                        .result(null)
                        .build());
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseAPITemplate<String>> handleWebServerException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseAPITemplate.<String>builder()
                        .code(400)
                        .message(e.getMessage())
                        .result(null)
                        .build());
    }
}
