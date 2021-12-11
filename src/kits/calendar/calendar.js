import "air-datepicker/air-datepicker.css";
import "./calendar.scss";
import AirDatepicker from "air-datepicker";

let startDateInp;
let endDateInp;

// Кнопка отчистить, расширение функционала
function clearBtnListener() {
  const cont = this.closest(".calendar");

  const dropdowns = cont.querySelectorAll(".btn__name");
  dropdowns.forEach((dropdown) => (dropdown.innerHTML = "дд.мм.гггг"));

  const datepicker = cont.querySelector(".datepicker");
  cont.classList.remove("-show-");
}

// Кнопка календаря принять
let applyBtn = {
  content: "Применить",
  class: "apply-btn",
  onClick: (e) => {
    const cont = e.$customContainer;

    if (cont.querySelector(".calendar__items")) {
      const clearBtn = cont.querySelector(".air-datepicker-button");
      clearBtn.setAttribute("type", "button");
      clearBtn.removeEventListener("click", clearBtnListener);
      clearBtn.addEventListener("click", clearBtnListener);

      const arrival = cont.querySelector(".start-date__inp").querySelector(".btn__name");
      const depature = cont.querySelector(".end-date__inp").querySelector(".btn__name");

      arrival.innerHTML = startDateInp || "дд.мм.гггг";
      depature.innerHTML = endDateInp || "дд.мм.гггг";

      const datepicker = cont.querySelector(".datepicker");
      cont.classList.remove("-show-");
    }
  },
};

// Перебор всех календарей, чтобы активировать их
const datepickers = document.querySelectorAll(".calendar");
datepickers.forEach((calendar) => {
  const datepicker = calendar.querySelector(".datepicker");
  new AirDatepicker(datepicker, {
    inline: true,
    range: true,
    minDate: new Date(),
    multipleDates: true,
    container: calendar,

    buttons: ["clear", applyBtn],

    dateFormat: "dd.MM.yyyy",

    prevHtml: `<svg width="15" height="15" viewBox="0 0 17 18" class="prev" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>
    </svg>`,
    nextHtml: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="white"/>
    </svg>`,

    onSelect({ date, formattedDate, datepicker }) {
      if (date.length === 2) {
        if (new Date(date[0]).getTime() < new Date(date[1]).getTime()) {
          startDateInp = formattedDate[0];
          endDateInp = formattedDate[1];
        }
      }
    },
  });
});
