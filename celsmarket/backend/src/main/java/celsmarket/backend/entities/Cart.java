package celsmarket.backend.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany
    @JoinTable(name = "cart_cellphones", joinColumns = @JoinColumn(name = "id_cart"), inverseJoinColumns = @JoinColumn(name = "id_cellphone"))
    private List<Cellphone> cellphones = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id_client", unique = true)
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Cellphone> getCellphones() {
        return cellphones;
    }

    public void setCellphones(List<Cellphone> cellphones) {
        this.cellphones = cellphones;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
