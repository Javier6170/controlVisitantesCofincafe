import { Route } from '@angular/router';

import { historialVisitantesComponent } from './historialVisitantes.component';

export const historialVisitantesRoute: Route = {
  path: '',
  component: historialVisitantesComponent,
  data: {
    pageTitle: 'controlVisitantesCofincafeApp.historialVisitantes.home.title',
  },
};
