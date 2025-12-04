import { sessionFlowName } from "../pages/ShikshalokamVoiceChat/enum";
import ROUTES from "../url";
import ptmQuestions from "../services/const/questions/ptmQuestions";
import ylcQuestions, { ylcStoryTextAudio } from "../services/const/questions/ylcQuestions";
import env from "../utils/env";
import { bot_routes, bot_websocket } from "../configure";

const base_path = env.AUDIO_PATH();

export const FLOW_CONFIG = {
  [sessionFlowName.megaPTM]: {
    flowName: sessionFlowName.megaPTM,
    questions: ptmQuestions,
    homePageRoute: ROUTES.SHIKSHALOKAM_PTM_HOME_PAGE,
    chatRoute: ROUTES.SHIKSHALOKAM_PTM_CHAT_PAGE,
    profileId: env.MEGA_PTM_PROFILE_ID(),
    apiRoute: "/mega_ptm",
    completionMessageKey: "ptmCompletionMessage",
    completionCTAKey: "ptmCompletionCTA",
    introHeadingKey: "ptmIntroductionHeading",
    uploadPhotoKey: "evidence'",
    introLines: ["ptmIntroductionDescriptionLine1", "ptmIntroductionDescriptionLine2", "ptmIntroductionDescriptionLine3"],
    showCompletionPopup: true,
    storyActions: {
      showPhotoUpload: false,
      showEdit: false,
      showDownload: false,
    },
  },
  [sessionFlowName.YLC]: {
    flowName: sessionFlowName.YLC,
    questions: ylcQuestions,
    homePageRoute: ROUTES.SHIKSHALOKAM_YLC_HOME_PAGE,
    chatRoute: ROUTES.SHIKSHALOKAM_YLC_CHAT_PAGE,
    profileId: env.YLC_PROFILE_ID(),
    apiRoute: "/ylc",
    completionMessageKey: "ptmCompletionMessage",
    completionCTAKey: "ptmCompletionCTA",
    introHeadingKey: "homepageHeading",
    introHeadingKey1: "homepageHeading1",
    introLines: ["homepageList", "homepageList1", "homepageList2"],
    uploadPhotoKey: "evidenceStory",
    showCompletionPopup: false,
    storyActions: {
      showPhotoUpload: true,
      showEdit: true,
      showDownload: true,
    },
    storyTextAudio: ylcStoryTextAudio,
  },
};

export const getFlowConfig = flowType => {
  const config = FLOW_CONFIG[flowType];
  if (!config) {
    throw new Error(`Flow configuration not found for: ${flowType}`);
  }
  return config;
};

