package com.cofincafe.control.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.cofincafe.control.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VisitantesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visitantes.class);
        Visitantes visitantes1 = new Visitantes();
        visitantes1.setId(1L);
        Visitantes visitantes2 = new Visitantes();
        visitantes2.setId(visitantes1.getId());
        assertThat(visitantes1).isEqualTo(visitantes2);
        visitantes2.setId(2L);
        assertThat(visitantes1).isNotEqualTo(visitantes2);
        visitantes1.setId(null);
        assertThat(visitantes1).isNotEqualTo(visitantes2);
    }
}
