import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VisitantesComponent } from '../list/visitantes.component';
import { VisitantesDetailComponent } from '../detail/visitantes-detail.component';
import { VisitantesUpdateComponent } from '../update/visitantes-update.component';
import { VisitantesRoutingResolveService } from './visitantes-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const visitantesRoute: Routes = [
  {
    path: '',
    component: VisitantesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VisitantesDetailComponent,
    resolve: {
      visitantes: VisitantesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VisitantesUpdateComponent,
    resolve: {
      visitantes: VisitantesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VisitantesUpdateComponent,
    resolve: {
      visitantes: VisitantesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(visitantesRoute)],
  exports: [RouterModule],
})
export class VisitantesRoutingModule {}
