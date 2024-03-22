import { resolve } from "https://deno.land/std@0.220.1/path/mod.ts"
import { PackageJson, build } from "https://deno.land/x/dnt@0.40.0/mod.ts"
import { createPackage } from "./utils/package.ts"

const { dirname } = import.meta

if (dirname === undefined)
    throw new Error("Failed to get dirname.")

await build({
    package: createPackage({
        repo: "ys319/use-replace",
        description: "Replace string with component using RegExp.",
        license: "MIT",
        keywords: ["react", "string", "replace"],
        author: "Yoshimasa Kuroyama",
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
    packageManager: "npm",

    // Tests
    test: false,
    typeCheck: "both",

    // Output
    shims: {},
    skipSourceOutput: true,
    declaration: "separate",
    scriptModule: false,

    // Finishing
    postBuild: async () => {

        // Copy files to dist
        const files = [
            ["LICENSE"],
            ["README.md"],
        ]

        for (const file of files) {
            await Deno.copyFile(
                resolve(dirname, ...file),
                resolve(dirname, "dist", ...file),
            )
        }

        // Fix package.json
        const devDependencies = [
            "@types/react"
        ]

        const json: PackageJson = JSON.parse(
            await Deno.readTextFile(
                resolve(dirname, "dist", "package.json")
            )
        )

        if (json.dependencies === undefined) return

        for (const item of devDependencies) {
            json.devDependencies = {
                ...json.devDependencies,
                [item]: json.dependencies[item]
            }
            delete json.dependencies[item]
        }

        await Deno.writeTextFile(
            resolve(dirname, "dist", "package.json"),
            JSON.stringify(json, undefined, 2),
        )
    }
})
