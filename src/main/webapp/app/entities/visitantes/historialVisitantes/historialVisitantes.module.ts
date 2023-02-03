import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { historialVisitantesRoute } from './historialVisitantes.route';
import { historialVisitantesComponent } from './historialVisitantes.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([historialVisitantesRoute]), DataTablesModule],
  declarations: [historialVisitantesComponent],
})
export class historialVisitantesModule {}
