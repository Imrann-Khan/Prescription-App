package com.example.backend.controller;

import com.example.backend.dto.DayWiseCountDTO;
import com.example.backend.model.Prescription;
import com.example.backend.repository.PrescriptionRepository;
import com.example.backend.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PrescriptionRestController {
    private final PrescriptionService service;
    private final PrescriptionRepository repo; 

    public PrescriptionRestController(PrescriptionService service, PrescriptionRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    // Endpoint to test credentials
    @GetMapping("/auth/login") 
    public ResponseEntity<String> login(Authentication auth) { return ResponseEntity.ok(auth.getName()); }

    @GetMapping("/prescriptions")
    public List<Prescription> getAll(@RequestParam(required = false) LocalDate start,
                                     @RequestParam(required = false) LocalDate end) {
        return service.getPrescriptions(start, end);
    }

    @GetMapping("/prescription")
    public List<Prescription> getAllAlias(@RequestParam(required = false) LocalDate start,
                                          @RequestParam(required = false) LocalDate end) {
        return service.getPrescriptions(start, end);
    }

    @GetMapping("/prescriptions/{id}")
    public ResponseEntity<Prescription> getOne(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/prescriptions")
    public Prescription create(@Valid @RequestBody Prescription p) { return repo.save(p); }

    @PutMapping("/prescriptions/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @Valid @RequestBody Prescription p) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id);
        return ResponseEntity.ok(repo.save(p));
    }

    @DeleteMapping("/prescriptions/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/report")
    public List<DayWiseCountDTO> getReport(@RequestParam(required = false) LocalDate start,
                                           @RequestParam(required = false) LocalDate end) {
        return service.getReport(start, end);
    }
}