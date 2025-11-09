package com.example.backend.repository;
import com.example.backend.dto.DayWiseCountDTO;
import com.example.backend.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPrescriptionDateBetweenOrderByPrescriptionDateDesc(LocalDate start, LocalDate end);

    @Query("SELECT new com.example.backend.dto.DayWiseCountDTO(p.prescriptionDate, COUNT(p)) " +
           "FROM Prescription p WHERE p.prescriptionDate BETWEEN :start AND :end " +
           "GROUP BY p.prescriptionDate ORDER BY p.prescriptionDate ASC")
    List<DayWiseCountDTO> getDayWiseReport(LocalDate start, LocalDate end);
}