import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../visitantes.test-samples';

import { VisitantesFormService } from './visitantes-form.service';

describe('Visitantes Form Service', () => {
  let service: VisitantesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitantesFormService);
  });

  describe('Service methods', () => {
    describe('createVisitantesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVisitantesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            identificacion: expect.any(Object),
            nombre: expect.any(Object),
            apellido: expect.any(Object),
            fecha: expect.any(Object),
            pisoVisitado: expect.any(Object),
            areaVisitada: expect.any(Object),
            telefono: expect.any(Object),
            equipo: expect.any(Object),
            observaciones: expect.any(Object),
          })
        );
      });

      it('passing IVisitantes should create a new form with FormGroup', () => {
        const formGroup = service.createVisitantesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            identificacion: expect.any(Object),
            nombre: expect.any(Object),
            apellido: expect.any(Object),
            fecha: expect.any(Object),
            pisoVisitado: expect.any(Object),
            areaVisitada: expect.any(Object),
            telefono: expect.any(Object),
            equipo: expect.any(Object),
            observaciones: expect.any(Object),
          })
        );
      });
    });

    describe('getVisitantes', () => {
      it('should return NewVisitantes for default Visitantes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVisitantesFormGroup(sampleWithNewData);

        const visitantes = service.getVisitantes(formGroup) as any;

        expect(visitantes).toMatchObject(sampleWithNewData);
      });

      it('should return NewVisitantes for empty Visitantes initial value', () => {
        const formGroup = service.createVisitantesFormGroup();

        const visitantes = service.getVisitantes(formGroup) as any;

        expect(visitantes).toMatchObject({});
      });

      it('should return IVisitantes', () => {
        const formGroup = service.createVisitantesFormGroup(sampleWithRequiredData);

        const visitantes = service.getVisitantes(formGroup) as any;

        expect(visitantes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVisitantes should not enable id FormControl', () => {
        const formGroup = service.createVisitantesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVisitantes should disable id FormControl', () => {
        const formGroup = service.createVisitantesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
