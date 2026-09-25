const btnUp = document.getElementById("upBtn");
window.onscroll = function () {
  if (window.scrollY >= window.innerHeight / 2) {
    btnUp.style.display = "flex"; 
  } else {
    btnUp.style.display = "none";
  }
};
btnUp.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
};

document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const people = document.getElementById("people");

  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  let isValid = true;

 
  if (name.value.trim().length < 3) {
    document.getElementById("nameError").textContent = "Name must be at least 3 characters";
    name.classList.add("invalid");
    name.classList.remove("valid");
    isValid = false;
  } else {
    name.classList.add("valid");
    name.classList.remove("invalid");
  }

 
  if (date.value === "") {
    document.getElementById("dateError").textContent = "Please select a date";
    date.classList.add("invalid");
    date.classList.remove("valid");
    isValid = false;
  } else {
    date.classList.add("valid");
    date.classList.remove("invalid");
  }


  if (time.value === "") {
    document.getElementById("timeError").textContent = "Please select a time";
    time.classList.add("invalid");
    time.classList.remove("valid");
    isValid = false;
  } else {
    time.classList.add("valid");
    time.classList.remove("invalid");
  }


  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    document.getElementById("phoneError").textContent = "Enter a valid phone number (10-11 digits)";
    phone.classList.add("invalid");
    phone.classList.remove("valid");
    isValid = false;
  } else {
    phone.classList.add("valid");
    phone.classList.remove("invalid");
  }


  if (people.value === "") {
    document.getElementById("peopleError").textContent = "Please select number of people";
    people.classList.add("invalid");
    people.classList.remove("valid");
    isValid = false;
  } else {
    people.classList.add("valid");
    people.classList.remove("invalid");
  }


  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(email.value.trim())) {
    document.getElementById("emailError").textContent = "Enter a valid email address";
    email.classList.add("invalid");
    email.classList.remove("valid");
    isValid = false;
  } else {
    email.classList.add("valid");
    email.classList.remove("invalid");
  }


  if (isValid) {
    alert("Reservation submitted successfully!");
  }
});
