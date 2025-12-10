import { axiosInstance } from "../client";

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
  try {
    // Remove leading slash if present to normalize the route
    const normalizedRoute = flowRoute.startsWith("/") ? flowRoute.slice(1) : flowRoute;

    const response = await axiosInstance({
      method: "GET",
      url: `/api/flows/${normalizedRoute}/`,
    });

    return response.data || null;
  } catch (error) {
    console.error(`Error fetching flow by route '${flowRoute}':`, error);

    // Return null instead of throwing to allow fallback to hardcoded config
    if (error.response?.status === 404) {
      console.warn(`Flow not found: ${flowRoute}`);
      return null;
    }

    throw error;
  }
};
