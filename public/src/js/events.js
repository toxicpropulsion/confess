import makeFetchRequest from "./fetch";

export default function onSinFormSubmit(event) {
  event.preventDefault();

  const body = {};

  let sinText = sinForm.elements["sinText"];
  let target = event.target.id;

  if (target === "forgiveBtn") {
    body["action"] = "forgive";
    body["text"] = sinText.value;
    makeFetchRequest("POST", body).then(res => {
      console.log(res);
    });
  }
}
