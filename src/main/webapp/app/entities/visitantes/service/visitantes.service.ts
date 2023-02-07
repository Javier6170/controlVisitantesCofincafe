import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVisitantes, NewVisitantes } from '../visitantes.model';

export type PartialUpdateVisitantes = Partial<IVisitantes> & Pick<IVisitantes, 'id'>;

type RestOf<T extends IVisitantes | NewVisitantes> = Omit<T, 'fecha'> & {
  fecha?: Date | null;
};

export type RestVisitantes = RestOf<IVisitantes>;

export type NewRestVisitantes = RestOf<NewVisitantes>;

export type PartialUpdateRestVisitantes = RestOf<PartialUpdateVisitantes>;

export type EntityResponseType = HttpResponse<IVisitantes>;
export type EntityArrayResponseType = HttpResponse<IVisitantes[]>;

@Injectable({ providedIn: 'root' })
export class VisitantesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/visitantes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(visitantes: IVisitantes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitantes);
    return this.http
      .post<RestVisitantes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http
      .get<RestVisitantes[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  update(visitantes: IVisitantes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitantes);
    return this.http
      .put<RestVisitantes>(`${this.resourceUrl}/${this.getVisitantesIdentifier(visitantes)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(visitantes: PartialUpdateVisitantes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitantes);
    return this.http
      .patch<RestVisitantes>(`${this.resourceUrl}/${this.getVisitantesIdentifier(visitantes)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVisitantes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVisitantes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVisitantesIdentifier(visitantes: Pick<IVisitantes, 'id'>): number {
    return visitantes.id;
  }

  compareVisitantes(o1: Pick<IVisitantes, 'id'> | null, o2: Pick<IVisitantes, 'id'> | null): boolean {
    return o1 && o2 ? this.getVisitantesIdentifier(o1) === this.getVisitantesIdentifier(o2) : o1 === o2;
  }

  addVisitantesToCollectionIfMissing<Type extends Pick<IVisitantes, 'id'>>(
    visitantesCollection: Type[],
    ...visitantesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const visitantes: Type[] = visitantesToCheck.filter(isPresent);
    if (visitantes.length > 0) {
      const visitantesCollectionIdentifiers = visitantesCollection.map(visitantesItem => this.getVisitantesIdentifier(visitantesItem)!);
      const visitantesToAdd = visitantes.filter(visitantesItem => {
        const visitantesIdentifier = this.getVisitantesIdentifier(visitantesItem);
        if (visitantesCollectionIdentifiers.includes(visitantesIdentifier)) {
          return false;
        }
        visitantesCollectionIdentifiers.push(visitantesIdentifier);
        return true;
      });
      return [...visitantesToAdd, ...visitantesCollection];
    }
    return visitantesCollection;
  }

  protected convertDateFromClient<T extends IVisitantes | NewVisitantes | PartialUpdateVisitantes>(visitantes: T): RestOf<T> {
    return {
      ...visitantes,
      fecha: visitantes.fecha,
    };
  }

  protected convertDateFromServer(restVisitantes: RestVisitantes): IVisitantes {
    return {
      ...restVisitantes,
      fecha: restVisitantes.fecha,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVisitantes>): HttpResponse<IVisitantes> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVisitantes[]>): HttpResponse<IVisitantes[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
