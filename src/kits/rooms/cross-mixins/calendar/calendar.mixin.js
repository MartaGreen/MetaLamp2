import "./calendar.mixin.scss";

class Calendar {
  container;
  constructor(container) {
    this.container = container;
  }

  activate() {
    this.showCalendarContent();
  }

  showCalendarContent() {
    const dateBtns = Array.from(this.container.querySelectorAll(".calendar__item"));
    dateBtns.forEach((btn) => {
      btn
        .querySelector(".dropdown")
        .addEventListener("click", () => this.container.classList.toggle("-show-"));
    });
  }
}

const calendarCounts = document.querySelectorAll(".calendar");
console.log(calendarCounts);
calendarCounts.forEach((cont) => {
  const calendar = new Calendar(cont);
  calendar.activate();
});
