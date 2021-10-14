import "./find-rooms.scss";

// Show dropdown content
const dropdownBtn = document.querySelector(".dropdown__btn");
dropdownBtn.addEventListener("click", () => {
  console.log(document.querySelector(".dropdown__content"));
  document.querySelector(".dropdown__content").classList.toggle("-show-");
});

// Change counter
const dropdownContent = document.querySelector(".dropdown__content");
const dropdownItems = dropdownContent.querySelectorAll(".content__item");

dropdownItems.forEach((item) => {
  let counter = 0;
  const rmBtn = item.querySelector(".counter__remove");
  const addBtn = item.querySelector(".counter__add");
  const itemValue = item.querySelector(".counter__value");

  rmBtn.addEventListener("click", () => {
    if (counter > 0) {
      counter -= 1;
      itemValue.innerHTML = counter;
    }
    if (counter <= 0) {
      rmBtn.classList.add("-not-active-");
    }
  });
  addBtn.addEventListener("click", () => {
    counter += 1;
    itemValue.innerHTML = counter;

    rmBtn.classList.remove("-not-active-");
  });
});
