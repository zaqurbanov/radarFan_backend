import type { FastifyServerOptions } from "fastify";
import { env } from "./env.js";

// Loga HEÇ VAXT düşməməli olan açarlar (sənəd, bölmə 10: token və mesaj mətni qorunmalıdır)
const SENSITIVE_KEYS = [
  "launch_token",
  "access_token",
  "refresh_token",
  "refreshToken",
  "handoff_token",
  "ticket",
  "token",
  "password",
  "text",          // çat mesajının mətni
  "authorization", // Authorization başlığı
  "cookie",
];

// Pino-da "*" yalnız BİR səviyyəni əvəz edir, ona görə hər açar üçün 3 dərinlik yazırıq:
//   token        -> { token }
//   *.token      -> { body: { token } }
//   *.*.token    -> { err: { config: { token } } }
const redactPaths = SENSITIVE_KEYS.flatMap((key) => [key, `*.${key}`, `*.*.${key}`]);

// URL-də olan həssas query parametrlərinin dəyərini gizlədir.
// Məsələn: /ws?ticket=abc  ->  /ws?ticket=[REDACTED]  (task 040-da WebSocket bileti URL-də gedəcək)
const SENSITIVE_QUERY = /([?&](?:ticket|token|access_token|launch_token|handoff_token)=)[^&]*/gi;
export const maskUrl = (url: string) => url.replace(SENSITIVE_QUERY, "$1[REDACTED]");

const isDevelopment = env.NODE_ENV === "development";

export const loggerOptions = {
  level: env.LOG_LEVEL,
  redact: { paths: redactPaths, censor: "[REDACTED]" },
  serializers: {
    // Fastify-ın standart "req" formatı, amma url həssas parametrlərdən təmizlənir
    req(request: any) {
      return {
        method: request.method,
        url: maskUrl(request.url),
        host: request.host,
        remoteAddress: request.ip,
        remotePort: request.socket?.remotePort,
      };
    },
  },
  // Yalnız development-də oxunaqlı log. Production-da "transport" sahəsi ümumiyyətlə yoxdur (JSON).
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  }),
} satisfies FastifyServerOptions["logger"];
