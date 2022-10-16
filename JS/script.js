const container = document.querySelector(".container");
const navbarAccnt = container.querySelector(".navbar-account img");
const accntCard = container.querySelector(".account-info");

navbarAccnt.addEventListener("click", () => {
  accntCard.classList.toggle("active");
});
