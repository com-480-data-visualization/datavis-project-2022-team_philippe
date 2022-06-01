
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the BookSize widget
//
////////////////////////////////////////////////////////////////////////////////

const book_size_data_promise = d3.xml("./img/book.svg");
const middle_part_half_height = 31.153/2;  // snooped on the svg.

// Dragging variables
let first_mouse_pos = null;
let current_book_size = 1;
let philippe_has_been_shown = false;

// Evil global mutable state
let global_get_book_size; // it's gonna be a callable.

book_size_data_promise.then(data => {
  // Insert SVG
  d3.select("#book-size").node().prepend(data.documentElement);

  // Make selections
  let text_selection = d3.select("#book-size").select("span");

  let philippe_popup = d3.select("#book-size-philippe-popup").node();

  let svg_selection = d3.select("#book-size").select("svg");
  let groups_selection = svg_selection.selectAll("g");
  let top_selection = groups_selection.filter(function () {
    return this.id == "book-size-top";
  });
  let top_color_selection = top_selection.selectAll("path").filter(function () {
    return this.id == "book-size-top-color";
  });
  let middle_selection = groups_selection.filter(function () {
    return this.id == "book-size-middle";
  });
  let bottom_selection = groups_selection.filter(function () {
    return this.id == "book-size-bottom";
  });

  // Functions
  function set_book_size(factor) {
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

  function set_text() {
    if (current_book_size < 0.75) {
      philippe_has_been_shown = false;
      text_selection.text("I don't want to deal with more than 50 pages!");
    } else if (current_book_size < 3) {
      philippe_has_been_shown = false;
      text_selection.text("About a hundred pages should do fine.");
    } else if (current_book_size < 5) {
      philippe_has_been_shown = false;
      text_selection.text("I can handle even 500 pages!");
    } else {
      text_selection.text("Bring me the biggest book you have!");

      if (!philippe_has_been_shown) {
        philippe_has_been_shown = true;

        setTimeout(function() {
          philippe_popup.classList.toggle("m-fadeIn");
        }, 1000);

        philippe_popup.classList.toggle("m-fadeIn");
      }
    }
  }

  function translate_pos(x, y) {
    var CTM = svg_selection.node().getScreenCTM();
    return {
      x: (x - CTM.e) / CTM.a,
      y: (y - CTM.f) / CTM.d
    };
  }

  function drag_start(event) {
    first_mouse_pos = translate_pos(event.clientX, event.clientY);
  }

  function drag(event) {
    if (first_mouse_pos !== null) {
      event.preventDefault();

      let current_mouse_pos = translate_pos(event.clientX, event.clientY);
      let delta_y = current_mouse_pos.y - first_mouse_pos.y;
      let delta_y_normalized = delta_y / middle_part_half_height;

      current_book_size = Math.min(7, Math.max(0, -delta_y_normalized + current_book_size));
      first_mouse_pos = current_mouse_pos;
      set_book_size(current_book_size);
      set_text();
    }
  }

  function drag_end(event) {
    first_mouse_pos = null;
  }

  // Dragging stuff
  top_color_selection
    .on("mousedown", drag_start);

  svg_selection
    .on("mousemove", drag)
    .on("mouseup", drag_end)
    .on("mouseleave", drag_end);

  // Set size and text initially
  set_book_size(current_book_size);
  set_text();

  // Do the evil stuff
  global_get_book_size = function() {
    if (current_book_size < 0.75) {
      return 50;
    } else if (current_book_size < 3) {
      return 100;
    } else if (current_book_size < 5) {
      return 500;
    } else {
      return 1000;
    }
  };
});
