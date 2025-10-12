function loadhtmlPartial(Id, filePath) { // Função para dar fetch a componentes parciais do html
    fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filePath}`);
      return response.text();
    })
    .then(html => {
      document.getElementById(Id).innerHTML = html;
    })
    .catch(error => {
      console.error('Error including partial:', error);
    });
}