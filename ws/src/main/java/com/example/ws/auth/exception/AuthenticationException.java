package com.example.ws.auth.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.example.ws.shared.Messages;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(){
        super(Messages.getMessageForLocale("ws.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}
