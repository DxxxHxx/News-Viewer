import Nav from "./Nav.js";
import NewsList from "./NewsList.js";

// export let state = { category: "all" };
export let state = new Proxy(
  { category: "all" },
  {
    set(obj, prop, newValue) {
      let prev = obj[prop];
      obj[prop] = newValue;
      // console.log(`${prev} => ${newValue}`);
      const root = document.querySelector("#root");
      const prevContainer = document.querySelector(".news-list-container");
      const scrollObserver = document.querySelector(".scroll-observer");
      root.removeChild(prevContainer);
      prevContainer.removeChild(scrollObserver);
      NewsList(newValue);
      this.get(newValue);
      return newValue;
    },
    get(newValue) {
      return newValue;
    },
  }
);

export { Nav, NewsList };
