# React "useReplace" hook.

Replace string with component using regexp.

## Example

```tsx
import { MatchRenderer, useReplace } from "@ys319/use-replace";

const Highlight: MatchRenderer = ({ matches: [match] }) => `[${match}]`;

const App = () => {
  const replace = useReplace(/replacer?/ig);

  return (
    <p>
      {replace("React RegExp Replacer!", Highlight)}
      <br />
      {replace("This is very simple replacer hook.", Highlight)}
      <br />
      {replace("Let's RePLaCe it!", Highlight)}
    </p>
  );

  // Output:
  // > React RegExp [Replacer]!
  // > This is very simple [replacer] hook.
  // > Let's [RePLaCe] it!
};
```
