export function addArrayItem<T>(list: T[], item: T) {
  return [...list, item];
}

export function removeArrayItem<T>(list: T[], index: number) {
  return list.filter((_, i) => i !== index);
}

export function updateArrayItem<T, K extends keyof T>(
  list: T[],
  index: number,
  field: K,
  value: T[K],
) {
  return list.map((item, i) =>
    i === index
      ? {
          ...item,
          [field]: value,
        }
      : item,
  );
}
