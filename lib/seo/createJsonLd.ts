export function createJsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
