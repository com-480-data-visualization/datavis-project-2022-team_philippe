
const WIDTH = window.screen.width;
const HEIGHT = window.screen.height;

const stats = ["rating", "page", "cover", "price"];

var biparite_svg = d3v4.select("#biparite-vizu")
                    .append("svg")
                    .attr("width", Math.floor(WIDTH*0.65))
                    .attr("height", Math.floor(HEIGHT*0.7));

function biparite_build(g, file_name, stat_id, stat_name){

  const bp_title = "Genre VS "+stat_name;

  d3v4.csv(file_name, function(error, raw_data) {

    var display_data = []

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
      const translate_factor = Math.floor(WIDTH*0.18).toString() + "," + Math.floor(WIDTH*0.04).toString();
      var group = biparite_svg.append("g")
                          .attr("transform","translate("+translate_factor+")");

      var biparite_graph = viz.bP()
                          .data(display_data)
                          .min(12)
                          .pad(1.5)
                          .height(Math.floor(HEIGHT*0.6))
                          .width(Math.floor(WIDTH*0.3))
                          .barSize(WIDTH*0.023)
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
        .attr("x",e=>(e.part=="primary"? -Math.floor(WIDTH*0.015): Math.floor(WIDTH*0.015)))//-Math.floor(WIDTH*0.0195): Math.floor(WIDTH*0.0195)))
        .attr("y",e=>6)
        .text(e=>e.key)
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
        .attr("x",e=>(e.part=="primary"? -(Math.floor(WIDTH*0.015)+120): Math.floor(WIDTH*0.015)+120))
        .style("fill", '#63474d')
        .attr("y",e=>6)
        .text(function(e){return "  "+d3v4.format("0.0%")(e.percent);})
        .transition()
        .duration(1000)
        .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

      d3v4.select(self.frameElement)
        .style("height", Math.floor(HEIGHT*0.75));
      }

      biparite_update(display_data, g);
  });
}

function build_biparite_ratings(){
  biparite_svg.selectAll("*")
              .remove();



  // display and position biparite title
  const text_height = "4vh";
  const mid_bp_width = Math.floor(WIDTH*(0.65/2))
  biparite_svg.append("text")
      .attr("x",mid_bp_width)
      .attr("y",text_height)
      .attr("class","header")
      .text("Genres VS Ratings")
      .style("fill", '#63474d')
      .style("font-family", "Sacramento")
      .style("font-size", text_height)
      .style("font-family", "Sacramento")
      .attr("transform","translate(-100,0)");

  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "./data/biparite_ratings.csv", "rating_cat", "Ratings")
}

window.addEventListener('load', function() {
    build_biparite_ratings()
})
