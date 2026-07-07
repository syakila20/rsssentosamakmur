export const isEmptyValue = (val: unknown): boolean => {
  if (Array.isArray(val)) return val.length === 0;

  if (val === null || val === undefined) return true;

  if (typeof val === "string") return val.trim() === "";

  return false;
};
