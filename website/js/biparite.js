// --radio buttons--
d3.selectAll(".biparite-label")
  .on("mousedown", function(event) {
    d3.select(this).classed("biparite-label-pressed", true);
  })
  .on("mouseup", function(event) {
    d3.select(this).classed("biparite-label-pressed", false);
  });

d3.selectAll(".biparite-radio")
  .on("change", function(event) {
    var which_radio = d3.select(this).attr("value");
    var dictionary = {
      "ratings": build_biparite_ratings,
      "pages": build_biparite_pages,
      "title_length": build_biparite_title,
      "price": build_biparite_price
    };
    dictionary[which_radio]();  // big brain here.

    d3.selectAll(".biparite-label").classed("biparite-label-checked", false);
    d3.select(d3.select(this).node().parentNode).classed("biparite-label-checked", true);
  });

// -- graph--

const WIDTH = window.screen.width;
const HEIGHT = window.screen.height;
const stats = ["rating", "page", "title_length", "price"];

var biparite_svg = d3v4.select("#biparite-vizu")
  .append("svg")
  .attr("width", 900)
  .attr("height", 510);

function biparite_build(g, file_name, stat_id, stat_name){
  d3.select("#biparite-title").text(`Genres VS ${stat_name}`);

  d3v4.csv(file_name, function(error, raw_data) {
    var display_data = [];

    raw_data.forEach(function(row) {
      var buff_arr = new Array(0);

      buff_arr.push(row.genre)
      buff_arr.push(row[stat_id])
      buff_arr.push(parseFloat(row.count))
      display_data.push(buff_arr)
    });

    function biparite_update(display_data, g) {
      biparite_svg.selectAll("g")
                  .remove()
                  .transition()
                  .duration(1000)
                  .style("fill", 'black');

      // position the bp element in the global svg
      var group = biparite_svg.append("g")
                          .attr("transform","translate(200, 0)");

      // init main biparite logic using bipartitelib
      var biparite_graph = viz.bP()
                          .data(display_data)
                          .min(12)
                          .pad(1.5)
                          .height(500)
                          .width(500)
                          .barSize(30)
                          .fill(e => '#63474d');

      group.call(biparite_graph).transition().duration(1000);

      function mouse_over(elem){
        biparite_graph.mouseover(elem);
        group.selectAll(".mainBars")
          .select(".perc")
          .text(function(e){ return "   " +d3v4.format("0.0%")(e.percent);})
          .transition()
          .duration(1000);
      }

      function mouse_out(elem){
          biparite_graph.mouseout(elem);
          group.selectAll(".mainBars")
            .select(".perc")
            .text(function(e){ return d3v4.format("0.0%")(e.percent);})
            .transition()
            .duration(1000);
      }

      // updates count percentage on hoover
      group.selectAll(".mainBars")
        .on("mouseover",mouse_over)
        .on("mouseout",mouse_out)
        .transition()
        .duration(3000);

      // setting labels for the genres and studied statistic
      group.selectAll(".mainBars")
        .append("text")
        .attr("class","label")
        .attr("x", e => (e.part=="primary"? -Math.floor(WIDTH*0.015) : Math.floor(WIDTH*0.015)))
        .attr("y", e => 6)
        .text(e => (e.part=="primary"? e.key : (e.key).toString().substring(1)))
        .transition()
        .duration(1000)
        .style("fill", '#63474d')
        .style("font-family", "Open Sans")
        .style("font-weight", 300)
        .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

      // setting percentage each of the genres and studied statistic
      group.selectAll(".mainBars")
        .append("text")
        .attr("class","perc")
        .attr("x", e => (e.part=="primary"? -(Math.floor(WIDTH*0.015)+120): Math.floor(WIDTH*0.015)+120))
        .style("fill", '#63474d')
        .attr("y", e => 6)
        .text(function(e){return "  "+d3v4.format("0.0%")(e.percent);})
        .transition()
        .duration(1000)
        .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

      d3v4.select(self.frameElement)
        .style("height", 650);
      }

      biparite_update(display_data, g);
  });
}

function build_biparite_ratings(){
  biparite_svg.selectAll("*").remove();
  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "./data/biparite_ratings.csv", "rating_cat", "Ratings")
}


function build_biparite_pages(){
  biparite_svg.selectAll("*").remove();
  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "./data/biparite_pages.csv", "pages_cat", "Pages")
}

function build_biparite_title(){
  biparite_svg.selectAll("*").remove();
  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "./data/biparite_titles.csv", "title_cat", "Title length")
}


function build_biparite_price(){
  biparite_svg.selectAll("*").remove();
  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "./data/biparite_price.csv", "price_cat", "Price")
}

window.addEventListener('load', function() {
    build_biparite_ratings()
})
