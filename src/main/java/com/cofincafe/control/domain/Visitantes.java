package com.cofincafe.control.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Visitantes.
 */
@Entity
@Table(name = "visitantes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Visitantes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "identificacion")
    private String identificacion;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "piso_visitado")
    private String pisoVisitado;

    @Column(name = "area_visitada")
    private String areaVisitada;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "equipo")
    private String equipo;

    @Column(name = "nombre_equipo")
    private String nombreEquipo;

    @Column(name = "marca_equipo")
    private String marcaEquipo;

    @Column(name = "serial_equipo")
    private String serialEquipo;

    @Column(name = "serial_tarjeta")
    private String serialTarjeta;

    @Column(name = "observaciones")
    private String observaciones;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Visitantes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacion() {
        return this.identificacion;
    }

    public Visitantes identificacion(String identificacion) {
        this.setIdentificacion(identificacion);
        return this;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Visitantes nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public Visitantes apellido(String apellido) {
        this.setApellido(apellido);
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Visitantes fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getPisoVisitado() {
        return this.pisoVisitado;
    }

    public Visitantes pisoVisitado(String pisoVisitado) {
        this.setPisoVisitado(pisoVisitado);
        return this;
    }

    public void setPisoVisitado(String pisoVisitado) {
        this.pisoVisitado = pisoVisitado;
    }

    public String getAreaVisitada() {
        return this.areaVisitada;
    }

    public Visitantes areaVisitada(String areaVisitada) {
        this.setAreaVisitada(areaVisitada);
        return this;
    }

    public void setAreaVisitada(String areaVisitada) {
        this.areaVisitada = areaVisitada;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Visitantes telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEquipo() {
        return this.equipo;
    }

    public Visitantes equipo(String equipo) {
        this.setEquipo(equipo);
        return this;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public String getMarcaEquipo() {
        return marcaEquipo;
    }

    public void setMarcaEquipo(String marcaEquipo) {
        this.marcaEquipo = marcaEquipo;
    }

    public String getSerialEquipo() {
        return serialEquipo;
    }

    public void setSerialEquipo(String serialEquipo) {
        this.serialEquipo = serialEquipo;
    }

    public String getSerialTarjeta() {
        return serialTarjeta;
    }

    public void setSerialTarjeta(String serialTarjeta) {
        this.serialTarjeta = serialTarjeta;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public Visitantes observaciones(String observaciones) {
        this.setObservaciones(observaciones);
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visitantes)) {
            return false;
        }
        return id != null && id.equals(((Visitantes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore

    @Override
    public String toString() {
        return "Visitantes{" +
            "id=" + id +
            ", identificacion='" + identificacion + '\'' +
            ", nombre='" + nombre + '\'' +
            ", apellido='" + apellido + '\'' +
            ", fecha=" + fecha +
            ", pisoVisitado='" + pisoVisitado + '\'' +
            ", areaVisitada='" + areaVisitada + '\'' +
            ", telefono='" + telefono + '\'' +
            ", equipo='" + equipo + '\'' +
            ", nombreEquipo='" + nombreEquipo + '\'' +
            ", marcaEquipo='" + marcaEquipo + '\'' +
            ", serialEquipo='" + serialEquipo + '\'' +
            ", serialTarjeta='" + serialTarjeta + '\'' +
            ", observaciones='" + observaciones + '\'' +
            '}';
    }
}
