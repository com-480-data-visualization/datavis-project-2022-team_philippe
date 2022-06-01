// evil global state
function global_get_cover_style() {
  return {
    "flexible": document.getElementById("cover-flexible").checked,
    "hard": document.getElementById("cover-hard").checked,
    "ebook": document.getElementById("cover-ebook").checked,
    "audiobook": document.getElementById("cover-audiobook").checked,
    "other": document.getElementById("cover-other").checked,
  };
}
