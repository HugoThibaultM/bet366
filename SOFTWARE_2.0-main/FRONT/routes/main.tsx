// routes/api/main.tsx
import "https://deno.land/std@0.216.0/dotenv/load.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";


// Función para generar cuotas aleatorias
function generateRandomOdds(): { home: string; away: string; draw: string } {
  return {
    home: (Math.random() * (5.0 - 1.5) + 1.5).toFixed(2),
    away: (Math.random() * (5.0 - 1.5) + 1.5).toFixed(2),
    draw: (Math.random() * (5.0 - 1.5) + 1.5).toFixed(2),
  };
}

// Estructura de cada partido
interface Partido {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  hora: string;
  cuotas: {
    home: string;
    draw: string;
    away: string;
  };
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const SEASON = "2022";
    const LEAGUE_ID = "140"; // LaLiga
    const FROM_DATE = "2023-04-21";
    const TO_DATE = "2023-04-25";

    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?season=${SEASON}&league=${LEAGUE_ID}&from=${FROM_DATE}&to=${TO_DATE}`,
      {
        headers: {
          "x-apisports-key": Deno.env.get("API_FOOTBALL_KEY") ?? "",
        },
      }
    );

    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));

    const partidos: Partido[] = json.response.map((fixture: any) => {
      const fechaObj = new Date(fixture.fixture.date);
      const fecha = fechaObj.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
      const hora = fechaObj.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        equipoLocal: fixture.teams.home.name,
        equipoVisitante: fixture.teams.away.name,
        fecha,
        hora,
        cuotas: generateRandomOdds(),
      };
    });

    return ctx.render(partidos);
  },
};

// Componente principal para renderizar los partidos
export default function Main({ data }: PageProps<Partido[]>) {
  const porFecha: Record<string, Partido[]> = {};

  data.forEach((p) => {
    if (!porFecha[p.fecha]) porFecha[p.fecha] = [];
    porFecha[p.fecha].push(p);
  });
  const [selecciones, setSelecciones] = useState<
  { index: number; partido: Partido; seleccion: "home" | "draw" | "away" }[]>([]);

  function handleSeleccion(
    index: number,
    partido: Partido,
    seleccion: "home" | "draw" | "away"
  ) {
    setSelecciones((prev) => {
      const sinEste = prev.filter((sel) => sel.index !== index);
      return [...sinEste, { index, partido, seleccion }];
    });
  }
  
  return (
    <div className="page matches">
      <h1 className="selector">Partidos de la Jornada</h1>

      {Object.entries(porFecha).map(([fecha, partidos]) => (
        <div key={fecha}>
          <div className="date-title">{fecha}</div>
          {partidos.map((partido, index) => (
            <div className="match-card" key={index}>
              <div className="match-info">
                <span className="team-name">
                  {partido.equipoLocal} vs {partido.equipoVisitante}
                </span>
                <span className="match-time">{partido.hora}</span>
              </div>
              <div className="odds">
                Home
              <button type="button">{partido.cuotas.home}</button>
                Draw
              <button type="button">{partido.cuotas.draw}</button>
                Away
              <button type="button">{partido.cuotas.away}</button>
              </div>
            </div>
            
          ))}
        </div>
      ))}

      <footer className="footer">
        <p>Ingenieria del Software</p>
      </footer>
    </div>
  );
}
