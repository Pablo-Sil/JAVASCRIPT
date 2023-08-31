form.addEventListener('submit', (e) => {
  e.preventDefault();

  const palavraPesquisada = document.getElementById('palavraPesquisada').value;

  // Verifica se um termo de pesquisa foi inserido
  if (palavraPesquisada.trim() === '') {
    resultadosDiv.textContent = 'Por favor, digite uma palavra para pesquisar.';
  } else {
    // Envia a palavra pesquisada para o servidor
    fetch(`/pesquisar?palavra=${palavraPesquisada}`)
      .then(response => response.json())
      .then(data => {
        exibirResultados(data);
      });
  }
});
