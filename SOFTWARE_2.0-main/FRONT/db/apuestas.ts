import { MongoClient } from "npm:mongodb";
import { OptionalId } from "npm:mongodb";
import { Partido } from "../types.ts";

const url = Deno.env.get("MONGO_URL");
if (!url) throw new Error("MONGO_URL not set");

const client = new MongoClient(url);
await client.connect();

type ApuestaDB = OptionalId<{
  userEmail: string;
  partido: Partido;
  seleccion: string;
  cuota: string;
  fecha: Date;
}>;

const db = client.db("usuarios");
const ApuestasCollection = db.collection<ApuestaDB>("apuestas");

export default ApuestasCollection;
