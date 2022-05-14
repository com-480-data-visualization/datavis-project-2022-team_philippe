const fake_csv_data = `id,parent
_root_,
Drama,_root_
The Story of PolyJapan,Drama
The Story of PolyLAN,Drama
Death of the Princess,Drama
Comedy,_root_
The Life of Arnalo,Comedy
My Javascript Code,Comedy`;

const table = d3.csvParse(fake_csv_data);
const root_node_data = d3.stratify().id(d => d.id).parentId(d => d.parent)(table)
root_node_data.count();  // Add a "value" attribute to all nodes under the root, which equals the number of nodes under that node.

const descendant_nodes_data = root_node_data.descendants()

d3.pack().size([599, 599])(root_node_data);

console.log(root_node_data);

const svg = d3.select("#bubble-graph").append("center").append("svg")
  .attr("viewBox", [0, 0, 600, 600])
  .attr("width", 600)
  .attr("height", 600);

const nodes = svg.selectAll("circle").data(descendant_nodes_data).enter().append("g");

nodes.append("circle")
  .attr("fill", "#fff")
  .attr("fill-opacity", node_data => node_data.children ? 0.5 : 1.0)
  .attr("stroke", node_data => node_data.children ? "#aaa" : "#000")
  .attr("stroke-width", node_data => node_data.children ? 2 : 1)
  .attr("r", node_data => node_data.r)
  .attr("cx", node_data => node_data.x)
  .attr("cy", node_data => node_data.y);

nodes.filter(node_data => node_data.parent).append("text").text(node_data => node_data.id)
  .attr("x", node_data => node_data.x)
  .attr("y", node_data => node_data.children ? node_data.y - 0.9*(node_data.r) : node_data.y)
  .attr("class", "bubble_graph_text");
