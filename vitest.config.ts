// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()], // @/ alias-larını tanımaq üçün
  test: {
    globals: true, // describe, it, expect qlobal olsun deyə
    environment: "node",
    // Təhlükəsizlik Guard-ı:
    setupFiles: ["./src/tests/setup.ts"],
    globalSetup: ["./src/tests/globalSetup.ts"],
  },
});