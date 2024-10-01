const PROXY_SERVER_URL = "https://bitefinder-server.onrender.com";
const FALLBACK_SERVER_URL = "https://corsproxy.io/?"; // This is a public CORS proxy as a fallback

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      console.log(`Attempt ${i + 1} failed. Retrying...`);
    }
  }
}

export async function fetchRestaurants(lat, lng, page_type) {
  const encodedUrl = encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`);
  
  try {
    console.log("Attempting to fetch from proxy server...");
    return await fetchWithRetry(`${PROXY_SERVER_URL}/api/restaurants?lat=${lat}&lng=${lng}&page_type=${page_type}`);
  } catch (proxyError) {
    console.error("Proxy server failed:", proxyError);
    console.log("Attempting to fetch using fallback CORS proxy...");
    try {
      return await fetchWithRetry(`${FALLBACK_SERVER_URL}${encodedUrl}`);
    } catch (fallbackError) {
      console.error("Fallback CORS proxy failed:", fallbackError);
      throw new Error("All attempts to fetch data failed");
    }
  }
}