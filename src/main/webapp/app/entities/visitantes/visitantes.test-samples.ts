import { IVisitantes, NewVisitantes } from './visitantes.model';

export const sampleWithRequiredData: IVisitantes = {
  id: 79864,
};

export const sampleWithNewData: NewVisitantes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
