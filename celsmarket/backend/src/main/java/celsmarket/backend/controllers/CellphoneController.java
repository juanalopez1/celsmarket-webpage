package celsmarket.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.Cellphone;
import celsmarket.backend.services.ICellphoneService;
import celsmarket.backend.services.ValidationService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/protected")
public class CellphoneController {

    @Autowired
    private ICellphoneService cellphoneService;

    @Autowired
    private ValidationService validator;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Cellphone cellphone, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validator.validate(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(cellphoneService.save(cellphone));
    }

    @PutMapping("/{id}") // poner el binding a la derecha de lo que vamos a validar
    public ResponseEntity<?> update(@Valid @RequestBody Cellphone cellphone, BindingResult result,
            @PathVariable Integer id) {
        if (result.hasFieldErrors()) {
            return validator.validate(result);
        }
        Optional<Cellphone> cellphoneOptional = cellphoneService.update(id, cellphone);
        if (cellphoneOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(cellphoneOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping
    public List<Cellphone> listAll() {
        return (List<Cellphone>) cellphoneService.findAll();
    }

    @GetMapping("/show")
    public List<Cellphone> listShown() {
        return (List<Cellphone>) cellphoneService.findAllShownCellphones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> view(@PathVariable Integer id) {
        Optional<Cellphone> cellphoneOptional = cellphoneService.findOne(id);
        if (cellphoneOptional.isPresent()) {
            return ResponseEntity.ok(cellphoneOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Cellphone> cellphoneOptional = cellphoneService.findOne(id);
        if (cellphoneOptional.isPresent()) {
            cellphoneService.delete(cellphoneOptional.get().getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
