// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_apostar from "./routes/api/apostar.ts";
import * as $api_login from "./routes/api/login.ts";
import * as $api_register from "./routes/api/register.ts";
import * as $apuesta from "./routes/apuesta.tsx";
import * as $apuestas from "./routes/apuestas.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $main from "./routes/main.tsx";
import * as $register from "./routes/register.tsx";
import * as $Form from "./islands/Form.tsx";
import * as $IslaApuesta from "./islands/IslaApuesta.tsx";
import * as $LoginForm from "./islands/LoginForm.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/apostar.ts": $api_apostar,
    "./routes/api/login.ts": $api_login,
    "./routes/api/register.ts": $api_register,
    "./routes/apuesta.tsx": $apuesta,
    "./routes/apuestas.tsx": $apuestas,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/main.tsx": $main,
    "./routes/register.tsx": $register,
  },
  islands: {
    "./islands/Form.tsx": $Form,
    "./islands/IslaApuesta.tsx": $IslaApuesta,
    "./islands/LoginForm.tsx": $LoginForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
