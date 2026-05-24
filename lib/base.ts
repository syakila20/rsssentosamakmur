// const BASE_URL =
//   typeof window === "undefined"
//     ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
//     : "";

// export async function baseFetcher<T>(url: string): Promise<T> {
//   const finalUrl = `${BASE_URL}${url}`;
//   console.log("??final", finalUrl);
//   const res = await fetch(finalUrl, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(`Fetch error: ${res.status}`);
//   }

//   return res.json();
// }
export async function baseFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  return res.json();
}
