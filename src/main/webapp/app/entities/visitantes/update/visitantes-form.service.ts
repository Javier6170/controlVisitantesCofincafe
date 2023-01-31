import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVisitantes, NewVisitantes } from '../visitantes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVisitantes for edit and NewVisitantesFormGroupInput for create.
 */
type VisitantesFormGroupInput = IVisitantes | PartialWithRequiredKeyOf<NewVisitantes>;

type VisitantesFormDefaults = Pick<NewVisitantes, 'id'>;

type VisitantesFormGroupContent = {
  id: FormControl<IVisitantes['id'] | NewVisitantes['id']>;
  identificacion: FormControl<IVisitantes['identificacion']>;
  nombre: FormControl<IVisitantes['nombre']>;
  apellido: FormControl<IVisitantes['apellido']>;
  fecha: FormControl<IVisitantes['fecha']>;
  pisoVisitado: FormControl<IVisitantes['pisoVisitado']>;
  areaVisitada: FormControl<IVisitantes['areaVisitada']>;
  telefono: FormControl<IVisitantes['telefono']>;
  equipo: FormControl<IVisitantes['equipo']>;
  observaciones: FormControl<IVisitantes['observaciones']>;
};

export type VisitantesFormGroup = FormGroup<VisitantesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VisitantesFormService {
  createVisitantesFormGroup(visitantes: VisitantesFormGroupInput = { id: null }): VisitantesFormGroup {
    const visitantesRawValue = {
      ...this.getFormDefaults(),
      ...visitantes,
    };
    return new FormGroup<VisitantesFormGroupContent>({
      id: new FormControl(
        { value: visitantesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      identificacion: new FormControl(visitantesRawValue.identificacion),
      nombre: new FormControl(visitantesRawValue.nombre),
      apellido: new FormControl(visitantesRawValue.apellido),
      fecha: new FormControl(visitantesRawValue.fecha),
      pisoVisitado: new FormControl(visitantesRawValue.pisoVisitado),
      areaVisitada: new FormControl(visitantesRawValue.areaVisitada),
      telefono: new FormControl(visitantesRawValue.telefono),
      equipo: new FormControl(visitantesRawValue.equipo),
      observaciones: new FormControl(visitantesRawValue.observaciones),
    });
  }

  getVisitantes(form: VisitantesFormGroup): IVisitantes | NewVisitantes {
    return form.getRawValue() as IVisitantes | NewVisitantes;
  }

  resetForm(form: VisitantesFormGroup, visitantes: VisitantesFormGroupInput): void {
    const visitantesRawValue = { ...this.getFormDefaults(), ...visitantes };
    form.reset(
      {
        ...visitantesRawValue,
        id: { value: visitantesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VisitantesFormDefaults {
    return {
      id: null,
    };
  }
}
