package com.example.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.example.ws.shared.Messages;

public class NotFoundException extends RuntimeException {

    public NotFoundException(long id) {
        super(Messages.getMessageForLocale("ws.user.not.found", LocaleContextHolder.getLocale(), id));
    }

}
