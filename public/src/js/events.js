import { postSin, getSin } from "./request";
import { textareaIsEmpty, clearTextarea, switchForgiveBtnState, togglePopup } from "./utils";

export function onDOMContentLoaded() {
  getSin().then(sin => {
    document.getElementById("sinText").placeholder = sin.content;
  });
}

export function onSinFormSubmit(event) {
  event.preventDefault();

  const { nodeName } = event.target;

  if (nodeName !== "BUTTON") return;

  const { id: target, form } = event.target;
  const textarea = form.elements.sinText;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      if (textareaIsEmpty(textarea)) {
        break;
      }
      body.content = textarea.value;
      postSin(body)
        .then(res => {
          if (res.status === 1) {
            togglePopup("popup-ok", 3500);
            clearTextarea(textarea);
            switchForgiveBtnState();
          } else {
            togglePopup("popup-error", 4500);
          }
        })
        .catch(err => {
          console.log(err);
          togglePopup("popup-error", 4500);
        });
      break;
    case "nextSin":
      clearTextarea(textarea);
      getSin().then(sin => {
        textarea.placeholder = sin.content;
      });
      break;
    default:
  }
}

export function onTextareaChange(event) {
  const btn = document.getElementById("forgiveBtn");
  const disabled = btn.classList.contains("disabled");
  const len = event.target.value.length;

  if (len <= 0 && !disabled) {
    btn.classList.add("disabled");
  }
  if (len > 0 && disabled) {
    btn.classList.remove("disabled");
  }
}
