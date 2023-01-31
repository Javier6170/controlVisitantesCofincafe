package com.cofincafe.control.repository;

import com.cofincafe.control.domain.Visitantes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Visitantes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitantesRepository extends JpaRepository<Visitantes, Long> {}
