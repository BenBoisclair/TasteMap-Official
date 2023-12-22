/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchAt<T>(
  url: string,
  options?: Record<string, any>,
): Promise<T> {
  // Construct the full URL based on the provided options.
  // If parameters are provided, append them to the URL.
  let fullUrl = url;
  if (options?.params) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const params = new URLSearchParams(options.params).toString();
    fullUrl = `${url}/${params}`;
  }

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Error fetching data from ${fullUrl}`);
  }

  return response.json() as Promise<T>;
}

export default fetchAt;

// Fetch event banners.
// const eventBanners = await fetchAt<EventBanner[]>('/api/eventbanners');

// Fetch a specific market.
// const market = await fetchAt<Market>('/api/markets', { params: { marketId: '1' }});

// Fetch market reviews.
// const reviews = await fetchAt<ReviewsResponse>('/api/markets/1/reviews');
