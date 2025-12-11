import axiosInstance from "../../utils/axios";

/**
 * Fetch all available flows from the backend
 * GET /api/flows/
 *
 * @returns {Promise<Array>} Array of flow objects
 *
 * @example
 * const flows = await getAllFlows();
 * // Returns: [{ id: 1, flow_name: "Reflection", flow_route: "/reflection", ... }]
 */
export const getAllFlows = async () => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: "/api/flows/",
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching all flows:", error);
    throw error;
  }
};

/**
 * Fetch a single flow by its flow_route
 * GET /api/flows/{flow_route}/
 *
 * @param {string} flowRoute - The flow route (e.g., "/reflection", "reflection")
 * @returns {Promise<Object|null>} Flow object with full configuration or null if not found
 *
 * @example
 * const flow = await getFlowByRoute("reflection");
 * // Returns: {
 * //   id: 2,
 * //   flow_name: "Reflection Flow",
 * //   websocket_url: "ws://...",
 * //   bot: {...},
 * //   image_config: {...},
 * //   ...
 * // }
 */
export const getFlowByRoute = async flowRoute => {
  console.log("[API] getFlowByRoute called with:", flowRoute);

  try {
    // Remove leading slash if present to normalize the route
    const normalizedRoute = flowRoute.startsWith("/") ? flowRoute.slice(1) : flowRoute;
    console.log("[API] Normalized route:", normalizedRoute);

    const apiUrl = `/api/flows/${normalizedRoute}/`;
    console.log("[API] Making request to:", apiUrl);

    const response = await axiosInstance({
      method: "GET",
      url: apiUrl,
    });

    console.log("[API] Response received:", response.status, response.data);
    return response.data || null;
  } catch (error) {
    console.error(`[API] Error fetching flow by route '${flowRoute}':`, error);
    console.error("[API] Error response:", error.response);
    console.error("[API] Error status:", error.response?.status);

    // Return null instead of throwing to allow fallback to hardcoded config
    if (error.response?.status === 404) {
      console.warn(`[API] Flow not found (404): ${flowRoute}`);
      return null;
    }

    console.error("[API] Throwing error");
    throw error;
  }
};
