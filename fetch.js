fetch("https://sheetdb.io/api/v1/rdws1fe4qf1bf")
  .then(response => response.json())
  .then(data => {
    console.log(data); // ← Your genealogy records as JSON
  });
