// Selector and Variable

let books = [];
const yourBags = [];
const modal = document.querySelector(".modal");
const search = document.getElementById("search");
const bookCards = document.querySelector(".book__cards");
const modalBlock = document.querySelector(".modal-block");
const bagCards = document.querySelector(".your-bag__cards");
const SVG = `<svg fill="#fff" height="24" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1"
                viewBox="0 0 512 512" width="24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
            </svg>`;

const urlStart =
  "https://bayanalex.github.io/rs-books-shop/images/BooksCovers/";

// Default ...

//path to the file with json data
fetch("../books.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    books = data;
  });

function buildBookCard(boooks) {
  bookCards.innerHTML = "";
  boooks.forEach((book, index) => {
    bookCards.innerHTML += `
        <div class="book__cards--item flex">
            <div class="book__img">
                <img src="${
                  urlStart +
                  book.imageLink +
                  (index == 7 || index == 9 ? "" : ".jpg")
                }"
                    alt="${book.title}" height="264">
                <div class="book__img--cover flex items-center j-center text-center">
                    Drag <br> to <br> bag
                </div>
            </div>
            <div class="book__information flex flex-column between">
                <div class="book__information--top">
                    <h3 class="book__title">${book.title}</h3>
                    <span class="book__author">${book.author}</span>
                </div>
                <div class="book__information--bottom">
                    <div class="book__rate">⭐⭐⭐⭐⭐</div>
                    <div class="book__price flex items-center"><small>Price: </small> <big>$${
                      book.price
                    }</big></div>
                    <div class="flex between items-center">
                        <button class="book__btn" type="button" onclick="addBag(${index})">Add to bag</button>
                        <span class="show-more" onclick="showModal(${index})">Show more</span>
                    </div>
                </div>
            </div>
        </div>
    `;
  });
}

search.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  const searchElements = books.filter(
    (book) =>
      book.title.toLowerCase().includes(value) ||
      book.author.toLowerCase().includes(value)
  );

  buildBookCard(searchElements);
});

setTimeout(() => {
  buildBookCard(books);
}, 100);

function showModal(ind) {
  modal.style.marginTop = 0;
  modalBlock.classList.remove("hidden-top");
  modal.innerHTML = `
    <h3>${books[ind].title}</h3>
    <p>${books[ind].description}</p>
    <span class="close flex items-center j-center" onclick="closeModal()">${SVG}</span>
  `;
}

function closeModal() {
  modal.style.marginTop = "-1000px";
  modalBlock.classList.add("hidden-top");
}

function addBag(ind) {
  if (yourBags.length > 1) {
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    left.style.opacity = 1;
    right.style.opacity = 1;
  }

  if (!yourBags.length || !yourBags.includes(ind)) {
    yourBags.push(ind);

    bagCards.innerHTML = `
        <div class="your-bag__card">
          <img src="${
            urlStart +
            books[ind].imageLink +
            (ind == 7 || ind == 9 ? "" : ".jpg")
          }"
                    alt="${books[ind].title}" height="264">
          <h3>${books[ind].title}</h3>
          <span class="book__author">${books[ind].author}</span>
          <div class="book__price flex inds-center"><small>Price: </small> <big>$${
            books[ind].price
          }</big></div>
          <div class="counter flex items-center between">
              <button type="button" onclick="decreaseResult()" class="minus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                      <path fill="#fff" d="M19 12.998H5v-2h14z" />
                  </svg>
              </button>
              <div class="result">1</div>
              <button type="button" class="plus" onclick="increaseResult()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#fff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
                  </svg>
              </button>
          </div>
      </div>
    `;
  }
}

// minus.setAttribute("disabled", "true");

function decreaseResult() {
  const minus = document.querySelector(".minus");
  const result = document.querySelector(".result");
  result.textContent--;

  if (result.textContent == 1) {
    minus.setAttribute("disabled", "true");
    minus.style.backgroundColor = "#eceaea";
    return false;
  }
}

function increaseResult() {
  const minus = document.querySelector(".minus");
  const result = document.querySelector(".result");
  result.textContent++;
  minus.removeAttribute("disabled");
  minus.style.backgroundColor = "#ffb800";
}
