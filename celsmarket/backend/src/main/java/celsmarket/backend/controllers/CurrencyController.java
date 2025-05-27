package celsmarket.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.Currency;
import celsmarket.backend.repositories.CurrencyRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/currencies")
public class CurrencyController {

    @Autowired
    private CurrencyRepository currencyRepository;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Currency currency, BindingResult result) {
        return ResponseEntity.status(HttpStatus.CREATED).body(currencyRepository.save(currency));
    }

    @GetMapping
    public List<Currency> listAll() {
        return (List<Currency>) currencyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Currency> currencyOptional = currencyRepository.findById(id);
        if (currencyOptional.isPresent()) {
            return ResponseEntity.ok(currencyOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Currency> currencyOptional = currencyRepository.findById(id);
        if (currencyOptional.isPresent()) {
            currencyRepository.delete(currencyOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
