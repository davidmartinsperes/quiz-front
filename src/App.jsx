import React, { useState, useEffect } from 'react';  // Importa React, useState e useEffect do React
import './App.css';  // Importa o arquivo de estilos CSS

import Start from './components/Start';  // Importa o componente Start
import Question from './components/Question';  // Importa o componente Question
import End from './components/End';  // Importa o componente End
import Modal from './components/Modal';  // Importa o componente Modal
import quizData from './data/quiz.json';  // Importa os dados do quiz de um arquivo JSON

let interval;  // Declara uma variável global para armazenar o intervalo do timer

const App = () => {  // Define o componente funcional App
  const [step, setStep] = useState(1);  // Define um estado chamado 'step' para acompanhar a etapa atual do quiz (1 - Start, 2 - Pergunta, 3 - Fim)
  const [activeQuestion, setActiveQuestion] = useState(0);  // Define um estado 'activeQuestion' para acompanhar a pergunta ativa
  const [answers, setAnswers] = useState([]);  // Define um estado 'answers' para armazenar as respostas dos usuários
  const [showModal, setShowModal] = useState(false);  // Define um estado 'showModal' para controlar a exibição do modal de resultados
  const [time, setTime] = useState(0);  // Define um estado 'time' para armazenar o tempo gasto no quiz

  useEffect(() => {  // Usa o hook useEffect para realizar ações secundárias
    if(step === 3) {  // Se o passo for igual a 3 (fim do quiz)
      clearInterval(interval);  // Limpa o intervalo para parar o timer
    }
  }, [step]);  // O useEffect é executado quando o valor de 'step' muda

  const quizStartHandler = () => {  // Função que inicia o quiz
    setStep(2);  // Muda a etapa para 2 (pergunta)
    interval = setInterval(() => {  // Inicia o timer usando setInterval
      setTime(prevTime => prevTime + 1);  // Incrementa o tempo a cada segundo
    }, 1000);  // Define o intervalo de 1 segundo
  }

  const resetClickHandler = () => {  // Função para reiniciar o quiz
    setActiveQuestion(0);  // Reseta a pergunta ativa para a primeira pergunta
    setAnswers([]);  // Limpa as respostas armazenadas
    setStep(2);  // Define a etapa para 2 (pergunta)
    setTime(0);  // Reseta o tempo para 0
    interval = setInterval(() => {  // Reinicia o timer
      setTime(prevTime => prevTime + 1);  // Incrementa o tempo a cada segundo
    }, 1000);  // Define o intervalo de 1 segundo
  }

  return (  // Retorna o JSX do componente
    <div className="App"> 
      {step === 1 && <Start onQuizStart={quizStartHandler} />} 
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}  // Passa os dados da pergunta ativa para o componente Question
        onAnswerUpdate={setAnswers}  // Passa a função setAnswers para atualizar as respostas
        numberOfQuestions={quizData.data.length}  // Passa o número total de perguntas
        activeQuestion={activeQuestion}  // Passa o índice da pergunta ativa
        onSetActiveQuestion={setActiveQuestion}  // Passa a função para atualizar a pergunta ativa
        onSetStep={setStep}  // Passa a função para atualizar a etapa
      />}
      {step === 3 && <End 
        results={answers}  // Passa as respostas para o componente End
        data={quizData.data}  // Passa os dados do quiz para o componente End
        onReset={resetClickHandler}  // Passa a função resetClickHandler para reiniciar o quiz
        onAnswersCheck={() => setShowModal(true)}  // Função para mostrar o modal ao verificar as respostas
        time={time}  // Passa o tempo gasto no quiz
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}  // Passa a função para fechar o modal
        results={answers}  // Passa as respostas para o modal
        data={quizData.data}  // Passa os dados do quiz para o modal
      />}
    </div>
  );
}

export default App;  // Exporta o componente App como padrão
