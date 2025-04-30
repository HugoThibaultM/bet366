// routes/api/apostar.ts
import { Handlers } from "$fresh/server.ts";
import ApuestasCollection from "../../db/apuestas.ts"; // Asegúrate de tener este archivo
import { Partido } from "../../types.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();

    const apuesta = {
      userEmail: body.userEmail,
      partido: body.partido as Partido,
      seleccion: body.seleccion, // "home" | "draw" | "away"
      cuota: body.cuota,
      fecha: new Date(),
    };

    await ApuestasCollection.insertOne(apuesta);

    return new Response(null, {
      status: 303,
      headers: { Location: "/apuestas" }, // Redirección a historial
    });
  },
};
