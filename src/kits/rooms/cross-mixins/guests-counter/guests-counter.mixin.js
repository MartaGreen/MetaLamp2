import "./guests-counter.mixin.scss";
import "../../cross-styles/dropdown.scss";

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

class GuestsCounter {
  guestsCounterField;
  counters;
  dropdownBtn;

  constructor(guestsCounterField) {
    this.guestsCounterField = guestsCounterField;
    this.dropdownBtn = this.guestsCounterField.querySelector(".dropdown__btn");
    this.counters = [];
  }

  activate() {
    this.showDropdownContent();
    this.changeCounter();
    this.applyCounterSettings();
  }

  showDropdownContent() {
    this.dropdownBtn.addEventListener("click", () => {
      this.guestsCounterField
        .querySelector(".dropdown__content")
        .classList.toggle("-show-");
    });
  }

  changeCounter() {
    const dropdownContent = this.guestsCounterField.querySelector(".dropdown__content");
    const dropdownItems = dropdownContent.querySelectorAll(".content__item");

    dropdownItems.forEach((item) => {
      const rmBtn = item.querySelector(".counter__remove");
      const addBtn = item.querySelector(".counter__add");
      const itemValue = item.querySelector(".counter__value");

      let counter = new Counter(rmBtn, itemValue);
      this.counters.push(counter);

      rmBtn.addEventListener("click", () => {
        counter.remove();
      });

      addBtn.addEventListener("click", () => {
        counter.add();
      });
    });
  }

  applyCounterSettings() {
    const dropdownContent = this.guestsCounterField.querySelector(".dropdown__content");
    const applyBtn = this.guestsCounterField.querySelector(".apply");
    const cancelBtn = this.guestsCounterField.querySelector(".cancel");

    applyBtn.addEventListener("click", () => {
      const valuesArr = Array.from(
        this.guestsCounterField.querySelectorAll(".counter__value")
      );
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
      this.dropdownBtn.querySelector(".btn__name").innerHTML = newName;
      dropdownContent.classList.remove("-show-");
    });

    cancelBtn.addEventListener("click", () => {
      this.dropdownBtn.querySelector(".btn__name").innerHTML = "Сколько гостей";

      this.guestsCounterField
        .querySelector(".dropdown__content")
        .classList.remove("-show-");
      this.guestsCounterField.querySelector(".cancel").classList.remove("-show-");
      this.guestsCounterField
        .querySelectorAll(".counter__remove")
        .forEach((btn) => btn.classList.add("-not-active-"));
      this.counters.forEach((counter) => counter.clear());
    });
  }
}

const guestsCounterConts = Array.from(document.querySelectorAll(".guests-count"));
guestsCounterConts.forEach((cont) => {
  const guestsCounter = new GuestsCounter(cont);
  guestsCounter.activate();
});
