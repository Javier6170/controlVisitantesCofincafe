import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVisitantes } from '../visitantes.model';
import { VisitantesService } from '../service/visitantes.service';

@Injectable({ providedIn: 'root' })
export class VisitantesRoutingResolveService implements Resolve<IVisitantes | null> {
  constructor(protected service: VisitantesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitantes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((visitantes: HttpResponse<IVisitantes>) => {
          if (visitantes.body) {
            return of(visitantes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
