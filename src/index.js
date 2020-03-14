const movieUrl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=cd5839ce5f8ff83d23554ad75e86cc38";

const TVUrl =
  "https://api.themoviedb.org/3/trending/tv/week?api_key=cd5839ce5f8ff83d23554ad75e86cc38";
const imgurl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

const clear = () => {
  document.getElementById("page").innerHTML = "";
  const ul = document.createElement("ul");
  ul.setAttribute("id", "ulmovieList");
  document.getElementById("page").append(ul);
};

const getPage = (url, count = 10) => {
  fetch(url)
    .then(response => response.json())
    .then(data => createlist(data.results.slice(0, count)));
};

const getMovie = (e, movie) => {
  const div = document.createElement("div");
  const name = document.createElement("h1");
  name.innerHTML = movie.hasOwnProperty("original_title")
    ? movie.original_title
    : movie.original_name;
  const poster = document.createElement("img");
  poster.setAttribute("src", imgurl + movie.poster_path);
  const discription = document.createElement("p");
  discription.innerHTML = movie.overview;

  clear();
  div.append(poster);
  div.append(name);
  div.append(discription);
  const movieUrl = `https://api.themoviedb.org/3/movie/${
    movie.id
  }/recommendations?api_key=cd5839ce5f8ff83d23554ad75e86cc38&language=en-US&page=1`;
  const TVUrl = `https://api.themoviedb.org/3/tv/${
    movie.id
  }/recommendations?api_key=cd5839ce5f8ff83d23554ad75e86cc38&language=en-US&page=1`;

  const url = movie.hasOwnProperty("original_title") ? movieUrl : TVUrl;

  getPage(url, 3);

  document.getElementById("page").append(div);
};
const getName = movie => {
  const liFirst = document.createElement("li");
  const alink = document.createElement("a");
  alink.setAttribute("href", "#");
  alink.addEventListener("click", e => getMovie(e, movie));
  alink.innerHTML = movie.original_title;
  alink.innerHTML = movie.hasOwnProperty("original_title")
    ? movie.original_title
    : movie.original_name;
  liFirst.append(alink);
  return liFirst;
};

const createlist = data => {
  const page = document.getElementById("page");
  const mlist = document.getElementById("ulmovieList");
  page.append(mlist);
  for (const movie of data) {
    mlist.append(getName(movie));
  }
};

const search = () => {
  clear();
  const input = document.getElementById("search").value;
  document.getElementById("search").value = "";
  if (input === "") {
    getPage(movieUrl);
    getPage(TVUrl);
  } else {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=cd5839ce5f8ff83d23554ad75e86cc38&language=en-US&query=${input}`;
    const TVUrl = `https://api.themoviedb.org/3/search/tv?api_key=cd5839ce5f8ff83d23554ad75e86cc38&language=en-US&query=${input}`;
    getPage(movieUrl);
    getPage(TVUrl);
  }
};

getPage(movieUrl);
getPage(TVUrl);
const button = document.getElementById("button");
button.addEventListener("click", search);
