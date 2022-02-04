import React from "react";
import { AppContextProps } from "../types";

export const AppContext: React.Context<AppContextProps> =
  React.createContext<AppContextProps>({
    token: null,
    userCredentials: null,
    posts: [],
  });
export const AppProvider: React.Provider<AppContextProps> = AppContext.Provider;
export const AppConsumer: React.Consumer<AppContextProps> = AppContext.Consumer;
