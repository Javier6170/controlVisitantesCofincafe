package com.cofincafe.control.web.rest;

import com.cofincafe.control.domain.Visitantes;
import com.cofincafe.control.repository.VisitantesRepository;
import com.cofincafe.control.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.cofincafe.control.domain.Visitantes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VisitantesResource {

    private final Logger log = LoggerFactory.getLogger(VisitantesResource.class);

    private static final String ENTITY_NAME = "visitantes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitantesRepository visitantesRepository;

    public VisitantesResource(VisitantesRepository visitantesRepository) {
        this.visitantesRepository = visitantesRepository;
    }

    /**
     * {@code POST  /visitantes} : Create a new visitantes.
     *
     * @param visitantes the visitantes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitantes, or with status {@code 400 (Bad Request)} if the visitantes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visitantes")
    public ResponseEntity<Visitantes> createVisitantes(@RequestBody Visitantes visitantes) throws URISyntaxException {
        log.debug("REST request to save Visitantes : {}", visitantes);
        if (visitantes.getId() != null) {
            throw new BadRequestAlertException("A new visitantes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Visitantes result = visitantesRepository.save(visitantes);
        return ResponseEntity
            .created(new URI("/api/visitantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visitantes/:id} : Updates an existing visitantes.
     *
     * @param id the id of the visitantes to save.
     * @param visitantes the visitantes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitantes,
     * or with status {@code 400 (Bad Request)} if the visitantes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitantes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visitantes/{id}")
    public ResponseEntity<Visitantes> updateVisitantes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Visitantes visitantes
    ) throws URISyntaxException {
        log.debug("REST request to update Visitantes : {}, {}", id, visitantes);
        if (visitantes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visitantes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visitantesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Visitantes result = visitantesRepository.save(visitantes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitantes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /visitantes/:id} : Partial updates given fields of an existing visitantes, field will ignore if it is null
     *
     * @param id the id of the visitantes to save.
     * @param visitantes the visitantes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitantes,
     * or with status {@code 400 (Bad Request)} if the visitantes is not valid,
     * or with status {@code 404 (Not Found)} if the visitantes is not found,
     * or with status {@code 500 (Internal Server Error)} if the visitantes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/visitantes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Visitantes> partialUpdateVisitantes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Visitantes visitantes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Visitantes partially : {}, {}", id, visitantes);
        if (visitantes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visitantes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visitantesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Visitantes> result = visitantesRepository
            .findById(visitantes.getId())
            .map(existingVisitantes -> {
                if (visitantes.getIdentificacion() != null) {
                    existingVisitantes.setIdentificacion(visitantes.getIdentificacion());
                }
                if (visitantes.getNombre() != null) {
                    existingVisitantes.setNombre(visitantes.getNombre());
                }
                if (visitantes.getApellido() != null) {
                    existingVisitantes.setApellido(visitantes.getApellido());
                }
                if (visitantes.getFecha() != null) {
                    existingVisitantes.setFecha(visitantes.getFecha());
                }
                if (visitantes.getPisoVisitado() != null) {
                    existingVisitantes.setPisoVisitado(visitantes.getPisoVisitado());
                }
                if (visitantes.getAreaVisitada() != null) {
                    existingVisitantes.setAreaVisitada(visitantes.getAreaVisitada());
                }
                if (visitantes.getTelefono() != null) {
                    existingVisitantes.setTelefono(visitantes.getTelefono());
                }
                if (visitantes.getEquipo() != null) {
                    existingVisitantes.setEquipo(visitantes.getEquipo());
                }
                if (visitantes.getObservaciones() != null) {
                    existingVisitantes.setObservaciones(visitantes.getObservaciones());
                }

                return existingVisitantes;
            })
            .map(visitantesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitantes.getId().toString())
        );
    }

    /**
     * {@code GET  /visitantes} : get all the visitantes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitantes in body.
     */
    @GetMapping("/visitantes")
    public List<Visitantes> getAllVisitantes() {
        log.debug("REST request to get all Visitantes");
        return visitantesRepository.findAll();
    }

    /**
     * {@code GET  /visitantes/:id} : get the "id" visitantes.
     *
     * @param id the id of the visitantes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitantes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visitantes/{id}")
    public ResponseEntity<Visitantes> getVisitantes(@PathVariable Long id) {
        log.debug("REST request to get Visitantes : {}", id);
        Optional<Visitantes> visitantes = visitantesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visitantes);
    }

    /**
     * {@code DELETE  /visitantes/:id} : delete the "id" visitantes.
     *
     * @param id the id of the visitantes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visitantes/{id}")
    public ResponseEntity<Void> deleteVisitantes(@PathVariable Long id) {
        log.debug("REST request to delete Visitantes : {}", id);
        visitantesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
