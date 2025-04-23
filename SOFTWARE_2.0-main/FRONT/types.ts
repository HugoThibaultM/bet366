import { OptionalId } from "npm:mongodb";

export type User = {
  id: string;
  name: string;
  age: number;
  email: string;
}

export type UserDB = OptionalId<Omit<User,"id">>;