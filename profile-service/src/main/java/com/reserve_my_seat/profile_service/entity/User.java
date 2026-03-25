package com.reserve_my_seat.profile_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 100)
    private String name;
    
    @Column(unique=true, nullable=false, length = 100)
    private String email;

    @Column(length = 15, nullable = false)
    private String mobileNo;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "Enum('MALE', 'FEMALE', 'OTHER')")
    private Gender gender;

    private LocalDate dob;

}
