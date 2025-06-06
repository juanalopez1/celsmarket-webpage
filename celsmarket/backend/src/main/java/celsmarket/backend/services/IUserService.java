package celsmarket.backend.services;

import java.util.List;
import java.util.Optional;

import celsmarket.backend.entities.User;

public interface IUserService {
    List<User> findAll();

    Optional<User> findByEmail(String email);

    Optional<User> findOne(Integer id);

    User save(User user);

    void delete(Integer id);

    Optional<User> update(Integer id, User body);

}
