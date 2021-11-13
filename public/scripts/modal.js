export default function Modal() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const cancelButton = document.querySelector(".button.cancel");

  cancelButton.addEventListener("click", close);

  // Functionality to assign the active class to the modal
  function open() {
    modalWrapper.classList.add("active");
  }

  // Functionality to remove active class from modal
  function close() {
    modalWrapper.classList.remove("active");
  }

  return {
    open,
    close,
  };
}