export const FLOW_CONFIG_V2 = {
  [sessionFlowName.SchoolSurvey]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    imageUploadLimit: 10,
    postChatConfig: {
      allowImageUpload: true,
      imageUploadLimit: 10,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
  [sessionFlowName.GuestDiscussion]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    postChatConfig: {
      allowImageUpload: false,
      imageUploadLimit: 0,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
  [sessionFlowName.LoginDiscussion]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    postChatConfig: {
      allowImageUpload: false,
      imageUploadLimit: 0,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
  [sessionFlowName.ListeningActivity]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    postChatConfig: {
      allowImageUpload: false,
      imageUploadLimit: 0,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
  [sessionFlowName.GuestMiStory]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    postChatConfig: {
      allowImageUpload: true,
      imageUploadLimit: 10,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
  [sessionFlowName.LoginMiStory]: {
    chatHeading: "{homepageHeading}\n{homepageHeading1}",
    chatDescription: `1. {homepageList}\n2. {homepageList1}\n3. {homepageList2}`,
    postChatConfig: {
      allowImageUpload: true,
      imageUploadLimit: 10,
      maxImageSize: 2 * 1024 * 1024, // 2MB default
      displayEditStory: true,
      displayDownloadStory: true,
    },
  },
};

export const FLOW_TO_ROUTE_MAP = {
  [sessionFlowName.GuestDiscussion]: bot_routes.shikshalokam_chaupal,
  [sessionFlowName.LoginDiscussion]: bot_routes.shikshalokam_chaupal,
  [sessionFlowName.ListeningActivity]: bot_routes.listening_activity,
  [sessionFlowName.GuestMiStory]: {
    normal: bot_routes.normal,
    oneshot: bot_routes.oneshot,
  },
  [sessionFlowName.SchoolSurvey]: bot_routes.shikshalokam_chaupal,
  [sessionFlowName.ParentPerceptionSurvey]: bot_websocket.parent_perception_survey,
};

export const FLOW_TO_WEBSOCKET_MAP = {
  [sessionFlowName.GuestDiscussion]: bot_websocket.shikshalokam_chaupal,
  [sessionFlowName.LoginDiscussion]: bot_websocket.shikshalokam_chaupal,
  [sessionFlowName.ListeningActivity]: bot_websocket.listening_activity,
  [sessionFlowName.GuestMiStory]: {
    normal: bot_websocket.normal,
    oneshot: bot_websocket.oneshot,
  },
  [sessionFlowName.SchoolSurvey]: bot_websocket.listening_activity,
  [sessionFlowName.ParentPerceptionSurvey]: bot_websocket.parent_perception_survey,
};

export const getWebSocketUrlFromSession = (sessionName, selectedType = undefined) => {
  if (!FLOW_TO_WEBSOCKET_MAP[sessionName]) return null;
  if (typeof FLOW_TO_WEBSOCKET_MAP[sessionName] === "string") return FLOW_TO_WEBSOCKET_MAP[sessionName];
  if (selectedType && FLOW_TO_WEBSOCKET_MAP[sessionName][selectedType]) return FLOW_TO_WEBSOCKET_MAP[sessionName][selectedType];
  return bot_routes.reflection;
};

export const getRouteFromSession = (sessionName, selectedType = undefined) => {
  if (!FLOW_TO_ROUTE_MAP[sessionName]) return null;
  if (typeof FLOW_TO_ROUTE_MAP[sessionName] === "string") return FLOW_TO_ROUTE_MAP[sessionName];
  if (selectedType && FLOW_TO_ROUTE_MAP[sessionName][selectedType]) return FLOW_TO_ROUTE_MAP[sessionName][selectedType];
  return bot_routes.reflection;
};
/**
 * Extracts variable placeholders from a string
 * @param {string} text - The text containing variable placeholders in the format {variableName}
 * @returns {string[]|null} An array of matched variables (e.g., ["{homepageHeading}", "{homepageList}"]) or null if no matches found
 * @example
 * getStringVariables("Hello {name}, welcome to {place}")
 */
export const getStringVariables = text => {
  return text.match(/{(\w+)}/g);
};

/**
 * Replaces variable placeholders in a string with corresponding values from an object
 * @param {string} text - The text containing variable placeholders in the format {variableName}
 * @param {Object} obj - An object containing key-value pairs for substitution
 * @returns {string} The text with all placeholders replaced by their corresponding values from the object
 * @example
 * processStringSubstitution("Hello {name}, welcome to {place}", { name: "John", place: "Paris" })
 * // Returns: "Hello John, welcome to Paris"
 */
export const processStringSubstitution = (text, obj) => {
  return text.replace(/{(\w+)}/g, (match, key) => obj[key] || match);
};

/**
 * Safely retrieves postChatConfig for a specific flow with default fallback values
 * @param {string} flowName - The name of the flow (e.g., sessionFlowName.GuestDiscussion)
 * @returns {Object} The postChatConfig object with default values if not found
 * @example
 * getPostChatConfig(sessionFlowName.GuestDiscussion)
 * // Returns: { allowImageUpload: false, imageUploadLimit: 0, maxImageSize: 52428800, displayEditStory: true, displayDownloadStory: true }
 */
export const getPostChatConfig = flowName => {
  const defaultConfig = {
    allowImageUpload: false,
    imageUploadLimit: 0,
    maxImageSize: 2 * 1024 * 1024, // 2MB in bytes (default fallback)
    displayEditStory: true,
    displayDownloadStory: true,
  };

  if (!flowName || !FLOW_CONFIG_V2[flowName]) {
    return defaultConfig;
  }

  return {
    ...defaultConfig,
    ...FLOW_CONFIG_V2[flowName].postChatConfig,
  };
};

/**
 * Updates postChatConfig with values from backend API response
 * @param {string} flowName - The name of the flow
 * @param {Object} apiConfig - API response containing max_images and image_size
 * @returns {void}
 * @example
 * updatePostChatConfigFromAPI('guest-discussion', { max_images: 5, image_size: 5242880 })
 */
export const updatePostChatConfigFromAPI = (flowName, apiConfig) => {
  if (!flowName || !FLOW_CONFIG_V2[flowName] || !apiConfig) {
    return;
  }

  // Update the config with API values
  if (apiConfig.max_images !== undefined) {
    FLOW_CONFIG_V2[flowName].postChatConfig.imageUploadLimit = apiConfig.max_images;
  }

  if (apiConfig.image_size !== undefined) {
    FLOW_CONFIG_V2[flowName].postChatConfig.maxImageSize = apiConfig.image_size;
  }

  // Store the full API response for reference (optional)
  FLOW_CONFIG_V2[flowName].postChatConfig._apiConfig = {
    ...apiConfig,
    fetchedAt: new Date().toISOString(),
  };
};

/**
 * Get human-friendly image size in MB
 * @param {number} bytes - Size in bytes
 * @returns {number} Size in MB rounded to 1 decimal place
 */
export const bytesToMB = bytes => {
  return Math.round((bytes / (1024 * 1024)) * 10) / 10;
};
