export default function fetcher(url: string, data: any = undefined) {
  console.log(data, JSON.stringify(data));
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
