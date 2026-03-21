package com.reserve_my_seat.show_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "screens")
@Getter
@Setter
@ToString
public class Screen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int totalSeats;

    @ManyToOne(fetch = FetchType.LAZY)
    private Theatre theatre;
}
