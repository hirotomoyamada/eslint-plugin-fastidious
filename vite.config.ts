import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const root = fileURLToPath(new URL(".", import.meta.url))
const src = path.resolve(root, "src")

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(src, "index.ts"),
      fileName: (_format, entryName) => `${entryName}.js`,
      formats: ["es"],
    },
    minify: false,
    rolldownOptions: {
      external: (id) =>
        !id.startsWith(".") && !id.startsWith("@/") && !path.isAbsolute(id),
      output: {
        exports: "auto",
        preserveModules: true,
        preserveModulesRoot: src,
      },
    },
  },
  plugins: [
    dts({
      beforeWriteFile: (filePath, content) => ({
        content: content.replaceAll(
          /(?<importPath>(?:from|import\s*\()\s*["']\..*?)(?<quote>["'])/gu,
          (...replaceArguments) => {
            const { importPath, quote } = replaceArguments.at(-1) as {
              importPath: string
              quote: string
            }

            if (importPath.endsWith(".js") || importPath.endsWith(".json")) {
              return `${importPath}${quote}`
            }

            return `${importPath}.js${quote}`
          },
        ),
        filePath,
      }),
      include: [path.resolve(src, "index.ts"), path.resolve(src, "rules")],
      insertTypesEntry: true,
      strictOutput: true,
      tsconfigPath: path.resolve(root, "tsconfig.build.json"),
    }),
  ],
  resolve: {
    alias: {
      "@": src,
    },
  },
})
