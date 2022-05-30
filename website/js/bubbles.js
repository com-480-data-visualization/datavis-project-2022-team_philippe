/*// Layout
const width = 1600;
const height = 900;
const size = Math.min(width, height);

d3.csv("../data/degueu.csv").then(raw_data => {
  // Data
  let data = d3.stratify()  // from here on, `data` contains stuff with the d3 format.
    .id(raw_d => raw_d.id)
    .parentId(raw_d => raw_d.parent)
    (raw_data);

  data = data.sum(d_data => Math.pow(50, d_data.likeability));  // but not here because sum is stupid...

  data = d3.pack()
    .size([width, height])
    .padding(10)
    (data);

  let root_data = data; // nice shortcut
  const original_center_x = root_data.x;
  const original_center_y = root_data.y;
  const original_center_r = root_data.r; // useful for later

  data.each(d => {
    d.x = d.x - original_center_x;  // recenter the graph, otherwise it's coordinates hell.
    d.y = d.y - original_center_y;
  })

  // Color
  let color = d3.scaleLinear()  // it is a callable.
    .domain([0, 5])  // lol there are only two levels °o° i don't need this
    .range(["hsl(353, 23%, 56%)", "hsl(33, 100%, 87%)"])
    .interpolate(d3.interpolateHcl)

  // Dynamic
  let focused = root_data;  // focus is the focused node's joined data. root_data = the root node's data, so we focus the root node for now
  let current_view = [root_data.x, root_data.y, size];  // a view is an array [center_x, center_y, size]

  // Small functions
  function label_vh_size_absolute(d) {
    return d.r / original_center_r * 100 * (d.children ? 0.2 : 0.3);
  }

  function label_vh_size_relative(d) {
    return d.r / d.parent.r * 100 * (d.children ? 0.2 : 0.3);
  }

  function label_opacity(d, focused) {
    if (d.id == "ROOT") {
      return 0;
    } else if (focused.depth == 2) {
      return (d.parent === focused.parent) ? 1 : 0;
    } else {
      const d_is_big_enough_child_of_focused = (d.parent === focused && label_vh_size_relative(d) > 1.5); // fonts smaller than 1.5vh are illegible
      const d_is_focused = (d === focused);

      return d_is_focused ? 0.2 : (d_is_big_enough_child_of_focused ? 1 : 0);
    }
  }

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
    .attr("cursor", d => "pointer")
    .attr("pointer-events", d => !d.children ? "none" : null)
    .on("mouseover", function(event, d) {
      d3.select(this)
        .attr("stroke", color(4));

      if (focused.depth == 0) {
        d3.select(d.__label__)  // big dinguerie °o°
          .transition()
            .style("fill-opacity", 1.0)
            .on("start", function(d) {
              this.style.display = "inline";
            });
      }

    })
    .on("mouseout", function(event, d) {
      d3.select(this).attr("stroke", null);

      if (focused.depth == 0) {
        d3.select(d.__label__)  // big dinguerie °o°
          .transition()
            .style("fill-opacity", label_opacity(d, focused))
            .on("end", function(d) {
              if (label_opacity(d, focused) == 0) {
                this.style.display = "none";
              }
            });
      }

    })
    .on("click", (event, d) => {
      if (focused !== d && d.children) {
        zoom(event, d);
        remove_tooltip();
        event.stopPropagation();
      } else if (focused !== d && !d.children) {
        zoom(event, d);
        tooltip(event, d);
        event.stopPropagation();
      }
    });

  let labels_group_selection = svg_selection.append("g")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("pointer-events", "none");

  let labels_selection = labels_group_selection.selectAll("text").data(root_data.descendants().slice(1))
    .join("text")
    .style("fill-opacity", d => label_opacity(d, root_data))
    .style("display", d => d.parent.id === "ROOT" ? "inline" : "none")
    .style("font-size", d => `${label_vh_size_absolute(d)}vh`)
    .text(d => {
      if (d.data.title.length <= 25) {
        return d.data.title;
      }
      return d.data.title.slice(0, 25) + '…';
    })
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .each(function(d) {
      d.__label__ = this;  // dinguerie but it works °o°
    });

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

    function should_allow_clicks(d, focused) {
      return focused.depth != 0;
    }

    // Change visible labels (with a transition as well)
    labels_selection.filter(function(d) {
      return d => d.parent === focused || this.style.display === "inline";
    }).transition()
      .style("fill-opacity", d => label_opacity(d, focused))
      .on("start", function(d) {
        if (label_opacity(d, focused) > 0) {
          this.style.display = "inline";
        }
      })
      .on("end", function(d) {
          if (label_opacity(d, focused) == 0) {
            this.style.display = "none";
          }
      });

    // Allow clicking on books under the focused category, but not others
    circles_selection.filter(d => !d.children)
      .attr("cursor", d => should_allow_clicks(d, focused) ? "pointer" : null)
      .attr("pointer-events", d => should_allow_clicks(d, focused) ? null : "none");
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
    .style("opacity", 1)
    .style("pointer-events", null);

    const remove_old_tooltip_selection = tooltip_selection
    .filter(d => d.viewed_id === the_d.id)
    .style("opacity", 0)
    .style("pointer-events", "none");

    // Either one of these two above selections should be empty. Now we can change the state at will.
    add_new_tooltip_selection.each(d => {
      d.viewed_id = the_d.id;
    });

    remove_old_tooltip_selection.each(d => {
      d.viewed_id = null;
    });

    // Change state in case of new tooltip
    add_new_tooltip_selection
    .select("img")
    .attr("src", the_d.data.coverurl);

    add_new_tooltip_selection
    .select(".title")
    .text(the_d.data.title);

    add_new_tooltip_selection
    .select("p")
    .text(the_d.data.desc);

    add_new_tooltip_selection
    .select(".x")
    .style("cursor", "pointer")
    .on("click", () => remove_tooltip());
  }

  function remove_tooltip() {
    tooltip_selection
    .style("opacity", 0)
    .style("pointer-events", "none")
    .each(d => {
      d.viewed_id = null;
    });
  }
});*/
