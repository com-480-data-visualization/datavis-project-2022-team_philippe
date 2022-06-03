// evil global state
function global_get_cover_style() {
  var values = {
    "flexible": document.getElementById("cover-flexible").checked,
    "hard": document.getElementById("cover-hard").checked,
    "ebook": document.getElementById("cover-ebook").checked,
    "audiobook": document.getElementById("cover-audiobook").checked,
    "other": document.getElementById("cover-other").checked,
  };

  return data_row => {
    var res = [
      (data_row.paperback == "1.0") && values.flexible,
      (data_row.hardcover == "1.0") && values.hard,
      (data_row.ebook == "1.0") && values.ebook,
      (data_row.audiobook == "1.0") && values.audiobook,
      (data_row.other == "1.0") && values.other,
    ]

    return res.indexOf(true) != -1;
  };
}
