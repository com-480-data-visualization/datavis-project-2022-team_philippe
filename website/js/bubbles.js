// Layout
const width = 1600;
const height = 900;
const size = Math.min(width, height);

// Data
fake_csv_data = `id,parent,likeability,coverurl,desc
ROOT,,,,
Tragedy,ROOT,50,,
Comedy,ROOT,30,,
Death of the Princess,Tragedy,4,https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTh29pf1XIlc3W2JArq7BNGfq-QiQYuU7YDkAICXt0X_UpMCltk,This is the death of a princess :OO
Hamlet,Tragedy,7,https://kbimages1-a.akamaihd.net/695eb39e-9405-4c4b-8267-302344f0f5f7/353/569/90/False/hamlet-15.jpg,To be or not to be...
Great fun,Comedy,9,https://www.sarasavi.lk/cache/large/product/Great-Fun-With-Grammar-2-9350374382.jpg,ha ha ha haha`;

let raw_data = d3.csvParse(fake_csv_data);

let data = d3.stratify()  // from here on, `data` contains stuff with the d3 format.
  .id(raw_d => raw_d.id)
  .parentId(raw_d => raw_d.parent)
  (raw_data);

data = data.sum(d_data => d_data.likeability);  // but not here because sum is stupid...

data = d3.pack()
  .size([width, height])
  .padding(10)
  (data);

let root_data = data; // nice shortcut
const original_center_x = root_data.x;
const original_center_y = root_data.y;

data.each(d => {
  d.x = d.x - original_center_x;  // recenter the graph, otherwise it's coordinates hell.
  d.y = d.y - original_center_y;
})

// Color
let color = d3.scaleLinear()  // it is a callable.
    .domain([0, 5])  // lol there are only two levels °o° i don't need this
    .range(["hsl(16, 100%, 76%)", "hsl(33, 100%, 87%)"])
    .interpolate(d3.interpolateHcl)

// Dynamic
let focused = root_data;  // focus is the focused node's joined data. root_data = the root node's data, so we focus the root node for now
let current_view = [root_data.x, root_data.y, size];  // a view is an array [center_x, center_y, size]

// DOM nodes selections
let svg_selection = d3.select("#bubbles").append("svg")
  .attr("viewBox", [-width/2 , -height/2, width, height])
  .style("font-family", "Helvetica")
  .on("click", (event) => {
    zoom(event, root_data);
    event.stopPropagation();
    remove_tooltip();
  });

let circles_selection = svg_selection.append("g").selectAll("circle").data(root_data.descendants().slice(1)).join("circle")
  .attr("r", d => d.r)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("fill", d => color(d.depth))
  .attr("pointer-events", d => !d.children ? "none" : null)
  .on("mouseover", function() { d3.select(this).attr("stroke", "hsl(33, 100%, 96%)"); })
  .on("mouseout", function() { d3.select(this).attr("stroke", null); })
  .on("click", (event, d) => {
    if (focused !== d && d.children) {
      zoom(event, d);
      event.stopPropagation();
      remove_tooltip();
    } else if (focused === d.parent && !d.children) {
      tooltip(event, d);
      event.stopPropagation();
    }
  });

let labels_group_selection = svg_selection.append("g")
  .attr("text-anchor", "middle")
  .attr("pointer-events", "none")

let labels_selection = labels_group_selection.selectAll("text").data(root_data.descendants().slice(1)).join("text")
  .style("fill-opacity", d => d.parent.id === "ROOT" ? 1 : 0)
  .style("display", d => d.parent.id === "ROOT" ? "inline" : "none")
  .style("font-size", d => `${0.7 * (d.height + 1)}rem`)
  .text(d => d.id)
  .attr("x", d => d.x)
  .attr("y", d => d.y);

// Tooltip
let tooltip_selection = d3.select("#bubbles-tooltip").data([{
  viewed_id: null
}]);

// Functions
function zoom(event, d) {
  focused = d;

  // Set the zoom transition to take place
  svg_selection.transition()
    .duration(500)
    .tween("my_zoom", d => {
      const new_view = [focused.x, focused.y, focused.r * 2 + 20];  // +20 = +(2*10) which is the padding
      const interpolator = d3.interpolateZoom(current_view, new_view);

      // interpolator is a callable taking a time and returning a view
      return time => set_view(interpolator(time));
    });

  // Change visible labels (with a transition as well)
  labels_selection.filter(function(d) {
    return d => d.parent === focused || this.style.display === "inline";
  }).transition()
      .style("fill-opacity", d => d.parent === focused ? 1 : 0)
      .on("start", function(d) {
        if (d.parent === focused) {
          this.style.display = "inline";  // `display` cannot be animated :(
        }
      })
      .on("end", function(d) {
        if (d.parent !== focused) {
          this.style.display = "none";  // `display` cannot be animated :(
        }
      });

  // Allow clicking on books under the focused category, but not others
  circles_selection.filter(d => !d.children)
    .attr("pointer-events", d => d.parent === focused ? null : "none");
}

function set_view(new_view) {
  current_view = new_view;

  const new_center_x = new_view[0];
  const new_center_y = new_view[1];
  const new_size = new_view[2];

  const scal = (size / new_size);
  const trans_x = -new_center_x;
  const trans_y = -new_center_y;

  circles_selection
    .attr("transform", d => {
      return `scale(${scal})
      translate(${trans_x}, ${trans_y})`;
    });

  labels_selection
    .attr("transform", d => {
      return `scale(${scal})
      translate(${trans_x}, ${trans_y})`;
    });
}

function tooltip(event, the_d) {
  // dinguerie stuff going on here !!!
  const add_new_tooltip_selection = tooltip_selection
    .filter(d => d.viewed_id !== the_d.id)
    .style("opacity", 1);

  const remove_old_tooltip_selection = tooltip_selection
    .filter(d => d.viewed_id === the_d.id)
    .style("opacity", 0);

  // Either one of these two above selections should be empty. Now we can change the state at will.
  add_new_tooltip_selection.each(d => {
    console.log("showing", the_d.id);
    d.viewed_id = the_d.id;
  });

  remove_old_tooltip_selection.each(d => {
    console.log("unshowing");
    d.viewed_id = null;
  });

  // Change state in case of new tooltip
  add_new_tooltip_selection
    .select("img")
      .attr("src", the_d.data.coverurl);

  add_new_tooltip_selection
    .select("h1")
      .text(the_d.id);

  add_new_tooltip_selection
    .select("p")
      .text(the_d.data.desc);
}

function remove_tooltip() {
  tooltip_selection
    .style("opacity", 0);
}
