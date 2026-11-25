/* =========================================================
   1. HTML 요소 가져오기
   ========================================================= */

// 첫 번째 장면
const startButton = document.querySelector("#startButton");
const buttonLayer = document.querySelector("#buttonLayer");
const titleBoard = document.querySelector(".title-board");
const plate = document.querySelector(".plate");
const shrimp = document.querySelector(".shrimp");

// 두 번째 장면
const sceneTwo = document.querySelector("#sceneTwo");
const bubbleOne = document.querySelector(".bubble-one");
const bubbleTwo = document.querySelector(".bubble-two");

// 세 번째, 네 번째 장면
const sceneThree = document.querySelector("#sceneThree");
const sceneFour = document.querySelector("#sceneFour");

// 흰색 전환 화면
const whiteTransition = document.querySelector("#whiteTransition");

// 중복 실행 방지
let isStarted = false;


/* =========================================================
   2. 공통 대기 함수
   ========================================================= */

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


/* =========================================================
   3. 새우튀김 대기 애니메이션
   ========================================================= */

// 시작 전에는 새우튀김이 통통 튀도록 합니다.
shrimp.classList.add("is-idle");


/* =========================================================
   4. 시작하기 버튼 클릭
   ========================================================= */

startButton.addEventListener("click", async () => {

  // 중복 클릭 방지
  if (isStarted) return;
  isStarted = true;

  // 새우튀김 대기 동작 정지
  shrimp.classList.remove("is-idle");

  // 시작 버튼 눌림 효과
  buttonLayer.classList.add("is-pressed");

  // 버튼 클릭 후 0.5초 대기
  await wait(500);

  // 첫 번째 장면의 요소들이 퇴장합니다.
  titleBoard.classList.add("is-exiting");
  plate.classList.add("is-exiting");
  shrimp.classList.add("is-exiting");
  buttonLayer.classList.add("is-exiting");

  // 가장 오래 걸리는 퇴장 애니메이션이 1.25초입니다.
  await wait(1250);

  // 두 번째 장면으로 넘어갑니다.
  await startSceneTwo();

});


/* =========================================================
   5. 두 번째 장면 시작
   ========================================================= */

async function startSceneTwo() {

  /* -----------------------------------------
     STEP 1. 첫 번째 장면 종료 후 1초 대기
     ----------------------------------------- */

  await wait(1000);


  /* -----------------------------------------
     STEP 2. 흰색 화면 페이드 인
     ----------------------------------------- */

  // 흰색 화면 표시 준비
  whiteTransition.classList.add("is-visible");

  // 초기 상태를 브라우저에 적용한 다음 애니메이션 시작
  await new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  // 0.5초 동안 흰색으로 변합니다.
  whiteTransition.classList.add("is-white");

  await wait(500);


  /* -----------------------------------------
     STEP 3. 흰색 화면 0.5초 유지
     ----------------------------------------- */

  await wait(500);


  /* -----------------------------------------
     STEP 4. 두 번째 장면 시작
     ----------------------------------------- */

  // 두 번째 장면 활성화
  sceneTwo.classList.add("is-active");

  // 흰색 화면 페이드 아웃 시작
  whiteTransition.classList.remove("is-white");

  // 흰색 화면이 완전히 사라진 뒤 숨깁니다.
  setTimeout(() => {
    whiteTransition.classList.remove("is-visible");
  }, 500);


  /* -----------------------------------------
     STEP 5. 첫 번째 말풍선 등장
     ----------------------------------------- */

  // 두 번째 장면 시작 1초 후
  await wait(1000);

  bubbleOne.classList.add("show");


  /* -----------------------------------------
     STEP 6. 두 번째 말풍선 등장
     ----------------------------------------- */

  // 첫 번째 말풍선 시작 후 1.5초 대기
  // 즉 두 번째 장면 시작 2.5초 후
  await wait(1500);

  bubbleTwo.classList.add("show");


  /* -----------------------------------------
     STEP 7. 두 번째 말풍선 등장 완료 대기
     ----------------------------------------- */

  // 말풍선 페이드 인 시간 0.6초
  await wait(600);


  /* -----------------------------------------
     STEP 8. 배경과 인물이 2초 더 움직임
     ----------------------------------------- */

  await wait(2000);


  /* -----------------------------------------
     STEP 9. 두 번째 장면 움직임 정지
     ----------------------------------------- */

  // 배경 애니메이션 일시정지
  document.querySelector(".scene2-background")
    .style.animationPlayState = "paused";

  // 인물 애니메이션 일시정지
  document.querySelector(".scene2-character")
    .style.animationPlayState = "paused";


  /* -----------------------------------------
     STEP 10. 정지 상태로 1초 유지
     ----------------------------------------- */

  await wait(1000);


  /* -----------------------------------------
     STEP 11. 세 번째 장면 시작
     ----------------------------------------- */

  await startSceneThree();

}


/* =========================================================
   6. 세 번째 장면 : 안내 화면
   ========================================================= */

async function startSceneThree() {

  /* -----------------------------------------
     STEP 1. 안내 화면이 위에서 내려옵니다.
     ----------------------------------------- */

  sceneThree.classList.add("is-entering");

  // 내려오는 데 0.5초
  await wait(500);


  /* -----------------------------------------
     STEP 2. 안내 화면 10초 유지
     ----------------------------------------- */

  await wait(10000);


  /* -----------------------------------------
     STEP 3. 네 번째 장면 시작
     ----------------------------------------- */

  // 안내 화면이 올라가기 시작하는 순간
  // 네 번째 장면을 활성화합니다.
  startSceneFour();


  /* -----------------------------------------
     STEP 4. 안내 화면이 위로 퇴장
     ----------------------------------------- */

  sceneThree.classList.remove("is-entering");
  sceneThree.classList.add("is-leaving");

}


/* =========================================================
   7. 네 번째 장면 : 수중 게임
   ========================================================= */

function startSceneFour() {

  // 네 번째 장면 활성화
  sceneFour.classList.add("is-active");

  /* -----------------------------------------
     앞으로 추가할 게임 기능
     ----------------------------------------- */

  // 여기에 새우튀김 이미지, 게이지,
  // 버튼 등의 인터랙션을 추가하면 됩니다.

}