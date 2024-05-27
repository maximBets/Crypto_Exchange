type Mods = Record<string, boolean | string>;

export const classNames = (
  className: string,
  mods: Mods = {},
  additional: (string | undefined)[] = []
): string => {
  return [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([key, value]) => key),
  ].join(" ");
};
