import dayjs from 'dayjs/esm';

import { IVisitantes, NewVisitantes } from './visitantes.model';

export const sampleWithRequiredData: IVisitantes = {
  id: 79864,
};

export const sampleWithPartialData: IVisitantes = {
  id: 2293,
  identificacion: 'copying Madera e-enable',
  nombre: 'Algodón evolve',
  apellido: 'Negro platforms',
  fecha: dayjs('2023-01-26'),
  areaVisitada: 'partnerships applications Plástico',
  equipo: 'La Barrio Optimización',
  observaciones: 'Metal',
};

export const sampleWithFullData: IVisitantes = {
  id: 37825,
  identificacion: 'Galicia Madera productividad',
  nombre: 'Fácil',
  apellido: 'invoice',
  fecha: dayjs('2023-01-26'),
  pisoVisitado: 'Asturias Mobilidad PNG',
  areaVisitada: 'Madera Mercado Supervisor',
  telefono: 'Agente Verde Madera',
  equipo: 'sistemática Savings',
  observaciones: 'compress Verde',
};

export const sampleWithNewData: NewVisitantes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
