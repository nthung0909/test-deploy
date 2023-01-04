import { combineReducers } from "redux";
import { loadingR } from "./loadingR";
import { userR } from "./userR";
import { careerTrackR } from "./careerTrackR";
import { createNewTrackR } from "./createNewTrackR";
import { myCareerTrackR } from "./myCareerTrackR";

const appReducers = combineReducers({
  loadingR,
  userR,
  careerTrackR,
  createNewTrackR,
  myCareerTrackR,
});

export default appReducers;
