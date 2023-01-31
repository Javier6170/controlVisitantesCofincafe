import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitantes } from '../visitantes.model';

@Component({
  selector: 'jhi-visitantes-detail',
  templateUrl: './visitantes-detail.component.html',
})
export class VisitantesDetailComponent implements OnInit {
  visitantes: IVisitantes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitantes }) => {
      this.visitantes = visitantes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
