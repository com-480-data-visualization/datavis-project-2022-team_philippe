
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the BookSize widget
//
////////////////////////////////////////////////////////////////////////////////

const data_promise = d3.xml("../img/book.svg");

const middle_part_half_height = 31.153/2;  // snooped on the svg.
let top_selection; // will be set after promise is fulfilled. damn async that forces me to do global mutable state :'(
let middle_selection; // same
let bottom_selection; // same
let middle_selection_centered_transform; // same

data_promise.then(data => {
  // Insert SVG
  d3.select("#book-size").node().append(data.documentElement);

  let svg_selection = d3.select("#book-size").select("svg");
  groups_selection = svg_selection.selectAll("g");
  top_selection = groups_selection.filter(function () {
    return this.id == "book-size-top";
  });
  middle_selection = groups_selection.filter(function () {
    return this.id == "book-size-middle";
  });
  bottom_selection = groups_selection.filter(function () {
    return this.id == "book-size-bottom";
  });
});

function set_size(factor) {
  top_selection
    .each(function () {
      d3.select(this).attr("transform", `translate(0, ${-middle_part_half_height * (factor - 1)})`);
    });

  middle_selection
    .each(function () {
      d3.select(this).attr("transform", `scale(1, ${factor + 0.1})`);  // +0.1 so that clipping is less visible :)
    });

  bottom_selection
    .each(function () {
      d3.select(this).attr("transform", `translate(0, ${middle_part_half_height * (factor - 1)})`);
    });
}
