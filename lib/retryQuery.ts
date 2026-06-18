export async function retryDb<T>(
  fn: () => Promise<T>,
  retries = 3,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;

    await new Promise((r) => setTimeout(r, 2000));

    return retryDb(fn, retries - 1);
  }
}
