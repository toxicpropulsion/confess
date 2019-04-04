import postSin from "./fetch";

export default function onSinFormSubmit(event) {
  event.preventDefault();

  const nodeName = event.target.nodeName;

  if (nodeName != "BUTTON") return;

  const form = event.target.form;
  const sinText = form.elements["sinText"];
  const target = event.target.id;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      body["action"] = "forgive";
      body["text"] = sinText.value;
      postSin("POST", body).then(res => {
        console.log(res);
      });
      break;
    case "nextSin":
      console.log("next");
      break;
    default:
      console.error("Unexpected submit event");
  }
}
