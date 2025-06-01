package celsmarket.backend.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false, referencedColumnName = "id")
    private User client;

    @OneToOne
    @JoinColumn(name = "id_cellphone", nullable = false, referencedColumnName = "id")
    private Cellphone cellphone;

    private Date date_hour;

    @ManyToOne
    @JoinColumn(name = "id_currency", nullable = false, referencedColumnName = "id")
    private Currency currency;

    private String address;

    @ManyToOne
    @JoinColumn(name = "id_city", nullable = false, referencedColumnName = "id")
    private City city;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Cellphone getCellphone() {
        return cellphone;
    }

    public void setCellphone(Cellphone cellphone) {
        this.cellphone = cellphone;
    }

    public Date getDate_hour() {
        return date_hour;
    }

    public void setDate_hour(Date date_hour) {
        this.date_hour = date_hour;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

}
