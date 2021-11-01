import "./guests-counter.mixin.scss";

// Guests counter value
class Counter {
  count = 0;
  rmBtn;
  itemValue;

  constructor(rmBtn, itemValue) {
    this.rmBtn = rmBtn;
    this.itemValue = itemValue;
  }

  add() {
    if (this.count == 0) this.rmBtn.classList.remove("-not-active-");

    this.count += 1;
    this.updateHTMLValue();
    return this.count;
  }

  remove() {
    if (this.count > 0) {
      this.count -= 1;
      this.updateHTMLValue();
    }
    if (this.count <= 0) {
      this.rmBtn.classList.add("-not-active-");
    }

    return this.count;
  }

  clear() {
    this.count = 0;
    this.updateHTMLValue();
  }

  updateHTMLValue() {
    this.itemValue.innerHTML = this.count;
  }
}

const counters = [];

// GUESTS
const guestsCounterField = document.getElementById("guests-counter_field");

// Show dropdown content
const dropdownBtn = guestsCounterField.querySelector(".dropdown__btn");
dropdownBtn.addEventListener("click", () => {
  guestsCounterField.querySelector(".dropdown__content").classList.toggle("-show-");
});

// Change counter
const dropdownContent = guestsCounterField.querySelector(".dropdown__content");

function changeCounter() {
  const dropdownItems = dropdownContent.querySelectorAll(".content__item");

  dropdownItems.forEach((item) => {
    const rmBtn = item.querySelector(".counter__remove");
    const addBtn = item.querySelector(".counter__add");
    const itemValue = item.querySelector(".counter__value");

    let counter = new Counter(rmBtn, itemValue);
    counters.push(counter);

    rmBtn.addEventListener("click", () => {
      counter.remove();
    });

    addBtn.addEventListener("click", () => {
      counter.add();
    });
  });
}
changeCounter();

// Apply counter settings
const applyBtn = guestsCounterField.querySelector(".apply");
const cancelBtn = guestsCounterField.querySelector(".cancel");

applyBtn.addEventListener("click", () => {
  const valuesArr = Array.from(guestsCounterField.querySelectorAll(".counter__value"));
  const values = valuesArr.map((val) => Number(val.innerHTML));
  const guestsCount = values.reduce((prev, next) => prev + next);

  let newName;
  if (guestsCount == 0) {
    cancelBtn.classList.remove("-show-");
    newName = "Сколько гостей";
  } else {
    cancelBtn.classList.add("-show-");
    if (guestsCount == 1) {
      newName = `${guestsCount} гость`;
    } else {
      newName = `${guestsCount} гостей`;
    }
  }
  dropdownBtn.querySelector(".btn__name").innerHTML = newName;
  dropdownContent.classList.remove("-show-");
});

cancelBtn.addEventListener("click", () => {
  const dropdownBtn = guestsCounterField.querySelector(".dropdown__btn");
  dropdownBtn.querySelector(".btn__name").innerHTML = "Сколько гостей";

  guestsCounterField.querySelector(".dropdown__content").classList.remove("-show-");
  guestsCounterField.querySelector(".cancel").classList.remove("-show-");
  guestsCounterField
    .querySelectorAll(".counter__remove")
    .forEach((btn) => btn.classList.add("-not-active-"));
  counters.forEach((counter) => counter.clear());
});
