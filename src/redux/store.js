import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const middleware = [logger];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
