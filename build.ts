import { resolve } from "https://deno.land/std@0.220.1/path/mod.ts"
import { build } from "https://deno.land/x/dnt@0.40.0/mod.ts"
import { createPackage } from "./utils/package.ts"

const { dirname } = import.meta

if (dirname === undefined)
    throw new Error("Failed to get dirname.")

await build({
    package: createPackage({
        repo: "ys319/use-replace",
        description: "Replace string with component using RegExp.",
        version: "0.0.1",
        license: "MIT",
        author: "Yoshimasa Kuroyama",
        keywords: ["react", "string", "replace"],
    }),

    // Source and Destination
    entryPoints: [
        resolve(dirname, "src", "mod.ts")
    ],
    outDir: resolve(dirname, "dist"),

    // TypeScript
    compilerOptions: {
        lib: ["ESNext"]
    },

    // Deno
    importMap: "deno.jsonc",
    packageManager: "pnpm",

    // Tests
    test: false,
    typeCheck: "both",

    // Output
    shims: {},
    skipSourceOutput: true,
    declaration: "separate",
    scriptModule: false,
})
