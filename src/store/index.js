// use react redux to manage useStates

import reducer from "./reducer";
import {configureStore} from 'redux'
import { createStore } from "redux";

const store=createStore(reducer)

export default store;
