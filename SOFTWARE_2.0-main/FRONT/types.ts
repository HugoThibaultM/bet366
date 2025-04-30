import { OptionalId } from "npm:mongodb";

export type User = {
  id: string;
  name: string;
  age: number;
  email: string;
};

export type Apuesta = {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string; // formato corto como "sáb, 22 abr"
  seleccion: "home" | "draw" | "away";
  cuota: string;
  creadaEn: Date;
};

export type Partido = {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  hora: string;
  cuotas: {
    home: string;
    draw: string;
    away: string;
  };
};

export type ApuestaDB = OptionalId<Apuesta>;
export type UserDB = OptionalId<Omit<User, "id">>;
