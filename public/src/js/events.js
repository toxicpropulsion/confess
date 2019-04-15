import { postSin, getSin } from "./request";
import {
  textareaIsEmpty,
  clearTextarea,
  switchForgiveBtnState,
  togglePopup
} from "./utils";

export function onDOMContentLoaded() {
  getSin().then(sin => {
    document.getElementById("sinText").placeholder = sin.content;
  });
}

export function onSinFormSubmit(event) {
  event.preventDefault();

  const nodeName = event.target.nodeName;

  if (nodeName != "BUTTON") return;

  const form = event.target.form;
  const textarea = form.elements["sinText"];
  const target = event.target.id;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      if (textareaIsEmpty(textarea)) {
        console.error("Textarea is empty");
        return false;
      }
      body["content"] = textarea.value;
      postSin(body)
        .then(res => {
          if (res.status === 1) {
            togglePopup("popup", 3500);
            clearTextarea(textarea);
            switchForgiveBtnState();
          } else {
            console.error(res.error);
            togglePopup("popup-error", 4500);
          }
        })
        .catch(err => {
          console.error(err);
          togglePopup("popup-error", 4500);
        });
      break;
    case "nextSin":
      clearTextarea(textarea);
      getSin().then(sin => {
        textarea.placeholder = sin.content;
      }).catch(err => {
        console.error(err);
      });
      break;
    default:
      console.error("Unexpected submit event");
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
