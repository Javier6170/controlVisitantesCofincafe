import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VisitantesComponent } from './list/visitantes.component';
import { VisitantesDetailComponent } from './detail/visitantes-detail.component';
import { VisitantesUpdateComponent } from './update/visitantes-update.component';
import { VisitantesDeleteDialogComponent } from './delete/visitantes-delete-dialog.component';
import { VisitantesRoutingModule } from './route/visitantes-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [SharedModule, VisitantesRoutingModule, DataTablesModule],
  declarations: [VisitantesComponent, VisitantesDetailComponent, VisitantesUpdateComponent, VisitantesDeleteDialogComponent],
})
export class VisitantesModule {}
