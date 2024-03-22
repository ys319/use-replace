// @deno-types="npm:@types/react@^18.2.0"
import { ReactNode, createElement, useMemo } from "npm:react@^18.2.0"

export type MatchRenderer = ({ matches }: { matches: RegExpMatchArray }) => ReactNode

const capturingExp = /\((?:\?<[^>]+>|\?:)?/g

/**
 * Normalize RegExp.
 * Transform RegExp to global and single capturing group.
 * @param regexp Target RegExp.
 * @returns Normalized RegExp.
 */
const normalize = (regexp: RegExp) => new RegExp(
    `(${regexp.source.replaceAll(capturingExp, "(?:")})`,
    regexp.flags
)

/**
 * Create replacer for string replace with component.
 * @param regexp RegExp for replacing.
 * @returns Replacer function.
 */
export const useReplace = (regexp: RegExp): (text: string, Component: MatchRenderer) => ReactNode[] => {

    // Global required
    if (!regexp.flags.includes("g"))
        throw new Error("Error: useReplace hook requires a global RegExp (e.g., /pattern/g).")

    const normalized = useMemo(() => normalize(regexp), [regexp])
    return (text, Component) => {
        const parts = text.split(normalized)
        return parts.map((part, index) => {
            if (index % 2 == 0) return part
            const [matches] = [...part.matchAll(regexp)]
            return createElement(Component, { key: index, matches })
        })
    }
}
