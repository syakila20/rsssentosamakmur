export const toPlain = <T>(data: T): T => JSON.parse(JSON.stringify(data));
