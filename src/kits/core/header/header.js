window.onload = () => {
  const offerDropdowns = document.querySelectorAll(".dropdown-offer");
  const contents = [];

  offerDropdowns.forEach((offerDropdown) => {
    const content = offerDropdown.querySelector(".dropdown__content");
    contents.push(content);
    offerDropdown.addEventListener("click", () => {
      content.classList.toggle("-show-");
    });
  });

  window.addEventListener("click", (e) => {
    let flag = false;
    for (let i = 0; i < offerDropdowns.length; i++) {
      if (offerDropdowns[i].contains(e.target)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      contents.forEach((content) => {
        content.classList.remove("-show-");
      });
    }
  });
};
