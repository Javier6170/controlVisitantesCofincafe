import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PISOS } from 'app/config/pisos.constants';
import { EQUIPOS } from 'app/config/equipos.constants';
import { VisitantesFormService, VisitantesFormGroup } from './visitantes-form.service';
import { IVisitantes } from '../visitantes.model';
import { VisitantesService } from '../service/visitantes.service';

@Component({
  selector: 'jhi-visitantes-update',
  templateUrl: './visitantes-update.component.html',
  styleUrls: ['./visitantes-update.component.css'],
})
export class VisitantesUpdateComponent implements OnInit {
  isSaving = false;
  visitantes: IVisitantes | null = null;
  areas = [];
  pisos = PISOS;
  equipos = EQUIPOS;
  now = new Date();

  areasSeleccion = {
    'PISO 2': ['FABRICA DE CREDITO', 'GARANTIA', 'MICROCREDITO'],
    'PISO 3': ['COFIWORK'],
    'PISO 4': ['COFIWORK'],
    'PISO 5': ['GESTION DE LA INFORMACIÓN', 'GESTION DOCUMENTAL', 'GESTION HUMANA', 'CONTABILIDAD', 'OPERACIONES', 'CARTERA'],
    'PISO 6': ['MERCADEO', 'GERENCIA GENERAL', 'JURIDICA', 'RIESGOS', 'CONTROL INTERNO'],
    'PISO 7': ['AUDITORIO'],
  };

  editForm: VisitantesFormGroup = this.visitantesFormService.createVisitantesFormGroup();

  constructor(
    protected visitantesService: VisitantesService,
    protected visitantesFormService: VisitantesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitantes }) => {
      this.visitantes = visitantes;
      if (visitantes) {
        this.updateForm(visitantes);
      }
    });

    document.getElementById('info').style.display = 'none';
  }

  cambioArea(dato): void {
    this.areas = this.areasSeleccion[dato];
  }

  cambioEquipo(dato: any): void {
    // eslint-disable-next-line eqeqeq
    if (dato == 'NO') {
      document.getElementById('info').style.display = 'none';
    } else {
      document.getElementById('info').style.display = 'block';
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visitantes = this.visitantesFormService.getVisitantes(this.editForm);
    visitantes.fecha = new Date();
    alert(visitantes.fecha);
    if (visitantes.nombreEquipo == null) {
      visitantes.nombreEquipo = '';
    }
    if (visitantes.marcaEquipo == null) {
      visitantes.marcaEquipo = '';
    }
    if (visitantes.serialEquipo == null) {
      visitantes.serialEquipo = '';
    }

    if (visitantes.id !== null) {
      this.subscribeToSaveResponse(this.visitantesService.update(visitantes));
    } else {
      this.subscribeToSaveResponse(this.visitantesService.create(visitantes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitantes>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(visitantes: IVisitantes): void {
    this.visitantes = visitantes;
    this.visitantesFormService.resetForm(this.editForm, visitantes);
  }
}
