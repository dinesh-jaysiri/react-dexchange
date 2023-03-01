import { configureStore } from "@reduxjs/toolkit";

import provider from "./provider";
import exchange from "./exchange";
import tokens from "./tokens";
import ui from "./ui";


export default function () {
  return configureStore({
    reducer: {
      provider,
      exchange,
      tokens,
      ui
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}
