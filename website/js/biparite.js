
const data_file = "../data/biparite_data.csv"
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

function biparite_update(){

  d3.csv(data_file).then(raw_data => {

    var display_data = []

    raw_data.forEach(function(row) {


    });



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

  var group = biparite_svg.append("g").attr("transform","translate(150,100)");

  biparite_update(g, "ratings", )
}
