import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // исправили на pathname

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // используем pathname для отслеживания изменения пути

  return null;
};

export default ScrollToTop;
