window.addEventListener('DOMContentLoaded', () => {
  fetch('treeData.json')
    .then(res => res.json())
    .then(data => {
      renderCytoscape(data);
      renderD3(data);
    });
});
