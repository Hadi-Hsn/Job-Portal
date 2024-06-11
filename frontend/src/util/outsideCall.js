/* eslint-disable react-hooks/rules-of-hooks */
// libs
import { createCaller } from "react-outside-call";
import { useNavigate } from "react-router-dom";

// a workaround to call hooks from outside react component
export const outsideCallerConfig = createCaller({
  navigate: () => useNavigate(),
});

const getNavigate = () => outsideCallerConfig.call.navigate;

export const navigate = (to, options) => {
  getNavigate()?.(to, options);
};
