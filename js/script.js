"use strict";
const elTemplate = document.querySelector(".template").content;
const elList = document.querySelector(".list");
const elInput = document.querySelector(".input");
const elButtons = document.querySelector(".buttons")

const API_KEY = "b1566df1";
let search = "sherlock holmes";
let page = 1;

// //  RENDER MOVIES CARD

const renderMovies = function (arr, htmlElement) {
  const moviesFragment = document.createDocumentFragment();

  elList.innerHTML = null;

  arr.forEach((item) => {
    const clonedFilmTemplate = elTemplate.cloneNode(true);

    clonedFilmTemplate.querySelector(".film__img").src = item.Poster;
    clonedFilmTemplate.querySelector(".film__title").textContent = item.Title;
    clonedFilmTemplate.querySelector(".film__year").textContent = item.Year;
    clonedFilmTemplate.querySelector(".film__category").textContent = item.Type;

    moviesFragment.appendChild(clonedFilmTemplate);
  });

  htmlElement.appendChild(moviesFragment);
};


// // RENDER CREATE PAGENETION BUTTONS

const renderBtn = function(array, where){
  for (let i of array){
    const newBtn = document.createElement("button")
    newBtn.className = "pageBtn"
    newBtn.textContent = i
    newBtn.id = i
    newBtn.dataset.pageBtnId = newBtn.id
    where.appendChild(newBtn)
  }
}


// // FETCH API 

const getMovies = async function () {
  const request = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );

  const data = await request.json();
 

  let resultsBtnArray = Array(Math.ceil(data.totalResults / 10)).fill(1).map((x,y) => x + y)

  if ((data.Response = "True" && data.Search.length > 0)) {
    renderMovies(data.Search, elList);
  }
  
  elButtons.innerHTML = null
  renderBtn(resultsBtnArray, elButtons )
};

getMovies();



// // INPUT


elInput.addEventListener("change", function () {
  const inputValue = elInput.value;
  search = inputValue;
  page = 1
  elInput.value = null
  getMovies();
});



//  // PREV AND NEXT BUTTONS 

prevBtn.addEventListener("click", function () {
  if (page === 1){
    prevBtn.disabled = true
  } else {
    page--;
    getMovies();
  }
});

nextBtn.addEventListener("click", function () {
    page++;
    getMovies();
});



// PAGENETION BUTTONS

elButtons.addEventListener("click", evt => {
  if(evt.target.dataset.pageBtnId){
    page = evt.target.dataset.pageBtnId
    getMovies()
  }
})

