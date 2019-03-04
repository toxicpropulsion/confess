export default function makeFetchRequest(method, body) {
  return fetch("/", {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json();
  });
}
