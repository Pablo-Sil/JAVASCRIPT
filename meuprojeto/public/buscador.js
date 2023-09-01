document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pesquisaForm');
  const resultadosDiv = document.getElementById('resultados');

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

  function exibirResultados(resultados) {
    // Limpa a área de resultados
    resultadosDiv.innerHTML = '';

    if (resultados.length > 0) {
      resultados.forEach(resultado => {
        const resultadoDiv = document.createElement('div');
        resultadoDiv.textContent = `No arquivo "${resultado.arquivo}", a palavra foi encontrada ${resultado.ocorrencias} vezes.`;
        resultadosDiv.appendChild(resultadoDiv);
      });
    } else {
      resultadosDiv.textContent = 'A palavra não foi encontrada em nenhum arquivo.';
    }
  }
});
