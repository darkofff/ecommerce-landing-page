function App() {
  /* MEDIA SCROLLER START */
  const data = fetchDataForMS();

  const cardBtn = document.querySelectorAll(".card-switch");

  let index = 0;
  cardBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      //console.log(`index = ${index}`);
      index = scrollMedia(e, index);
    });
  });

  animateProgressBar();
  /* MEDIA SCROLLER END */

  /* MODAL */
  const closeModalBtn = document.querySelectorAll("[data-modal-close]");
  const openModalBtn = document.querySelectorAll("[data-modal-open]");
  const modal = document.getElementById("modal");
  closeModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(modal);
    });
  });
  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(modal);
    });
  });

  const modalStateBtn = document.querySelector("[data-modal-btn-state]");
  modalStateBtn.addEventListener("click", () => {
    changeModalState(modal, modalStateBtn);
  });

  // go to form
  goToForm();

  /* MODAL END*/
}

async function fetchDataForMS() {
  const data = await fetch("https://fakestoreapi.com/products?limit=12");
  const dataJson = await data.json();
  displayDataForMS(dataJson);
}

function displayDataForMS(dataJson) {
  const imgBoxList = document.querySelectorAll(".ms-card__img-box");
  const parList = document.querySelectorAll(".ms-card__title");
  const pricesList = document.querySelectorAll(".ms-card__price");
  for (let i = 0; i < imgBoxList.length; i++) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("ms-card__img");
    imgElement.src = dataJson[i].image;

    imgBoxList[i].appendChild(imgElement);
    parList[i].textContent = dataJson[i].title;
    pricesList[i].textContent = `${dataJson[i].price} $`;
  }
}

function scrollMedia(e, index) {
  const cardList = document.querySelectorAll(".ms-card");

  if (e.target.id == "card-prev") {
    if (index < 2) {
      index = 0;
    } else {
      index -= 2;
    }
    //console.log(index);

    cardList[index].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }
  if (e.target.id == "card-next") {
    if (index >= 10) {
      index = 10;
    } else {
      index += 2;
    }

    //console.log(index);

    cardList[index].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }
  return index;
}

function closeModal(modal) {
  modal.classList.remove("modal-visible");
}
function openModal(modal) {
  modal.classList.add("modal-visible");
}
function changeModalState(modal, modalStateBtn) {
  const modalTopLogin = document.getElementById("modal__top--login");
  const modalTopRegister = document.getElementById("modal__top--register");
  if (modalStateBtn.dataset.modalBtnState == "register") {
    //console.log("reg");
    modalStateBtn.dataset.modalBtnState = "log";
    modalStateBtn.textContent = "Zaloguj się";
    modalTopLogin.classList.add("modal-display-none");
    modalTopRegister.classList.remove("modal-display-none");
  } else if (modalStateBtn.dataset.modalBtnState == "log") {
    //console.log("log");
    modalStateBtn.dataset.modalBtnState = "register";
    modalStateBtn.textContent = "Zarejestruj się";
    modalTopLogin.classList.remove("modal-display-none");
    modalTopRegister.classList.add("modal-display-none");
  }
}

function goToForm() {
  const formTransferBtn = document.querySelectorAll("[data-log]");
  formTransferBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const logState = btn.dataset.log;

      sessionStorage.setItem("logState", logState);
      window.location.href = "html/form.html";
    });
  });
}

function animateProgressBar() {
  const mediaScroller = document.querySelector(".media-scroller");
  setWidth(mediaScroller);

  mediaScroller.addEventListener("scroll", () => {
    setWidth(mediaScroller);
  });
}

function setWidth(mediaScroller) {
  const progressBar = document.getElementById("progress-bar");

  const scrollDistance = mediaScroller.scrollLeft;
  const mediaScrollerWidth = mediaScroller.clientWidth;
  const mediaScrollerTotalWidth = mediaScroller.scrollWidth;

  let coefficient =
    scrollDistance / (mediaScrollerTotalWidth - mediaScrollerWidth);

  let totalWidth =
    ((scrollDistance + mediaScrollerWidth * coefficient) /
      mediaScrollerTotalWidth) *
    100;

  /* 
  WHY IS THIS COEFFICIENT NEEDED
  -without it progressBar is either visible on start or does't cover all the area at the end.
  */

  progressBar.style.width = `${totalWidth}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  App();
});
