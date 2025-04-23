function renderCytoscape(data) {
  const nodes = data.map(p => ({
    data: {
      id: p.id,
      label: `${p.full_name} (${p.birth_year || "?"}–${p.death_year || "?"})`
    }
  }));

  const edges = [];
  
  // Connect parents and children
  data.forEach(p => {
    (p.parents || []).forEach(parentId => {
      edges.push({ data: { source: parentId, target: p.id } });
    });
    (p.children || []).forEach(childId => {
      edges.push({ data: { source: p.id, target: childId } });
    });
    (p.spouses || []).forEach(spouseId => {
      edges.push({ data: { source: p.id, target: spouseId } });
    });
  });

  cytoscape({
    container: document.getElementById('cy'),
    elements: [...nodes, ...edges],
    layout: { name: 'breadthfirst', directed: true, padding: 30 },
    style: [
      { selector: 'node', style: {
        'background-color': '#69b3a2',
        'label': 'data(label)',
        'text-valign': 'center',
        'color': '#333',
        'font-size': '14px',
        'text-outline-width': 1,
        'text-outline-color': '#fff'
      }},
      { selector: 'edge', style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }}
    ]
  });
}
