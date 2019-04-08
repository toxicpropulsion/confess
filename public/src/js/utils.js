export function textareaIsEmpty(textarea) {
  return textarea.value.length ? false : true;
}

export function clearTextarea(textarea) {
  textarea.value = "";
}
