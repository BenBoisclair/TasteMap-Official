async function fetchAt<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  options?: Record<string, any>,
  initialData?: T
): Promise<T> {
  if (initialData) {
    return initialData;
  }

  let fullUrl = url;
  if (options?.params && method === "GET") {
    // Typically, only GET requests have URL parameters
    const params = new URLSearchParams(options.params).toString();
    fullUrl = `${url}?${params}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers, // Spread in any additional headers
    },
  };

  // Include the body in the request for POST, PUT, and PATCH methods
  if (["POST", "PUT", "PATCH"].includes(method) && options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(fullUrl, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${fullUrl} with method ${method}`
    );
  }

  return response.json() as Promise<T>;
}

export default fetchAt;
