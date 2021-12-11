import "../../../calendar/calendar";
import "../../cross-styles/dropdown.scss";
import "./calendar.mixin.scss";

export class Calendars {
  calendars;

  constructor() {
    this.calendars = {};
  }

  addNewCalendar(calendarId, calendarCont) {
    this.calendars[calendarId] = calendarCont;
  }

  getCalendars() {
    return this.calendars;
  }
}

export const calendars = new Calendars();

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
  // calendars[cont.getAttribute("id") ? cont.getAttribute("id") : "inline"] = calendar;
  calendars.addNewCalendar(
    cont.getAttribute("id") ? cont.getAttribute("id") : "inline",
    cont
  );
  calendar.activate();
});
