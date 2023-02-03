import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'visitantes',
        data: { pageTitle: 'controlVisitantesCofincafeApp.visitantes.home.title' },
        loadChildren: () => import('./visitantes/visitantes.module').then(m => m.VisitantesModule),
      },
      {
        path: 'historialVisitantes',
        loadChildren: () => import('./visitantes/historialVisitantes/historialVisitantes.module').then(m => m.historialVisitantesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
