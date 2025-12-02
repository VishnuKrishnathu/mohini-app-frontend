import axiosInstance from "../../utils/axios";

/**
 * Fetch flow-specific image configuration from backend
 * @param {string} flowRoute - The flow route identifier
 * @returns {Promise<Object>} Configuration object with max_images, image_size, etc.
 * @example
 * getFlowImageConfig('shikshalokam_chaupal')
 * // Returns: { id: 2, name: "Standard Config", max_images: 5, image_size: 5242880, image_size_mb: 5.0 }
 */
export const getFlowImageConfigApi = async flowRoute => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `/api/flow-image-config/`,
      params: {
        flow_route: flowRoute,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flow image config:", error);
    throw error;
  }
};
