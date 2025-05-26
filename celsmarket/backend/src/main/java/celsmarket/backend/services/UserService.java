package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import celsmarket.backend.entities.User;
import celsmarket.backend.repositories.UserRepository;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true) // para que nazareno tenga un listado de sus clientes
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User save(User user) {
        if (user.getRole() != "client") {
            user.setRole("client");
        }
//        user.setPassword(user.getPassword()); // encriptar contrasena antes
        return userRepository.save(user);
    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> update(Integer id, User body) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.orElseThrow();
            user.setName(body.getName());
            user.setEmail(body.getEmail());
            user.setPassword(body.getPassword());
            return Optional.of(userRepository.save(user));
        }
        return userOptional;
    }

    @Override
    public Optional<User> findOne(Integer id) {
        return userRepository.findById(id);
    }
    
}
