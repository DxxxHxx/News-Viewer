// do something!

const NewsList = (category,API_KEY) => {
  const root = document.querySelector("#root");
  const newsListContainerDOM = document.createElement("div");
  newsListContainerDOM.className = "news-list-container";
  const articleDOM = document.createElement("article");
  articleDOM.className = "news-list";
  const scrollObserver = document.createElement("div");
  scrollObserver.className = "scroll-observer";
  scrollObserver.insertAdjacentHTML(
    "afterbegin",
    `
  <img src="img/ball-triangle.svg" alt="Loading..." />
  `
  );
  let pageCnt = 0;
  const getData = async () => {
    // const API_KEY = `85fd5e4671574a9e888fa2e57165485f`;
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}&page=${pageCnt}&pageSize=5${
        category === undefined || category === "all"
          ? ""
          : `&category=${category}`
      }`
    ).then((res) => res.json());

    return data.articles;
  };

  const loadPage = () => {
    getData().then((articles) => {
      console.log(articles);
      if (articles.length === 0) {
        alert("마지막 페이지입니다.");
        return;
      }
      articles.forEach((article) => {
        const sectionDOM = document.createElement("section");
        sectionDOM.className = "news-item";
        sectionDOM.innerHTML = `     
              <div class="thumbnail">
                <a href=${
                  article.url
                } target="_blank" rel="noopener noreferrer">
                  <img
                    src=${
                      article.urlToImage ??
                      "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                    }
                    alt="thumbnail" />
                </a>
              </div>
              <div class="contents">
                <h2>
                  <a href=${
                    article.url
                  } target="_blank" rel="noopener noreferrer">
                   ${article.title}
                  </a>
                </h2>
                <p>
                  ${article.description ?? `" "`}
                </p>
              </div>
        `;
        articleDOM.appendChild(sectionDOM);
      });
    });
  };
  // loadPage();
  ////////////////////////////////////////////////
  const goToTop = document.createElement("div");
  goToTop.className = "go-top";
  goToTop.innerHTML = "⬆️";
  goToTop.addEventListener("click", () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
  ////////////////////////////////////////////////

  let observer = new IntersectionObserver(
    ([target]) => {
      if (target.isIntersecting) {
        setTimeout(() => {
          pageCnt += 1;
          loadPage();
          console.log(pageCnt);
          if (pageCnt >= 5) {
            goToTop.style.visibility = "visible";
          }
        }, 500);
      }
    },
    { threshold: 0.7 }
  );
  observer.observe(scrollObserver);

  newsListContainerDOM.appendChild(articleDOM);
  newsListContainerDOM.appendChild(scrollObserver);
  newsListContainerDOM.appendChild(goToTop);
  root.appendChild(newsListContainerDOM);
  return newsListContainerDOM;
};
export default NewsList;
