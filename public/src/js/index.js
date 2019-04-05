import { onDOMContentLoaded, onSinFormSubmit } from "./events";

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

const sinForm = document.getElementById("sinForm");

sinForm.addEventListener("click", onSinFormSubmit);
