const encoder = new TextEncoder("utf-8");
const decoder = new TextDecoder("utf-8");

export async function handleRequest(request) {
  const animalFact = await fetch(
    "https://random-data-api.fermyon.app/animals/json"
  );

  const animalFactBody = decoder.decode(
    (await animalFact.arrayBuffer()) || new Uint8Array()
  );

  const env = JSON.stringify(process.env);

  const body = `Here's an animal fact: ${animalFactBody}\n`;
  return {
    status: 200,
    headers: { foo: "bar" },
    body: encoder.encode(body).buffer,
  };
}
