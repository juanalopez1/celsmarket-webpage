package celsmarket.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "cellphones")
public class Cellphone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Min(0)
    private Integer stock;
    private Integer price;
    
    @Column(name = "battery_condition")
    private Integer batteryCondition;
    
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "id_storage")
    private Storage storage;

    @ManyToOne
    @JoinColumn(name = "id_model")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "id_brand")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "id_condition")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "id_color")
    private Color color;

    private boolean shown;
    private boolean sold;

    @Override
    public String toString() {
        return "Cellphone [id=" + id + ", stock=" + stock + ", price=" + price + ", batteryCondition="
                + batteryCondition + ", description=" + description + ", storage=" + storage + ", model=" + model
                + ", brand=" + brand + ", condition=" + condition + ", color=" + color + ", shown=" + shown + ", sold="
                + sold + "]";
    }

    public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getBatteryCondition() {
        return batteryCondition;
    }

    public void setBatteryCondition(Integer batteryCondition) {
        this.batteryCondition = batteryCondition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public boolean isShown() {
        return shown;
    }

    public void setShown(boolean shown) {
        this.shown = shown;
    }

    //@ManyToOne(mappedBy = "cellphone")
    //private Cart cart;

    
}
