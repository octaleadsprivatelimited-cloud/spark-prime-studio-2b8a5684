import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "./firebase";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location.pathname]);
}
