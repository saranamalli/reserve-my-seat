package com.reserve_my_seat.profile_service.entity;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("male"),
    FEMALE("female"),
    OTHER("other");

    private final String value;

    Gender(String value) {
        this.value = value;
    }
}
