import "https://deno.land/std@0.216.0/dotenv/load.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Partido {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  hora: string;
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const SEASON = "2024";
    const LEAGUE_ID = "140"; // LaLiga
    const FROM_DATE = "2025-04-22";
    const TO_DATE = "2025-04-25";

    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?season=${SEASON}&league=${LEAGUE_ID}&from=${FROM_DATE}&to=${TO_DATE}`,
      {
        headers: {
          "x-apisports-key": Deno.env.get("API_FOOTBALL_KEY") ?? "",
        },
      }
    );

    const json = await res.json();

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
      };
    });

    return ctx.render(partidos);
  },
};

export default function Main({ data }: PageProps<Partido[]>) {
  const porFecha: Record<string, Partido[]> = {};
  data.forEach((p) => {
    if (!porFecha[p.fecha]) porFecha[p.fecha] = [];
    porFecha[p.fecha].push(p);
  });

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
                <span>--</span>
                <span>--</span>
                <span>--</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <footer className="footer">
        <p>© 2025 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
