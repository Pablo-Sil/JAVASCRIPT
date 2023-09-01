const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path'); // Importe a biblioteca 'path' para manipular caminhos de arquivos.

const app = express();
const porta = 8081;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/pesquisar', (req, res) => {
  const palavraPesquisada = req.query.palavra.toLocaleLowerCase()
  const pastaComPDFs = 'C:/Users/pablo/OneDrive/Documentos/GitHub/JavaScript/meuprojeto/seuarquivo.pdf/'; // Caminho para a pasta com arquivos PDF
  const resultados = [];

  fs.readdir(pastaComPDFs, (err, arquivos) => {
    if (err) {
      console.error('Erro ao listar arquivos:', err);
      return res.status(500).json({ error: 'Erro ao listar arquivos.' });
    }

    const arquivosPDF = arquivos.filter(arquivo => arquivo.endsWith('.pdf'));

    arquivosPDF.forEach(arquivo => {
      const caminhoArquivo = path.join(pastaComPDFs, arquivo); // Use 'path.join' para criar o caminho completo do arquivo.
      const dataBuffer = fs.readFileSync(caminhoArquivo);

      pdf(dataBuffer).then(data => {
        const texto = data.text.toLocaleLowerCase();
        const textoSemPontuacao = texto.replace(/[.,\/#!$%\^&@\*;:{}=\-_`~()]/g, ' ');
        const palavras = texto.split(/\s+/);
        const palavraPesquisadaSemPontuacao = palavraPesquisada.replace(/[.,\/#!$%\^&@\*;:{}=\-_`~()]/g, '');
        const ocorrencias = palavras.filter(palavra => palavra.replace(/[.,\/#!$%\^&@\*;:{}=\-_`~()]/g, '') === palavraPesquisada).length;

        if (ocorrencias > 0) {
          resultados.push({
            arquivo: arquivo,
            ocorrencias: ocorrencias,
          });
        }

        if (resultados.length === arquivosPDF.length) {
          res.json(resultados);
        }
      });
    });
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
