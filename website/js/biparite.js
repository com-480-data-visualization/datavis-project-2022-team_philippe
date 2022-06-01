
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

function biparite_update(g, file_name, stat){

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

    var biparite_d3 = viz.bP()
                        .data(display_data)
                        .min(12)
                        .pad(1)
                        .height(700)
                        .width(400)
                        .barSize(35)
                        //.fill(e => ) TODO





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

  biparite_update(g, "../data/biparite_ratings.csv", "rating_cat")
}

window.addEventListener('load', function() {
    build_biparite_ratings()
})
