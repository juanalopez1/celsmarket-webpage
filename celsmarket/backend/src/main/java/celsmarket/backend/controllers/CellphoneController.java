package celsmarket.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import celsmarket.backend.entities.Cellphone;
import celsmarket.backend.repositories.CellphoneRepository;
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
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/inventory")
public class CellphoneController {

    @Autowired
    private ICellphoneService cellphoneService;

    @Autowired
    private CellphoneRepository cellphoneRepository;

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
        if (cellphoneOptional.isPresent() && !cellphoneOptional.get().isSold()) {
            return ResponseEntity.status(HttpStatus.OK).body(cellphoneOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping
    public List<Cellphone> listAll() {
        return (List<Cellphone>) cellphoneService.findAll();
    }

    @GetMapping("/availables")
    public List<Cellphone> listShown() {
        return (List<Cellphone>) cellphoneService.findAllShownCellphones();
    }

    @GetMapping("/availables/{id}")
    public ResponseEntity<?> listOneShown(@PathVariable Integer id) {
        List<Cellphone> availables = cellphoneService.findAllShownCellphones();
        Optional<Cellphone> opCellphone = availables.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
        System.out.println("CELULAR" + opCellphone.toString());
        if (opCellphone.isPresent()) {
            return ResponseEntity.ok(opCellphone.get());
        }
        return ResponseEntity.notFound().build();

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

    @GetMapping("/availables/filter")
    public List<Cellphone> filter(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String storage) {
        return cellphoneRepository.filterAll(brand, color, condition, model, storage);
    }
    

}
