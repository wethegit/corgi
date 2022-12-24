import { createContext } from "react";

const PageContext = createContext();

const PageProvider = ({ children, page }) => {
  return (
    <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>
  );
};

export { PageProvider as default, PageContext };
