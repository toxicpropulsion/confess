import {
  onDOMContentLoaded,
  onSinFormSubmit,
  onTextareaChange
} from "./events";

const sinForm = document.getElementById("sinForm");
const sinText = document.getElementById("sinText");

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
sinForm.addEventListener("click", onSinFormSubmit);
sinText.addEventListener("keyup", onTextareaChange);
