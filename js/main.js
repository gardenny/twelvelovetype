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

function chooseAnswer(answer, qIndex, aIndex) {
  const answerBox = document.querySelector('.answer-box');
  const answerBtn = document.createElement('button');
  answerBtn.classList.add('answer-list', 'mt-3', 'p-3');
  answerBox.appendChild(answerBtn); // 답변 리스트 동적 생성
  answerBtn.innerText = answer; // 답변 리스트 삽입

  answerBtn.addEventListener('click', () => {
    const childrens = document.querySelectorAll('.answer-list');
    childrens.forEach(children => {
      children.disabled = true;
      children.style.WebkitAnimation = 'fadeOut 500ms';
      children.style.animation = 'fadeOut 500ms';
    });
    setTimeout(() => {
      // 사용자가 선택한 답변의 type count 1씩 증가
      const type = qnaList[qIndex].a[aIndex].type;
      for (let i = 0; i < type.length; i++) selected[type[i]] += 1;
      childrens.forEach(children => children.remove());
      goNext(++qIndex); // 다음 질문 전달
    }, 450);
  });
}

function setResult() {
  let point = calcResult(); // 최종적으로 계산되어져 나온 type의 index값
  const resultName = document.querySelector('.result-name');
  const resultImg = document.querySelector('.result-img');
  const resultDesc = document.querySelector('.result-description');

  resultName.innerText = infoList[point].name;
  resultImg.setAttribute(`src`, `img/image-${point}.png`);
  resultImg.setAttribute(`alt`, point);
  resultDesc.innerText = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = 'fadeOut 1000ms';
  qna.style.animation = 'fadeOut 1000ms';
  setTimeout(() => {
    result.style.WebkitAnimation = 'fadeIn 1000ms';
    result.style.animation = 'fadeIn 1000ms';
    setTimeout(() => {
      qna.style.display = 'none';
      result.style.display = 'block';
    }, 450);
  });
  setResult();
}

function calcResult() {
  // 받아온 selected 배열에서 최대값을 가지고 있는 아이템의 index를 변수에 할당
  const typeResult = selected.indexOf(Math.max(...selected));
  return typeResult;
}

startBtn.addEventListener('click', startTest);
shareBtn.addEventListener('click', setShare);
retryBtn.addEventListener('click', () => {
  location.href = 'https://imjone.github.io/twelvelovetype/';
});
