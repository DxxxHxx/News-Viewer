import { state } from "../components/index.js";

const ACTIVE_CLASS = "active";

// do something!
const Nav = () => {
  const root = document.querySelector("#root");
  const nav = document.createElement("nav");
  nav.className = "category-list";

  nav.insertAdjacentHTML(
    "afterbegin",
    `
  <ul>
          <li id="all" class="category-item active">전체보기</li>
          <li id="business" class="category-item">비즈니스</li>
          <li id="entertainment" class="category-item">엔터테인먼트</li>
          <li id="health" class="category-item">건강</li>
          <li id="science" class="category-item">과학</li>
          <li id="sports" class="category-item">스포츠</li>
          <li id="technology" class="category-item">기술</li>
        </ul>
  `
  );
  root.appendChild(nav);

  const items = nav.querySelectorAll("li");

  items.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      const id = event.target.id;
      state.category = id;

      for (index = 0; index < items.length; index++) {
        items[index].classList.contains(ACTIVE_CLASS) &&
          items[index].classList.remove(ACTIVE_CLASS);
      }
      item.classList.add(ACTIVE_CLASS);
    });
  });
  return nav;
};
export default Nav;
