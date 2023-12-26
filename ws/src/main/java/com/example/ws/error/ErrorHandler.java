package com.example.ws.error;

import java.util.stream.Collectors;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.ws.auth.exception.AuthenticationException;
import com.example.ws.shared.Messages;
import com.example.ws.user.exception.ActivationModificationException;
import com.example.ws.user.exception.AuthorizationException;
import com.example.ws.user.exception.InvalidTokenException;
import com.example.ws.user.exception.NotFoundException;
import com.example.ws.user.exception.NotUniqueException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler({ MethodArgumentNotValidException.class,
            NotUniqueException.class,
            ActivationModificationException.class,
            InvalidTokenException.class,
            NotFoundException.class,
            AuthenticationException.class,
            AuthorizationException.class
    })
    ResponseEntity<ApiError> handleException(Exception exception,
            HttpServletRequest request) {
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(exception.getMessage());

        if (exception instanceof MethodArgumentNotValidException) {

            String message = Messages.getMessageForLocale("ws.error.validation",
                    LocaleContextHolder.getLocale());
            apiError.setMessage(message);
            apiError.setStatus(400);
            var validationErrors = ((MethodArgumentNotValidException) exception).getBindingResult().getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage,
                            (existing, replacing) -> existing));
            apiError.setValidationErrors(validationErrors);
        } else if (exception instanceof NotUniqueException) {
            apiError.setStatus(400);
            apiError.setValidationErrors(((NotUniqueException) exception).getValidationErrors());
        } else if (exception instanceof ActivationModificationException) {
            apiError.setStatus(502);
        } else if (exception instanceof InvalidTokenException) {
            apiError.setStatus(400);
        } else if (exception instanceof NotFoundException) {
            apiError.setStatus(404);
        } else if (exception instanceof AuthenticationException) {
            apiError.setStatus(401);
        } else if (exception instanceof AuthorizationException) {
            apiError.setStatus(403);
        }

        return ResponseEntity.status(apiError.getStatus()).body(apiError);
    }

}
