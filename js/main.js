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
