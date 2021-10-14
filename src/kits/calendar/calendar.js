import AirDatepicker from "air-datepicker";

let applyBtn = {
  content: "Применить",
  class: "apply-btn",
  onClick: () => {
    console.log("применить");
  },
};

new AirDatepicker("#choose-room", {
  inline: true,
  range: true,

  buttons: [applyBtn, "clear"],

  onSelect(date) {
    console.log("date", date);
  },
});
