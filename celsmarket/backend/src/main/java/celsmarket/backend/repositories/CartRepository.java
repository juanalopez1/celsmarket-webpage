package celsmarket.backend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Cart;
import celsmarket.backend.entities.User;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {
    
    @Query("select c from Cart c where c.user=?1")
    Cart findUsersCart(User user);
}
