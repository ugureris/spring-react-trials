package com.example.ws.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(
        @NotBlank(message = "{ws.constraint.username.NotBlank.message}") @Size(min = 4, max = 16) String username) {

}
