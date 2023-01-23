'use strict';

const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');

const startBtn = document.querySelector('.btn-start');
const statusBar = document.querySelector('.status-bar');
const progressCount = document.querySelector('.progress-count');
const questionBox = document.querySelector('.question-box');
const resultBtn = document.querySelector('.btn-result');
const shareBtn = document.querySelector('.btn-share');
const retryBtn = document.querySelector('.btn-retry');

const endPoint = 12; // 총 질문 갯수
const selected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 사용자의 답변이 담길 배열

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function startTest() {
  main.style.animation = 'fadeOut 1000ms';
  main.style.WebkitAnimation = 'fadeOut 1000ms';
  setTimeout(() => {
    qna.style.animation = 'fadeIn 1000ms';
    qna.style.WebkitAnimation = 'fadeIn 1000ms';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 400);
    let qIndex = 0; // 질문 순서
    goNext(qIndex);
  }, 400);
}

function goNext(qIndex) {
  if (qIndex === endPoint) {
    statusBar.style.width = '100%';
    progressCount.innerText = '결과 분석 중...';
    questionBox.innerText = '나의 연애 유형에 맞는 동물을 찾았어요! ';
    resultBtn.style.opacity = 1;
    resultBtn.style.pointerEvents = 'auto';
    resultBtn.addEventListener('click', goResult);
    return;
  }

  questionBox.innerText = `Q. ${qnaList[qIndex].q}`; // 질문 리스트
  for (let i in qnaList[qIndex].a) {
    const answer = qnaList[qIndex].a[i].answer; // 답변 리스트
    chooseAnswer(answer, qIndex, i); // 답변 리스트와 질문 순서 함께 전달
  }
  // 진행도 구하기
  statusBar.style.width = `${(100 / endPoint) * qIndex}%`;
  progressCount.innerText = `${qIndex + 1}/12`;
}
