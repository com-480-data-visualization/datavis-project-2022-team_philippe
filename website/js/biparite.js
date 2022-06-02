
const WIDTH = window.screen.width;
const HEIGHT = window.screen.height;

const stats = ["rating", "page", "cover", "price"];

//d3v4 = d3;
var biparite_svg = d3v4.select("#biparite-vizu")
                    .append("svg")
                    .attr("width", Math.floor(WIDTH*0.52))
                    .attr("height", Math.floor(HEIGHT*0.68));

/*var stat_selection = d3v4.select("#biparite-vizu")
                        .attr("class","btn-primary")
                        .selectAll("option")
                        .data(stats)
                        .enter()
                        .append("option")
                        .attr("value", function(stat){return stat})
                        .text(function(stat){return "genres VS " + String(stat);})*/

function biparite_build(g, file_name, stat_id, stat_name){

  const bp_title = "Genre VS "+stat_name;

  d3v4.csv(file_name, function(error, raw_data) { //).then(raw_data => {

    var display_data = []

    raw_data.forEach(function(row) {
      var buff_arr = new Array(0);

      buff_arr.push(row.genre)
      buff_arr.push(row[stat_id])
      buff_arr.push(parseFloat(row.count))
      display_data.push(buff_arr)

      // TODO: colors
    });

    function biparite_update(display_data, g) {

      biparite_svg.selectAll("g")
                  .remove()
                  .transition()
                  .duration(1000)
                  .style("fill", 'black');

      const translate_factor = Math.floor(WIDTH*0.0977).toString() + "," + Math.floor(WIDTH*0.023).toString();

      // position the bp element in the global svg
      var group = biparite_svg.append("g")
                          .attr("transform","translate("+translate_factor+")");

      var biparite_graph = viz.bP()
                          .data(display_data)
                          .min(12)
                          .pad(1.5)
                          .height(Math.floor(HEIGHT*0.62))
                          .width(Math.floor(WIDTH*0.3))
                          .barSize(WIDTH*0.023)
                          .fill(e => '#63474d');

      group.call(biparite_graph).transition().duration(1000);
      // TOREMOVE
      /*group.append("text").attr("x",-50).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(0).style("fill", 'black');
      group.append("text").attr("x", 450).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(0).style("fill", 'black');
      group.append("line").attr("x1",-100).transition().duration(1000).attr("x2",0);
      group.append("line").attr("x1",400).transition().duration(1000).attr("x2",550);
      group.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",-100).attr("x2",0);
      group.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",200).attr("x2",350);*/
/*
      // TODO; upgrade so that is displays percentage onClick
      function mouseover(elem){
        biparite_graph.mouseover(elem);

        group.selectAll(".mainBars")
          .select(".perc")
          .text(function(e){ return "   " +d3v4.format("0.0%")(e.percent);})
          .transition()
          .duration(1000);
      }

      function mouseout(elem){
          biparite_graph.mouseout(elem);

          group.selectAll(".mainBars")
            .select(".perc")
            .text(function(e){ return d3v4.format("0.0%")(e.percent);})
            .transition()
            .duration(1000);
      }

      group.selectAll(".mainBars")
        .on("mouseover",mouseover())
        .on("mouseout",mouseout())
        .transition()
        .duration(3000);*/

      // setting labels for the genres and studied statistic
      group.selectAll(".mainBars")
        .append("text")
        .attr("class","label")
        .attr("x",e=>(e.part=="primary"? -Math.floor(WIDTH*0.0195): Math.floor(WIDTH*0.0195)))
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
        .attr("x",e=>(e.part=="primary"? -Math.floor(WIDTH*0.091): Math.floor(WIDTH*0.098)))
        .style("fill", '#63474d')
        .attr("y",e=>6)
        .text(function(e){return "  "+d3v4.format("0.0%")(e.percent);})
        .transition()
        .duration(1000)
        .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

      d3v4.select(self.frameElement)
        .style("height", Math.floor(HEIGHT*0.6));
      }

      biparite_update(display_data, g);
  });
}

function build_biparite_ratings(){
  biparite_svg.selectAll("*")
              .remove();

  text_height = "4vh";

  // display and position biparite title
  biparite_svg.append("text")
      .attr("x",Math.floor(WIDTH*0.2))
      .attr("y",text_height)
      .attr("class","header")
      .text("Genres VS Ratings")
      .style("fill", '#63474d')
      .style("font-family", "Sacramento")
      .style("font-size", text_height)
      .style("font-family", "Sacramento");

  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "../data/biparite_ratings.csv", "rating_cat", "Ratings")
}

window.addEventListener('load', function() {
    build_biparite_ratings()
})
