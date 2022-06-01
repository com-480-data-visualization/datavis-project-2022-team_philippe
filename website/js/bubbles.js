
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the Bubble graph
//
////////////////////////////////////////////////////////////////////////////////

// Layout
const width = 1600;
const height = 900;
const size = Math.min(width, height);

// Small functions
let bubbles_color = d3.scaleLinear()  // it is a callable.
  .domain([0, 5])  // lol there are only two levels °o° i don't need this
  .range(["hsl(353, 23%, 56%)", "hsl(33, 100%, 87%)"])
  .interpolate(d3.interpolateHcl)

function label_vh_size_absolute(d, original_center_r) {
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

function tooltip(event, the_d, tooltip_selection) {
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
    .attr("src", the_d.data.coverImg);

  add_new_tooltip_selection
    .select(".title")
    .text(`${the_d.data.title}`);

  add_new_tooltip_selection
    .select("p")
    .text(the_d.data.description);

  add_new_tooltip_selection
    .select(".x")
    .style("cursor", "pointer")
    .on("click", () => remove_tooltip(tooltip_selection));
}

function remove_tooltip(tooltip_selection) {
  tooltip_selection
    .style("opacity", 0)
    .style("pointer-events", "none")
    .each(d => {
      d.viewed_id = null;
    });
}

// ----------------

function global_refresh_bubbles() {
  d3.csv("./data/bubble_graph_books_data.csv").then(raw_data => {

    var parents_child_count = {};
    var tinder_results = global_get_tinder_results();

    var liked_sim_col_names = [
      "sim_2767052-the-hunger-games",
      "sim_2.Harry_Potter_and_the_Order_of_the_Phoenix",
      "sim_2657.To_Kill_a_Mockingbird",
      "sim_1885.Pride_and_Prejudice",
      "sim_33.The_Lord_of_the_Rings",
      "sim_370493.The_Giving_Tree",
      "sim_968.The_Da_Vinci_Code",
      "sim_24213.Alice_s_Adventures_in_Wonderland_Through_the_Looking_Glass",
      "sim_24280.Les_Mis_rables",
      "sim_18144590-the-alchemist",
      "sim_7144.Crime_and_Punishment",
      "sim_22628.The_Perks_of_Being_a_Wallflower",
      "sim_375802.Ender_s_Game",
      "sim_17245.Dracula",
      "sim_13496.A_Game_of_Thrones",
      "sim_1381.The_Odyssey",
      "sim_4214.Life_of_Pi",
      "sim_44767458-dune",
      "sim_3590.The_Adventures_of_Sherlock_Holmes",
      "sim_2429135.The_Girl_with_the_Dragon_Tattoo",
      "sim_4934.The_Brothers_Karamazov",
      "sim_99107.Winnie_the_Pooh",
      "sim_49552.The_Stranger",
      "sim_11588.The_Shining",
      "sim_99561.Looking_for_Alaska",
      "sim_1618.The_Curious_Incident_of_the_Dog_in_the_Night_Time",
      "sim_119073.The_Name_of_the_Rose",
      "sim_22034.The_Godfather",
      "sim_830502.It",
      "sim_1845.Into_the_Wild"
    ].filter(x => tinder_results[x.substring(4)]);

    // Data filtering
    let data = raw_data.filter(row => {

      if (row.bookId == "ROOT") {
        return true;
      }
      else if (row.parentId == "ROOT") {
        parents_child_count[row.bookId] = false;
        return true;
      }

      var pass = false;
      var threshold = (1/1450)*liked_sim_col_names.length + (63/1160);  // science
      for (col of liked_sim_col_names) {
        if (`sim_${row.bookId}` == col) {
          return false;  // Forbid liked tinder books from showing up
        }

        pass = pass || Number(row[col]) > threshold;
        if (pass) {
          break;
        }
      }

      if (pass) {
        parents_child_count[row.parentId] = true;
      }

      return pass;
    });

    // Remove childless parents
    data = data.filter(row => {
      if (row.bookId == "ROOT" || row.parentId != "ROOT") {
        return true;
      }
      return parents_child_count[row.bookId];
    });

    data = d3.stratify()  // from here on, `data` contains stuff with the d3 format.
      .id(raw_d => raw_d.bookId)
      .parentId(raw_d => raw_d.parentId)
      (data);

    data = data.sum(d_data => {  // but not here because sum is stupid...
      // big science incoming

      var size = -1;

      for (col of liked_sim_col_names) {
        var x = d_data[col];

        var x1 = x/1.1 + 0.1;
        var basis = 4.2*x1*x1*x1 - 6.9*x1*x1 + 4.02*x1 - 0.32

        var x2 = x - 0.7;
        var bump = -1.69*x2*x2 + 0.2;

        size = Math.max(size, basis+bump);
      }

      return Math.max(0.05, Math.min(1, size)); // science
    });

    console.log(data, liked_sim_col_names)

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

    // State
    let focused = root_data;  // focus is the focused node's joined data. root_data = the root node's data, so we focus the root node for now
    let current_view = [root_data.x, root_data.y, size];  // a view is an array [center_x, center_y, size]

    // DOM nodes selections
    let svg_dummy_data = [0];
    let svg_selection = d3.select("#bubbles").selectAll("svg").data(svg_dummy_data).join("svg")  // ensure there is one svg
      .attr("viewBox", [-width/2 , -height/2, width, height])
      .style("font-family", "Helvetica")
      .on("click", (event) => {
        zoom(event, root_data);
        event.stopPropagation();
        remove_tooltip(tooltip_selection);
      });

    let g_dummy_data = ["circles", "labels"];
    svg_selection.selectAll("g").data(g_dummy_data).join("g") // ensure there are two "g" elements inside the svg
      .attr("id", d => `g-${d}`);

    let circles_selection = svg_selection.select("g#g-circles").selectAll("circle").data(root_data.descendants().slice(1)).join("circle")
      .attr("r", d => d.r)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => bubbles_color(d.depth))
      .attr("cursor", d => "pointer")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function(event, d) {
        d3.select(this)
        .attr("stroke", bubbles_color(4));

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
          remove_tooltip(tooltip_selection);
          event.stopPropagation();
        } else if (focused !== d && !d.children) {
          zoom(event, d);
          tooltip(event, d, tooltip_selection);
          event.stopPropagation();
        }
      });

    let labels_group_selection = svg_selection.select("g#g-labels")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none");

    let labels_selection = labels_group_selection.selectAll("text").data(root_data.descendants().slice(1))
      .join("text")
      .style("fill-opacity", d => label_opacity(d, root_data))
      .style("display", d => d.parent.id === "ROOT" ? "inline" : "none")
      .style("font-size", d => `${label_vh_size_absolute(d, original_center_r)}vh`)
      .attr("transform", d => `rotate(25, ${d.x}, ${d.y})`)
      .text(d => {
        if (d.parent.id == "ROOT") {
          return d.id;
        } else if (d.data.title.length <= 20) {
          return d.data.title;
        }
        return d.data.title.slice(0, 20) + '…';
      })
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .each(function(d) {
        d.__label__ = this;  // dinguerie but it works °o°
      });

    philippe_popup.classList.toggle("m-fadeIn");

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
          return `rotate(25, ${(d.x+trans_x)*scal}, ${(d.y+trans_y)*scal})
          scale(${scal})
          translate(${trans_x}, ${trans_y})`;
        });
    }
  });
}

global_refresh_bubbles();
