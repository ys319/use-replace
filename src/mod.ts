// @deno-types="npm:@types/react@^18.3.1"
import { ReactNode, createElement, useCallback, useMemo } from "npm:react@^18.3.1"

export type MatchRenderer = ({ matches }: { matches: RegExpMatchArray }) => ReactNode
export type NonMatchRenderer = ({ part }: { part: string }) => ReactNode

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
export const useReplace = (regexp: RegExp) => {

    // Global required
    if (!regexp.flags.includes("g"))
        throw new Error("Error: useReplace hook requires a global RegExp (e.g., /pattern/g).")

    const normalized = useMemo(() => normalize(regexp), [regexp])
    return useCallback(
        (text: string, matchRenderer: MatchRenderer, nonMatchRenderer?: NonMatchRenderer) => text.split(normalized).map((part, index) => {
            if (index % 2 == 0) {
                if (nonMatchRenderer === undefined) {
                    return part
                } else {
                    return createElement(nonMatchRenderer, { key: index, part })
                }
            }
            const [matches] = [...part.matchAll(regexp)]
            return createElement(matchRenderer, { key: index, matches })
        }),
        [normalized]
    )
}
