export default function fetchDocuments(token, query) {
  return async function() {
    console.log("called")
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/query`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ query })
    });

    // TODO: handle success: false case
    return await response.json();
  }
}