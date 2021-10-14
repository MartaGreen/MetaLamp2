import "./find-rooms.scss";

const dropdownBtn = document.querySelector(".dropdown__btn");
dropdownBtn.addEventListener("click", () => {
  console.log(document.querySelector(".dropdown__content"));
  document.querySelector(".dropdown__content").classList.toggle("-show-");
});
