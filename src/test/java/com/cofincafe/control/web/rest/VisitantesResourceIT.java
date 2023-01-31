package com.cofincafe.control.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cofincafe.control.IntegrationTest;
import com.cofincafe.control.domain.Visitantes;
import com.cofincafe.control.repository.VisitantesRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link VisitantesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VisitantesResourceIT {

    private static final String DEFAULT_IDENTIFICACION = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICACION = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PISO_VISITADO = "AAAAAAAAAA";
    private static final String UPDATED_PISO_VISITADO = "BBBBBBBBBB";

    private static final String DEFAULT_AREA_VISITADA = "AAAAAAAAAA";
    private static final String UPDATED_AREA_VISITADA = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_EQUIPO = "AAAAAAAAAA";
    private static final String UPDATED_EQUIPO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/visitantes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VisitantesRepository visitantesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisitantesMockMvc;

    private Visitantes visitantes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visitantes createEntity(EntityManager em) {
        Visitantes visitantes = new Visitantes()
            .identificacion(DEFAULT_IDENTIFICACION)
            .nombre(DEFAULT_NOMBRE)
            .apellido(DEFAULT_APELLIDO)
            .fecha(DEFAULT_FECHA)
            .pisoVisitado(DEFAULT_PISO_VISITADO)
            .areaVisitada(DEFAULT_AREA_VISITADA)
            .telefono(DEFAULT_TELEFONO)
            .equipo(DEFAULT_EQUIPO)
            .observaciones(DEFAULT_OBSERVACIONES);
        return visitantes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visitantes createUpdatedEntity(EntityManager em) {
        Visitantes visitantes = new Visitantes()
            .identificacion(UPDATED_IDENTIFICACION)
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .fecha(UPDATED_FECHA)
            .pisoVisitado(UPDATED_PISO_VISITADO)
            .areaVisitada(UPDATED_AREA_VISITADA)
            .telefono(UPDATED_TELEFONO)
            .equipo(UPDATED_EQUIPO)
            .observaciones(UPDATED_OBSERVACIONES);
        return visitantes;
    }

    @BeforeEach
    public void initTest() {
        visitantes = createEntity(em);
    }

    @Test
    @Transactional
    void createVisitantes() throws Exception {
        int databaseSizeBeforeCreate = visitantesRepository.findAll().size();
        // Create the Visitantes
        restVisitantesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitantes)))
            .andExpect(status().isCreated());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeCreate + 1);
        Visitantes testVisitantes = visitantesList.get(visitantesList.size() - 1);
        assertThat(testVisitantes.getIdentificacion()).isEqualTo(DEFAULT_IDENTIFICACION);
        assertThat(testVisitantes.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testVisitantes.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testVisitantes.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testVisitantes.getPisoVisitado()).isEqualTo(DEFAULT_PISO_VISITADO);
        assertThat(testVisitantes.getAreaVisitada()).isEqualTo(DEFAULT_AREA_VISITADA);
        assertThat(testVisitantes.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testVisitantes.getEquipo()).isEqualTo(DEFAULT_EQUIPO);
        assertThat(testVisitantes.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    void createVisitantesWithExistingId() throws Exception {
        // Create the Visitantes with an existing ID
        visitantes.setId(1L);

        int databaseSizeBeforeCreate = visitantesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitantesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitantes)))
            .andExpect(status().isBadRequest());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVisitantes() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        // Get all the visitantesList
        restVisitantesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitantes.getId().intValue())))
            .andExpect(jsonPath("$.[*].identificacion").value(hasItem(DEFAULT_IDENTIFICACION)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].pisoVisitado").value(hasItem(DEFAULT_PISO_VISITADO)))
            .andExpect(jsonPath("$.[*].areaVisitada").value(hasItem(DEFAULT_AREA_VISITADA)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].equipo").value(hasItem(DEFAULT_EQUIPO)))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));
    }

    @Test
    @Transactional
    void getVisitantes() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        // Get the visitantes
        restVisitantesMockMvc
            .perform(get(ENTITY_API_URL_ID, visitantes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visitantes.getId().intValue()))
            .andExpect(jsonPath("$.identificacion").value(DEFAULT_IDENTIFICACION))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.pisoVisitado").value(DEFAULT_PISO_VISITADO))
            .andExpect(jsonPath("$.areaVisitada").value(DEFAULT_AREA_VISITADA))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.equipo").value(DEFAULT_EQUIPO))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES));
    }

    @Test
    @Transactional
    void getNonExistingVisitantes() throws Exception {
        // Get the visitantes
        restVisitantesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVisitantes() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();

        // Update the visitantes
        Visitantes updatedVisitantes = visitantesRepository.findById(visitantes.getId()).get();
        // Disconnect from session so that the updates on updatedVisitantes are not directly saved in db
        em.detach(updatedVisitantes);
        updatedVisitantes
            .identificacion(UPDATED_IDENTIFICACION)
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .fecha(UPDATED_FECHA)
            .pisoVisitado(UPDATED_PISO_VISITADO)
            .areaVisitada(UPDATED_AREA_VISITADA)
            .telefono(UPDATED_TELEFONO)
            .equipo(UPDATED_EQUIPO)
            .observaciones(UPDATED_OBSERVACIONES);

        restVisitantesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVisitantes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVisitantes))
            )
            .andExpect(status().isOk());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
        Visitantes testVisitantes = visitantesList.get(visitantesList.size() - 1);
        assertThat(testVisitantes.getIdentificacion()).isEqualTo(UPDATED_IDENTIFICACION);
        assertThat(testVisitantes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVisitantes.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testVisitantes.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testVisitantes.getPisoVisitado()).isEqualTo(UPDATED_PISO_VISITADO);
        assertThat(testVisitantes.getAreaVisitada()).isEqualTo(UPDATED_AREA_VISITADA);
        assertThat(testVisitantes.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testVisitantes.getEquipo()).isEqualTo(UPDATED_EQUIPO);
        assertThat(testVisitantes.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void putNonExistingVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, visitantes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visitantes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visitantes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitantes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVisitantesWithPatch() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();

        // Update the visitantes using partial update
        Visitantes partialUpdatedVisitantes = new Visitantes();
        partialUpdatedVisitantes.setId(visitantes.getId());

        partialUpdatedVisitantes
            .identificacion(UPDATED_IDENTIFICACION)
            .nombre(UPDATED_NOMBRE)
            .pisoVisitado(UPDATED_PISO_VISITADO)
            .telefono(UPDATED_TELEFONO);

        restVisitantesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisitantes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisitantes))
            )
            .andExpect(status().isOk());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
        Visitantes testVisitantes = visitantesList.get(visitantesList.size() - 1);
        assertThat(testVisitantes.getIdentificacion()).isEqualTo(UPDATED_IDENTIFICACION);
        assertThat(testVisitantes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVisitantes.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testVisitantes.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testVisitantes.getPisoVisitado()).isEqualTo(UPDATED_PISO_VISITADO);
        assertThat(testVisitantes.getAreaVisitada()).isEqualTo(DEFAULT_AREA_VISITADA);
        assertThat(testVisitantes.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testVisitantes.getEquipo()).isEqualTo(DEFAULT_EQUIPO);
        assertThat(testVisitantes.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    void fullUpdateVisitantesWithPatch() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();

        // Update the visitantes using partial update
        Visitantes partialUpdatedVisitantes = new Visitantes();
        partialUpdatedVisitantes.setId(visitantes.getId());

        partialUpdatedVisitantes
            .identificacion(UPDATED_IDENTIFICACION)
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .fecha(UPDATED_FECHA)
            .pisoVisitado(UPDATED_PISO_VISITADO)
            .areaVisitada(UPDATED_AREA_VISITADA)
            .telefono(UPDATED_TELEFONO)
            .equipo(UPDATED_EQUIPO)
            .observaciones(UPDATED_OBSERVACIONES);

        restVisitantesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisitantes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisitantes))
            )
            .andExpect(status().isOk());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
        Visitantes testVisitantes = visitantesList.get(visitantesList.size() - 1);
        assertThat(testVisitantes.getIdentificacion()).isEqualTo(UPDATED_IDENTIFICACION);
        assertThat(testVisitantes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVisitantes.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testVisitantes.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testVisitantes.getPisoVisitado()).isEqualTo(UPDATED_PISO_VISITADO);
        assertThat(testVisitantes.getAreaVisitada()).isEqualTo(UPDATED_AREA_VISITADA);
        assertThat(testVisitantes.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testVisitantes.getEquipo()).isEqualTo(UPDATED_EQUIPO);
        assertThat(testVisitantes.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void patchNonExistingVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, visitantes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visitantes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visitantes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVisitantes() throws Exception {
        int databaseSizeBeforeUpdate = visitantesRepository.findAll().size();
        visitantes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitantesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(visitantes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Visitantes in the database
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVisitantes() throws Exception {
        // Initialize the database
        visitantesRepository.saveAndFlush(visitantes);

        int databaseSizeBeforeDelete = visitantesRepository.findAll().size();

        // Delete the visitantes
        restVisitantesMockMvc
            .perform(delete(ENTITY_API_URL_ID, visitantes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Visitantes> visitantesList = visitantesRepository.findAll();
        assertThat(visitantesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
