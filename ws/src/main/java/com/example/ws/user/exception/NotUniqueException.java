package com.example.ws.user.exception;

import java.util.Collections;
import java.util.Map;

import org.springframework.context.i18n.LocaleContextHolder;

import com.example.ws.shared.Messages;

public class NotUniqueException extends RuntimeException {

    public NotUniqueException() {
        super(Messages.getMessageForLocale("ws.error.validation",
                LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors() {
        return Collections.singletonMap("email", Messages.getMessageForLocale("ws.constraint.email.NotUnique.message",
                LocaleContextHolder.getLocale()));
    }

}
