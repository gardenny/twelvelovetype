![lovetype](https://user-images.githubusercontent.com/110226567/213995722-33844b26-07e0-4baa-be32-4e5fe0f44eb1.png)

# 💗 Twelve love type

12가지 연애 유형 심리 테스트 사이트 👉 [Demo](https://imjone.github.io/twelvelovetype/)

<br />

## 📢 프로젝트 개요

12가지 질문을 통해 나의 연애 유형과 가장 어울리는 동물을 알아볼 수 있는 사이트입니다.<br />
최근 SNS 상에서 다양한 형태로 꾸준히 유행하고 있는 MBTI 테스트를 모티브로 하고 있으며,<br />
호불호 없이 남녀노소 모든 연령대가 즐길 수 있는 '연애'라는 주제를 잡고 진행하게 되었습니다.

<br />

## 🗨️ 사용 기술

<p>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kakao Share API-FFCD00?style=flat-square&logo=KakaoTalk&logoColor=black"/>
</p>

<br />

## 📋 주요 기능

- 12개의 질문마다 3개의 답변 선택지 제공
- 페이지 상단에 현재 테스트 진행률바 표시
- 답변 데이터를 분석하여 알맞는 결과 도출
- 카카오톡 메시지를 통해 테스트 결과 공유
- 부트스트랩을 사용한 반응형 디자인 작업

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/Twelve-love-type-1889c7cd3b084a5ba8196bf05de98ffb)

### 📍 질문 제공하기

전체 질문지는 외부 파일에 `qnaList` 라는 배열로 미리 정의되어 있습니다.<br />
`goNext` 함수는 인자로 전달 받은 순번에 해당하는 질문지를 화면에 렌더링해주는 함수입니다.<br />
이후 적절한 답변지 제공을 위해 답변 리스트와 질문 순서를 인자로 전달하여 `chooseAnswer`를 호출합니다.

```javascript
const questionBox = document.querySelector('.question-box');
const endPoint = 12; // 총 질문 개수

function goNext(qIndex) {
	if (qIndex === endPoint) {
    resultBtn.style.opacity = 1;
    resultBtn.style.pointerEvents = 'auto';
    resultBtn.addEventListener('click', goResult);
    return;
  }

  questionBox.innerText = `Q. ${qnaList[qIndex].q}`; // 질문 리스트
  for (let i in qnaList[qIndex].a) {
    const answer = qnaList[qIndex].a[i].answer; // 답변 리스트
    chooseAnswer(answer, qIndex, i);
  }
}
```

### 📍 답변 선택하기

`chooseAnswer` 함수는 답변 리스트를 동적으로 생성하여 화면에 렌더링해주는 함수입니다.<br />
최종 결과 도출을 위해서 각각의 답변지마다 해당하는 동물의 유형이 몇 가지 지정되어 있으며,<br />
사용자가 선택한 답변의 `type` 카운트가 1씩 증가되어 `selected` 배열에 담기게 됩니다.

```javascript
const selected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
```

### 📍 테스트 결과 계산하기

`calcResult` 함수는 가장 많은 카운트가 쌓인 동물 유형을 반환해주는 함수입니다.<br />
`selected` 배열에서 최대값을 가지고 있는 원소가 곧 최종 결과라고 볼 수 있겠습니다.

```javascript
function calcResult() {
  const typeResult = selected.indexOf(Math.max(...selected));
  return typeResult;
}
```

<br />

## 😊 배운 점 및 느낀 점

- 프로젝트를 진행하면서 배열을 어떤 식으로 활용할 수 있는지 감을 조금 더 익힐 수 있었습니다.
- 결과 페이지를 더 간단하게 만들어볼 수 있었을 것 같은데 아직 그 방법까지는 생각해내지 못해 아쉽습니다.
- 원하는 의도대로 애니메이션이 동작하지 않아 꽤 애를 먹었습니다. 애니메이션 또한 쉽지 않은 길이라는 걸 느꼈습니다..
- 요소들을 계속 동적으로 생성하다 보니 헷갈리는 부분이 많았습니다. 논리적 사고 능력의 중요성을 다시 한 번 깨달았습니다.
