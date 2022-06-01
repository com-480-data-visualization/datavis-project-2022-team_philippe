
const stats = ["rating", "page", "cover", "price"]

var biparite_svg = d3.select("biparite-vizu")
                    .append("svg")
                    .attr("width", 800)
                    .attr("height", 800);

var stat_selection = d3.select("biparite-vizu")
                        .attr("class","btn-primary")
                        .selectAll("option")
                        .data(stats)
                        .enter()
                        .append("option")
                        .attr("value", function(stat){return stat})
                        .text(function(stat){return "genres VS " + String(stat);})

function biparite_build(g, file_name, stat){

  function mouseover(biparite_graph, g, elem){
    biparite_graph.mouseover(elem);

    g.selectAll(".mainBars")
      .select(".perc")
      .text(function(e){ return "   " +d3.format("0.0%")(e.percent);})
      .transition()
      .duration(1000);
  }

  function mouseout(biparite_graph, g, elem){
      biparite_graph.mouseover(elem);

      g.selectAll(".mainBars")
        .select(".perc")
        .text(function(e){ return d3v4.format("0.0%")(e.percent);})
        .transition()
        .duration(1000);
  }

  d3.csv(file_name).then(raw_data => {

    var display_data = []

    raw_data.forEach(function(row) {
      var buff_arr = new Array(0);

      buff_arr.push(row.genre)
      buff_arr.push(row[stat])
      buff_arr.push(parseFloat(row.count))
      display_data.push(buff_arr)

      // TODO: colors

    });

    console.log(display_data);

    var biparite_graph = viz.bP()
                        .data(display_data)
                        .min(12)
                        .pad(1)
                        .height(700)
                        .width(400)
                        .barSize(35)
                        //.fill(e => ) TODO

    g.call(biparite_graph).transition().duration(1000)
    g.append("text").attr("x",-50).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(0).style("fill", 'black');
    g.append("text").attr("x", 450).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(0).style("fill", 'black');
    g.append("line").attr("x1",-100).transition().duration(1000).attr("x2",0);
    g.append("line").attr("x1",400).transition().duration(1000).attr("x2",550);
    g.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",-100).attr("x2",0);
    g.append("line").attr("y1",710).transition().duration(1000).attr("y2",710).attr("x1",200).attr("x2",350);

    g.selectAll(".mainBars").on("mouseover",mouseover).on("mouseout",mouseout).transition().duration(3000);
    g.selectAll(".mainBars")
      .append("text")
      .attr("class","label")
      .attr("x",e=>(e.part=="primary"? -30: 50))
      .attr("y",e=>+6)
      .text(e=>e.key)
      .transition()
      .duration(1000)
      .style("fill", 'black')
      .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

    g.selectAll(".mainBars").append("text").attr("class","perc")
      .attr("x",e=>(e.part=="primary"? -100: 150))
      .style("fill", 'black')
      .attr("y",e=>+6)
      .text(function(e){return "  "+d3.format("0.0%")(e.percent);})
      .transition()
      .duration(1000)
      .attr("text-anchor",e=>(e.part=="primary"? "end": "start"));

    d3.select(self.frameElement)
      .style("height", "800px");}




  });
}

function build_biparite_ratings(){
  biparite_svg.selectAll("*")
              .remove();

  biparite_svg.append("text")
      .attr("x",250)
      .attr("y",70)
      .attr("class","header")
      .text("Genres VS Ratings")
      .style("fill", 'black');

  var g = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_build(g, "../data/biparite_ratings.csv", "rating_cat")
}

window.addEventListener('load', function() {
    build_biparite_ratings()
})
