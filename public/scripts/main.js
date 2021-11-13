import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

// Copy room number by clicking the button
/*const copyButton = document.getElementById("room-id");
copyButton.addEventListener("click", function () {
  var copyText = document.querySelector("#room-id").dataset.id;
  console.log(copyText);
  copyText.select(); /* Select the text field *
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy"); /* Copy the text inside the text field *
  alert("Copied the text: " + copyText.value); /* Alert the copied text *
});*/

// Get all the buttons that exist with the check class
const checkButtons = document.querySelectorAll(".actions a.check");

// Add the listen
checkButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

/* When the delete button is clicked it opens the modal */
const deleteButton = document.querySelectorAll(".actions a.delete");

deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();

  const text = check ? "Mark as read" : "Delete";
  const slug = check ? "check" : "delete";
  const roomId = document.querySelector("#room-id").dataset.id;
  const questionId = event.target.dataset.id;

  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = `${text} this question`;
  modalDescription.innerHTML = `Are you sure you want <b>${text.toLowerCase()}</b> this question?`;
  modalButton.innerHTML = `Yes, ${text.toLowerCase()}`;
  check
    ? modalButton.classList.remove("red")
    : modalButton.classList.add("red");

  // Open modal
  modal.open();
}
