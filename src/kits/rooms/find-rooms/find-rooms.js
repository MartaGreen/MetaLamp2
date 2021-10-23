import "./find-rooms.scss";

// CALENDAR
const calendarField = document.getElementById("findRoonsCalendar");
const datepicker = calendarField.querySelector(".datepicker");
datepicker.setAttribute("id", "findRoomDatepicker");

const dateBtns = Array.from(calendarField.querySelectorAll(".calendar__item"));
console.log(calendarField);
dateBtns.forEach((btn) => {
  btn.addEventListener("click", () => datepicker.classList.toggle("-show-"));
});

// GUESTS
const guestsCounterField = document.getElementById("guests-counter_field");

const dates = Array.from(guestsCounterField.querySelectorAll(".calendar__item"));
const calendar = guestsCounterField.querySelector(".calender");
dates.forEach((date) => {
  date.addEventListener("focus", () => {
    calendar.classList.toggle("-show-");
  });
});

// Show dropdown content
const dropdownBtn = guestsCounterField.querySelector(".dropdown__btn");
dropdownBtn.addEventListener("click", () => {
  guestsCounterField.querySelector(".dropdown__content").classList.toggle("-show-");
});

// Change counter
const dropdownContent = guestsCounterField.querySelector(".dropdown__content");
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

// aply counter settings
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

  // dropdownBtn.querySelector(".btn__name").innerHTML =
  //   guestsCount == 1
  //     ? `${guestsCount} гость`
  //     : guestsCount == 0
  //     ? "Сколько гостей"
  //     : `${guestsCount} гостей`;
  // dropdownContent.classList.remove("-show-");
});

cancelBtn.addEventListener("click", () => {
  const valuesArr = Array.from(guestsCounterField.querySelectorAll(".counter__value"));
  valuesArr.forEach((val) => (val.innerHTML = 0));
});
