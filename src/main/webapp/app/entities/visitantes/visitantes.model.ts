export interface IVisitantes {
  id: number;
  identificacion?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  fecha?: Date | null;
  pisoVisitado?: string | null;
  areaVisitada?: string | null;
  telefono?: string | null;
  equipo?: string | null;
  nombreEquipo?: string | null;
  marcaEquipo?: string | null;
  serialEquipo?: string | null;
  serialTarjeta?: string | null;
  observaciones?: string | null;
}

export class Visitante implements IVisitantes {
  constructor(
    public id: number,
    public identificacion?: string | null,
    public nombre?: string | null,
    public apellido?: string | null,
    public fecha?: Date | null,
    public pisoVisitado?: string | null,
    public areaVisitada?: string | null,
    public telefono?: string | null,
    public equipo?: string | null,
    public nombreEquipo?: string | null,
    public marcaEquipo?: string | null,
    public serialEquipo?: string | null,
    public serialTarjeta?: string | null,
    public observaciones?: string
  ) {}
}

export type NewVisitantes = Omit<IVisitantes, 'id'> & { id: null };
