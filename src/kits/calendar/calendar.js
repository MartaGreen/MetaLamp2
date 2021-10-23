import AirDatepicker from "air-datepicker";

let startDateInp;
let endDateInp;

// Кнопка календаря принять
let applyBtn = {
  content: "Применить",
  class: "apply-btn",
  onClick: (e) => {
    const cont = e.$customContainer;
    const arrival = cont.querySelector(".start-date__inp").querySelector(".btn__name");
    const depature = cont.querySelector(".end-date__inp").querySelector(".btn__name");

    arrival.innerHTML = startDateInp || "дд.мм.гггг";
    depature.innerHTML = endDateInp || "дд.мм.гггг";

    console.log("применить", startDateInp, endDateInp);

    console.group("cont", cont);
    const datepicker = cont.querySelector(".datepicker");
    datepicker.classList.remove("-show-");
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

    onSelect({ date, formattedDate, datepicker }) {
      console.log();
      if (date.length === 2) {
        if (new Date(date[0]).getTime() < new Date(date[1]).getTime()) {
          console.log("даты стоят по порядку", formattedDate);
          startDateInp = formattedDate[0];
          endDateInp = formattedDate[1];
        }
      }
    },
  });
});
