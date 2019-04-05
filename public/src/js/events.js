import { postSin, getSin } from "./request";

export function onDOMContentLoaded() {
  console.log("onDOMContentLoaded");
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
      body["content"] = textarea.value;
      postSin(body).then(res => {
        console.log(res);
      });
      break;
    case "nextSin":
      getSin().then(sin => {
        textarea.placeholder = sin.content;
      });
      break;
    default:
      console.error("Unexpected submit event");
  }
}
