
import { useState } from "preact/hooks";

interface Props {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  hora: string;
  seleccion: string;
  cuota: string;
}

export default function IslaApuesta(props: Props) {
  const [monto, setMonto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const response = await fetch("/api/apuestas", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "test@correo.com", // Reemplaza con usuario real si tienes auth
        partido: {
          equipoLocal: props.equipoLocal,
          equipoVisitante: props.equipoVisitante,
          fecha: props.fecha,
          hora: props.hora,
          cuotas: {
            [props.seleccion]: props.cuota,
          },
        },
        seleccion: props.seleccion,
        cuota: props.cuota,
        monto: monto,
        fecha: new Date().toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setMensaje("¡Apuesta realizada con éxito!");
      setMonto("");
    } else {
      setMensaje("Error al realizar la apuesta.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ¿Cuánto deseas apostar?
        <input
          type="number"
          min="1"
          required
          value={monto}
          onInput={(e) => setMonto((e.target as HTMLInputElement).value)}
        />
      </label>
      <button type="submit">Confirmar Apuesta</button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
