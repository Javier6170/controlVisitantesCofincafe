import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IVisitantes } from 'app/entities/visitantes/visitantes.model';
import { EntityArrayResponseType, VisitantesService } from 'app/entities/visitantes/service/visitantes.service';
import { SortService } from 'app/shared/sort/sort.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  visitantes?: IVisitantes[];
  predicate = 'id';
  ascending = true;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    protected visitantesService: VisitantesService,
    protected sortService: SortService,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.visitantes = this.refineData(dataFromBody);
  }

  protected fillComponentAttributesFromResponseBody(data: IVisitantes[] | null): IVisitantes[] {
    return data ?? [];
  }

  protected refineData(data: IVisitantes[]): IVisitantes[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }
}
