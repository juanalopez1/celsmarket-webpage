package celsmarket.backend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import celsmarket.backend.entities.Cart;
import celsmarket.backend.entities.User;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {

    @Query("SELECT c FROM Cart c JOIN FETCH c.cellphones WHERE c.user = ?1")
    Cart findUsersCartWithCellphones(User user);

    @Query("select c from Cart c where c.user=?1")
    Cart findByUserCart(User user);
}
