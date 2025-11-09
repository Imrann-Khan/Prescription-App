package com.example.backend.dto;
import java.time.LocalDate;

public class DayWiseCountDTO {
    private LocalDate date;
    private Long count;

    public DayWiseCountDTO(LocalDate date, Long count) {
        this.date = date;
        this.count = count;
    }

    public LocalDate getDate() { return date; }
    public Long getCount() { return count; }
}