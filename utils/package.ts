import { PackageJson } from "https://deno.land/x/dnt@0.40.0/mod.ts"

type PackageInput = {
    repo: string
    description: string
    version: string
    license: string
    author: PackageJson["author"]
    keywords: string[]
}

export const createPackage = (input: PackageInput): PackageJson => ({

    // Required
    name: `@${input.repo}`,
    version: input.version,

    // Detail
    description: input.description,
    license: input.license,
    keywords: input.keywords,
    author: input.author,

    // Repository
    repository: {
        type: "git",
        url: `github:${input.repo}`
    },

    // Homapage
    homepage: `https://github.com/${input.repo}`,
    bugs: {
        url: `https://github.com/${input.repo}/issues`
    },
})
