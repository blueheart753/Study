const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'images/image-' + point + '.png'
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultdesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeout 1s";
  qna.style.Animation = "fadeout 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadein 1s";
    result.style.Animation = "fadein 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)
  })
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-5');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadein');
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function () {
    var children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeout 0.5s";
      children[i].style.Animation = "fadeout 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = 'none';
        }
        goNext(++qIdx);
      }, 450)
  }, false);
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

function begain() {
  main.style.WebkitAnimation = "fadeout 1s";
  main.style.Animation = "fadeout 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadein 1s";
    qna.style.Animation = "fadein 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}