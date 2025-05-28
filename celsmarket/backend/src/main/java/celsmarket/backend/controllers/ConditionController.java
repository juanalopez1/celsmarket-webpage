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

import celsmarket.backend.entities.Condition;
import celsmarket.backend.repositories.ConditionRepository;
import celsmarket.backend.services.ValidationService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/conditions")
public class ConditionController {

    @Autowired
    private ConditionRepository conditionRepository;

    @Autowired
    private ValidationService validator;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Condition condition, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validator.validate(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(conditionRepository.save(condition));
    }

    @GetMapping
    public List<Condition> listAll() {
        return (List<Condition>) conditionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Condition> conditionOptional = conditionRepository.findById(id);
        if (conditionOptional.isPresent()) {
            return ResponseEntity.ok(conditionOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Condition> conditionOptional = conditionRepository.findById(id);
        if (conditionOptional.isPresent()) {
            conditionRepository.delete(conditionOptional.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
