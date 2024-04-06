// do something!
import { Nav, NewsList, state } from "./components/index.js";
import { API_KEY } from "./api.js";

const category = Object.values(state.category)[0];

Nav();
NewsList(category,API_KEY);
