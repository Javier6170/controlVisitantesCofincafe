import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VisitantesFormService } from './visitantes-form.service';
import { VisitantesService } from '../service/visitantes.service';
import { IVisitantes } from '../visitantes.model';

import { VisitantesUpdateComponent } from './visitantes-update.component';

describe('Visitantes Management Update Component', () => {
  let comp: VisitantesUpdateComponent;
  let fixture: ComponentFixture<VisitantesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let visitantesFormService: VisitantesFormService;
  let visitantesService: VisitantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VisitantesUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(VisitantesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VisitantesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    visitantesFormService = TestBed.inject(VisitantesFormService);
    visitantesService = TestBed.inject(VisitantesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const visitantes: IVisitantes = { id: 456 };

      activatedRoute.data = of({ visitantes });
      comp.ngOnInit();

      expect(comp.visitantes).toEqual(visitantes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisitantes>>();
      const visitantes = { id: 123 };
      jest.spyOn(visitantesFormService, 'getVisitantes').mockReturnValue(visitantes);
      jest.spyOn(visitantesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visitantes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: visitantes }));
      saveSubject.complete();

      // THEN
      expect(visitantesFormService.getVisitantes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(visitantesService.update).toHaveBeenCalledWith(expect.objectContaining(visitantes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisitantes>>();
      const visitantes = { id: 123 };
      jest.spyOn(visitantesFormService, 'getVisitantes').mockReturnValue({ id: null });
      jest.spyOn(visitantesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visitantes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: visitantes }));
      saveSubject.complete();

      // THEN
      expect(visitantesFormService.getVisitantes).toHaveBeenCalled();
      expect(visitantesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVisitantes>>();
      const visitantes = { id: 123 };
      jest.spyOn(visitantesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ visitantes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(visitantesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
