package com.example.backend.service;
import com.example.backend.dto.DayWiseCountDTO;
import com.example.backend.model.Prescription;
import com.example.backend.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {
    private final PrescriptionRepository repository;
    public PrescriptionService(PrescriptionRepository repository) { this.repository = repository; }

    public List<Prescription> getPrescriptions(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            start = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
            end = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
        }
        return repository.findByPrescriptionDateBetweenOrderByPrescriptionDateDesc(start, end);
    }
    public Optional<Prescription> findById(Long id) { return repository.findById(id); }
    public Prescription save(Prescription p) { return repository.save(p); }
    public void deleteById(Long id) { repository.deleteById(id); }

    public List<DayWiseCountDTO> getReport(LocalDate start, LocalDate end) {
         if (start == null || end == null) {
            start = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
            end = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
        }
        return repository.getDayWiseReport(start, end);
    }
}