// components/LanguageSelectionGrid.js
import { useTranslation } from "react-i18next";
import { languageList, sessionFlowName } from "../pages/ShikshalokamVoiceChat/enum";
import { useLocation } from "react-router-dom";
import { useChatStorage, useSiteStorage } from "hooks/useStorage";
import { STORE_NAME_CONSTANTS } from "store/constants";
import { SESSION_USECASE_TYPE } from "constants/session";
import ROUTES from "../url";
import { useNavigate } from "react-router-dom";
import { useSiteDataLocalStore } from "store";

const LanguageSelectionGrid = ({
  usecaseType,
  // onLanguageSelect,
  // setIsLanguageProcessing
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const setChatLanguage = useSiteDataLocalStore(state => state.setChatLanguage);
  const setHasSelectedLanguage = useSiteDataLocalStore(state => state.setHasSelectedLanguage);
  const setFlow = useChatStorage()(state => state.setFlow);
  const setPreviousUrl = useSiteStorage()(state => state.setPreviousUrl);

  const handleLanguageClick = langValue => {
    setChatLanguage(langValue);
    setHasSelectedLanguage(true);

    const ROUTE_MAP = {
      [SESSION_USECASE_TYPE.MEGA_PTM]: ROUTES.SHIKSHALOKAM_PTM_CHAT_PAGE,
      [SESSION_USECASE_TYPE.YLC]: ROUTES.SHIKSHALOKAM_YLC_CHAT_PAGE,
    };

    const FLOW_MAP = {
      [SESSION_USECASE_TYPE.MEGA_PTM]: sessionFlowName.megaPTM,
      [SESSION_USECASE_TYPE.YLC]: sessionFlowName.YLC,
    };

    setPreviousUrl(window.location.href);

    // Handle PTM/YLC use cases
    if (ROUTE_MAP[usecaseType]) {
      setFlow(FLOW_MAP[usecaseType]);
      navigate(ROUTE_MAP[usecaseType]);
      return;
    }

    // Handle flow parameter in URL (hardcoded or dynamic flows)
    const searchParams = new URLSearchParams(location.search);
    const currentFlow = searchParams.get("flow");

    if (currentFlow) {
      // Check if it's a hardcoded flow
      const flowRoutes = {
        [sessionFlowName.GuestMiStory]: ROUTES.SHIKSHALOKAM_GUEST_MI_STORY,
        [sessionFlowName.GuestDiscussion]: ROUTES.SHIKSHALOKAM_GUEST_VOICE_CHAT,
        [sessionFlowName.ListeningActivity]: ROUTES.SHIKSHALOKAM_GUEST_LISTENING_CHAT,
        [sessionFlowName.ParentPerceptionSurvey]: ROUTES.SHIKSHALOKAM_PPPI_VOICE_CHAT,
      };

      const route = flowRoutes[currentFlow];
      if (route) {
        console.log("Navigating to hardcoded flow route:", route);
        navigate(route);
      } else {
        // Dynamic flow - preserve flow parameter
        console.log("Navigating to dynamic flow:", currentFlow);
        navigate(`${ROUTES.SHIKSHALOKAM_GUEST_VOICE_CHAT}?flow=${currentFlow}`);
      }
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const currentFlow = searchParams.get("flow");

  return (
    <>
      <div className="text-center text-lg md:text-2xl sm:text-md mt-0 sm:mt-[100px] text-slate-700">
        <b>{t("welcome_text")}</b>
      </div>
      <p className="sm:text-xl text-md font-semibold text-center">{t("languageQuestion")}</p>
      <div className="mt-4 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:justify-items-center lg:px-[80px] md:px-[20px] sm:px-[20px] px-[10px]">
        {languageList
          .filter(lang => !lang.excludeFor.includes(currentFlow) && !lang.excludeFor.includes(usecaseType))
          .map(lang => (
            <div key={lang.value} className="div14-lang w-full text-center vertical-center m-0 h-[100px] flex items-center justify-center" onClick={() => handleLanguageClick(lang.value)}>
              <button className="w-full">{lang.label}</button>
            </div>
          ))}
      </div>
    </>
  );
};

export default LanguageSelectionGrid;
