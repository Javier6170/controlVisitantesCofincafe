import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitantes } from '../visitantes.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, VisitantesService } from '../service/visitantes.service';
import { VisitantesDeleteDialogComponent } from '../delete/visitantes-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { HttpResponse } from '@angular/common/http';
import { Bean, PropertySource } from 'app/admin/configuration/configuration.model';

@Component({
  selector: 'jhi-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css'],
})
export class VisitantesComponent implements OnInit {
  visitantes?: IVisitantes[] | null;
  isLoading = false;
  predicate = 'id';
  ascending = true;
  totalItems = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  numeroVisitantes: number | undefined = 0;

  allBeans!: Bean[];
  beans: Bean[] = [];
  beansFilter = '';
  beansAscending = true;
  propertySources: PropertySource[] = [];

  dtOptions: any = {};

  constructor(
    protected visitantesService: VisitantesService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IVisitantes): number => this.visitantesService.getVisitantesIdentifier(item);

  ngOnInit(): void {
    this.load();
    this.handleNavigation();
    this.dtOptions = {
      pagingType: 'full_numbers',
      select: true,
      dom: 'Bfrtip',
      buttons: ['print', 'excel', 'pdf'],
    };
  }

  delete(visitantes: IVisitantes): void {
    const modalRef = this.modalService.open(VisitantesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.visitantes = visitantes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  filterAndSortBeans(): void {
    const beansAscendingValue = this.beansAscending ? -1 : 1;
    const beansAscendingValueReverse = this.beansAscending ? 1 : -1;
    this.beans = this.allBeans
      .filter(bean => !this.beansFilter || bean.prefix.toLowerCase().includes(this.beansFilter.toLowerCase()))
      .sort((a, b) => (a.prefix < b.prefix ? beansAscendingValue : beansAscendingValueReverse));
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
        this.numeroVisitantes = this.visitantes?.length;
      },
    });
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`,
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation();
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.visitantes = this.refineData(dataFromBody);
  }

  protected refineData(data: IVisitantes[]): IVisitantes[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IVisitantes[] | null): IVisitantes[] {
    const fechaActual = new Date();
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (data[i].fecha.getDate == fechaActual.getDate) {
        return data;
      }
    }
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.visitantesService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
    });
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(visitantes: IVisitantes[] | null): void {
    this.totalItems = Number(visitantes?.length);
    this.visitantes = visitantes;
  }
}
