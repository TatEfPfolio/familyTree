function renderD3(data) {
  const personMap = Object.fromEntries(data.map(p => [p.id, { ...p, children: [] }]));  
  const roots = data.filter(p => (p.parents || []).length === 0);

  console.log("renderD3 starting", document.getElementById("d3").clientWidth, document.getElementById("d3").clientHeight);

  document.getElementById('d3').innerHTML = '';

  // Establish parent-child relationships
  data.forEach(p => {
    (p.parents || []).forEach(pid => {
      if (personMap[pid]) {
        personMap[pid].children.push(personMap[p.id]);
      }
    });
    (p.spouses || []).forEach(spouseId => {
      if (personMap[spouseId]) {
        personMap[spouseId].children.push(personMap[p.id]); // Spouses should be linked too
      }
    });
  });

  const root = d3.hierarchy(personMap[roots[0].id]);

  const width = document.getElementById("d3").clientWidth;
  const height = document.getElementById("d3").clientHeight;

  const treeLayout = d3.tree().size([width - 100, height - 100]);
  treeLayout(root);

  const svg = d3.select("#d3").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

  svg.selectAll(".link")
    .data(root.links())
    .join("path")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2)
    .attr("d", d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y));

  const node = svg.selectAll(".node")
    .data(root.descendants())
    .join("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  node.append("circle").attr("r", 6).attr("fill", "#69b3a2");

  node.append("text")
    .attr("dy", -10)
    .attr("text-anchor", "middle")
    .text(d => `${d.data.full_name} (${d.data.birth_year || "?"}–${d.data.death_year || "?"})`)
    .attr("font-size", "12px");
}
