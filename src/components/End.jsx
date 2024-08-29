import React, { useEffect, useState } from 'react';  // Importa React, useEffect e useState do React

import { formatTime } from '../utils';  // Importa a função formatTime de um arquivo de utilitários

const End = ({ results, data, onReset, onAnswersCheck, time }) => {  // Define o componente funcional End com propriedades recebidas
  const [correctAnswers, setCorrectAnswers] = useState(0);  // Define um estado 'correctAnswers' para armazenar o número de respostas corretas

  useEffect(() => {  // Usa o hook useEffect para realizar ações secundárias após a renderização
    let correct = 0;  // Inicializa a variável 'correct' com valor 0
    results.forEach((result, index) => {  // Itera sobre os resultados das respostas
      if(result.a === data[index].answer) {  // Se a resposta do usuário for igual à resposta correta
        correct++;  // Incrementa o contador de respostas corretas
      }
    });
    setCorrectAnswers(correct);  // Atualiza o estado 'correctAnswers' com o número de respostas corretas
    // eslint-disable-next-line
  }, []);  // O useEffect é executado uma vez, após a montagem do componente

  return(
    <div className="card"> 
      <div className="card-content">  
        <div className="content">  
          <h3>Resultados</h3>  
          <p>{correctAnswers} de {data.length}</p>  
          <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>  
          <p><strong>Tempo:</strong> {formatTime(time)}</p>  
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Suas Respostas!</button>  
          <button className="button is-success" onClick={onReset}>Tente Novamente!</button>  
        </div>
      </div>
    </div>
  );
}

export default End;  // Exporta o componente End como padrão
