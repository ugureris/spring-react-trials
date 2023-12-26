package com.example.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.example.ws.shared.Messages;

public class ActivationModificationException extends RuntimeException {
    
    public ActivationModificationException(){
        super(Messages.getMessageForLocale("ws.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}
