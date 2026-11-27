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
/* =========================================================
   scene4 / scene5 요소
   ========================================================= */

const gameStage = document.querySelector("#gameStage");

const sceneFour = document.querySelector("#sceneFour");
const sceneFive = document.querySelector("#sceneFive");

const scene4Intro = document.querySelector("#scene4Intro");
const scene4IntroBackdrop = document.querySelector("#scene4IntroBackdrop");
const scene4IntroStart = document.querySelector("#scene4IntroStart");

const scene4PieceBase = document.querySelector("#scene4PieceBase");
const scene4PieceFill = document.querySelector("#scene4PieceFill");

const scene4ArrowLeft = document.querySelector("#scene4ArrowLeft");
const scene4ArrowRight = document.querySelector("#scene4ArrowRight");

const scene4Shrimp = document.querySelector("#scene4Shrimp");
const scene4FoodLayer = document.querySelector("#scene4FoodLayer");
const scene4BubbleLayer = document.querySelector("#scene4BubbleLayer");

const scene4Success = document.querySelector("#scene4Success");
const scene4RewardPiece = document.querySelector("#scene4RewardPiece");

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
  GameAudio.start();
  GameAudio.play("button");

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
  GameAudio.talk(0.95);


  /* -----------------------------------------
     STEP 6. 두 번째 말풍선 등장
     ----------------------------------------- */

  // 첫 번째 말풍선 시작 후 1.5초 대기
  // 즉 두 번째 장면 시작 2.5초 후
  await wait(1500);

  bubbleTwo.classList.add("show");
  GameAudio.talk(0.32);


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

  GameAudio.play("whoosh-in");
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
  GameAudio.play("whoosh-out");
  sceneThree.classList.add("is-leaving");

}


/* =========================================================
   7. 네 번째 장면 : 수중 게임
   ========================================================= */

/* =========================================================
   7. 네 번째 장면 : 수중 게임 시작
   ========================================================= */

function startSceneFour() {

  // 네 번째 장면 보이기
  sceneFour.classList.add("is-active");

  // 상태 초기화
  resetSceneFour();

  // 시작 안내판 버튼 이벤트는 한 번만 연결
  if (!scene4IntroStart.dataset.bound) {
    scene4IntroStart.addEventListener("click", closeScene4IntroAndStartGame);
    scene4IntroStart.dataset.bound = "true";
  }

  if (!scene4ArrowLeft.dataset.bound) {
    scene4ArrowLeft.addEventListener("click", () => moveShrimp(-1));
    scene4ArrowLeft.dataset.bound = "true";
  }

  if (!scene4ArrowRight.dataset.bound) {
    scene4ArrowRight.addEventListener("click", () => moveShrimp(1));
    scene4ArrowRight.dataset.bound = "true";
  }

  // 키보드 방향키도 가능하게
  if (!window.scene4KeyBound) {
    window.addEventListener("keydown", (event) => {
      if (!scene4State.controlsEnabled) return;

      if (event.key === "ArrowLeft") {
        moveShrimp(-1);
      }

      if (event.key === "ArrowRight") {
        moveShrimp(1);
      }
    });

    window.scene4KeyBound = true;
  }
}
/* =========================================================
   scene4 상태값
   ========================================================= */

const scene4State = {
  laneCenters: [10, 30, 50, 70, 90], // 5등분 중앙값
  currentLane: 2,                    // 가운데 레일에서 시작
  laneStepPercent: 20,               // 레일 한 칸 이동량
  gameStarted: false,
  controlsEnabled: false,
  introClosed: false,
  foodEaten: 0,
  maxFood: 5,
  foodSpawnTimer: null,
  bubbleSpawnTimer: null,
  loopId: null,
  foods: [],
  bubbles: [],
  gameEnded: false
};

/* =========================================================
   scene4 초기화
   ========================================================= */

function resetSceneFour() {

  // 기존 타이머와 애니메이션 정리
  clearTimeout(scene4State.foodSpawnTimer);
  clearTimeout(scene4State.bubbleSpawnTimer);
  cancelAnimationFrame(scene4State.loopId);

  // 게임 상태 초기화
  scene4State.currentLane = 2;
  scene4State.gameStarted = false;
  scene4State.controlsEnabled = false;
  scene4State.introClosed = false;
  scene4State.foodEaten = 0;
  scene4State.foods = [];
  scene4State.bubbles = [];
  scene4State.gameEnded = false;

  scene4FoodLayer.innerHTML = "";
  scene4BubbleLayer.innerHTML = "";

  // 안내판 초기화
  scene4Intro.classList.remove("is-leaving");
  scene4Intro.style.removeProperty("opacity");
  scene4Intro.style.removeProperty("transform");

  // 뿌연 배경 초기화
  scene4IntroBackdrop.classList.remove("is-fading");
  scene4IntroBackdrop.style.removeProperty("opacity");

  // 피스와 게이지 초기화
  scene4PieceBase.src = "images/scene4/0piece.png";
  updateScene4EatGauge();

  // 성공 이미지 초기화
  scene4Success.classList.remove("is-show");
  scene4Success.style.opacity = "0";

  // 보상 피스 초기화
  scene4RewardPiece.classList.remove("is-pop", "is-to-slot");
  scene4RewardPiece.style.opacity = "0";
  scene4RewardPiece.style.removeProperty("transform");

  // 새우 가운데 레일로 배치
  updateShrimpLanePosition();

  // 시작 전 화살표 비활성화
  scene4ArrowLeft.disabled = true;
  scene4ArrowRight.disabled = true;
}
/* =========================================================
   scene4 안내판 닫기 + 게임 시작
   ========================================================= */

async function closeScene4IntroAndStartGame() {

  if (scene4State.introClosed) return;

  scene4State.introClosed = true;

  // 안내판 위로 퇴장
  scene4Intro.classList.add("is-leaving");
  GameAudio.play("button");

  // 뿌연 배경 서서히 사라짐
  scene4IntroBackdrop.classList.add("is-fading");

  // 안내판 퇴장 완료 대기
  await wait(550);

  // 안내판 클릭 영역 완전히 비활성화
  scene4Intro.style.pointerEvents = "none";

  // 게임 시작
  scene4State.gameStarted = true;
  scene4State.controlsEnabled = true;

  // 화살표 조작 허용
  scene4ArrowLeft.disabled = false;
  scene4ArrowRight.disabled = false;

  // 게임 애니메이션 시작
  startScene4Loop();

  // 먹이와 물방울 생성 시작
  scheduleNextFood();
  scheduleNextBubble();
}
/* =========================================================
   새우 이동
   ========================================================= */

function moveShrimp(direction) {

  if (!scene4State.controlsEnabled) return;

  const nextLane = scene4State.currentLane + direction;

  // 맨 끝 레일에서는 화면 밖으로 나가지 않음
  if (nextLane < 0 || nextLane > 4) return;

  scene4State.currentLane = nextLane;
  updateShrimpLanePosition();
}

function updateShrimpLanePosition() {
  const offset = (scene4State.currentLane - 2) * scene4State.laneStepPercent;
  scene4Shrimp.style.transform = `translateX(${offset}%)`;
}
/* =========================================================
   먹이 게이지 채우기
   ========================================================= */

function updateScene4EatGauge() {

  const count = Math.min(scene4State.foodEaten, 5);

  // eatdia.png의 실제 다이아 위치에 맞춘 경계값
  const rightInsets = [
    100,  // 0개
    57.1, // 1개
    52.6, // 2개
    48.1, // 3개
    43.6, // 4개
    38.8  // 5개
  ];

  if (count === 0) {
    scene4PieceFill.style.clipPath = "inset(0 100% 0 0)";
  } else {
    scene4PieceFill.style.clipPath =
      `inset(0 ${rightInsets[count]}% 0 38.6%)`;
  }
}
/* =========================================================
   다이아 먹이 생성
   ========================================================= */

function scheduleNextFood() {
  if (!scene4State.gameStarted || scene4State.gameEnded) return;

  const delay = 1500 + Math.random() * 800;

  scene4State.foodSpawnTimer = setTimeout(() => {
    spawnScene4Food();
    scheduleNextFood();
  }, delay);
}
function spawnScene4Food() {
  if (scene4State.gameEnded) return;

  const availableLanes = [0, 1, 2, 3, 4].filter(
    lane => lane !== scene4State.currentLane
  );
  const lane = availableLanes[
    Math.floor(Math.random() * availableLanes.length)
  ];
  const xPercent = scene4State.laneCenters[lane];

  const element = document.createElement("div");
  element.className = "scene4-food";
  element.style.left = `${xPercent}%`;
  element.style.top = "0px";
  scene4FoodLayer.appendChild(element);

  scene4State.foods.push({
    element,
    lane,
    xPercent,
    // Y 위치를 화면 높이의 비율로 보관해 창 크기가 달라져도 점프하지 않습니다.
    yRatio: -80 / 720,
    // 기준 화면(높이 720px)에서 프레임당 3.2px에 해당하는 속도.
    // 실제 이동량은 현재 화면 높이에 비례합니다.
    speed: 3.2,
    caught: false
  });
}
/* =========================================================
   물방울 생성
   ========================================================= */

function scheduleNextBubble() {
  if (!scene4State.gameStarted) return;

  const delay = 250 + Math.random() * 300;

  scene4State.bubbleSpawnTimer = setTimeout(() => {
    spawnScene4Bubble();
    scheduleNextBubble();
  }, delay);
}

function spawnScene4Bubble() {
  const element = document.createElement("div");
  element.className = "scene4-bubble";

  const size = 4 + Math.random() * 8;
  const alpha = 0.5 + Math.random() * 0.3;
  const speed = 160 + Math.random() * 110; // 초당 이동 거리(px)
  const distance = sceneFour.clientHeight + 60;

  element.style.setProperty("--bubble-size", `${size}px`);
  element.style.setProperty("--bubble-alpha", alpha.toFixed(2));
  element.style.setProperty("--bubble-distance", `${distance}px`);
  element.style.setProperty("--bubble-duration", `${distance / speed}s`);
  element.style.left = `${8 + Math.random() * 84}%`;
  element.style.top = "-20px";

  // CSS 애니메이션에 이동을 맡기고, 종료된 물방울은 정리합니다.
  element.addEventListener("animationend", () => element.remove(), { once: true });
  scene4BubbleLayer.appendChild(element);
}
/* =========================================================
   scene4 메인 루프
   ========================================================= */

function startScene4Loop() {
  cancelAnimationFrame(scene4State.loopId);

  let lastTime = 0;

  function loop(currentTime) {
    if (!scene4State.gameStarted || scene4State.gameEnded) return;

    const delta = lastTime ? Math.min(currentTime - lastTime, 50) / 16.67 : 1;
    lastTime = currentTime;

    // 시작할 때의 높이를 저장하지 않고 매 프레임 현재 높이를 사용합니다.
    // 작은 화면에서 시작해 크게 바꿔도 이동 속도와 충돌 높이가 같이 보정됩니다.
    updateScene4Foods(delta, sceneFour.clientHeight);
    scene4State.loopId = requestAnimationFrame(loop);
  }

  scene4State.loopId = requestAnimationFrame(loop);
}
/* =========================================================
   다이아 먹이 업데이트: 화면 비율 기준 위치 + 충돌 판정
   ========================================================= */

function updateScene4Foods(delta, sceneHeight) {
  if (scene4State.gameEnded || !sceneHeight) return;

  // 새우 머리가 있는 세로 위치(화면 높이에 대한 비율).
  const catchYRatio = 0.30;
  // 창 크기나 프레임 간격에 따라 접촉이 누락되지 않도록 여유를 줍니다.
  const catchRangeRatio = 0.055;

  for (let i = scene4State.foods.length - 1; i >= 0; i--) {
    const food = scene4State.foods[i];
    if (!food || food.caught) continue;

    const previousYRatio = food.yRatio;
    // 화면 높이 720px 기준 속도를 화면 비율로 변환.
    food.yRatio += food.speed * delta / 720;
    food.element.style.transform =
      `translate(-50%, ${food.yRatio * sceneHeight}px)`;

    const headLow = catchYRatio - catchRangeRatio;
    const headHigh = catchYRatio + catchRangeRatio;
    // 이동 구간 전체가 머리의 충돌 영역을 통과하는지 검사합니다.
    const crossesHead = previousYRatio <= headHigh && food.yRatio >= headLow;

    if (food.lane === scene4State.currentLane && crossesHead) {
      food.caught = true;
      food.element.classList.add("is-caught");
      setTimeout(() => food.element.remove(), 280);
      scene4State.foods.splice(i, 1);
      handleScene4FoodCatch();
      continue;
    }

    if (food.yRatio > 1.12) {
      food.element.remove();
      scene4State.foods.splice(i, 1);
    }
  }
}
/* =========================================================
   다이아 먹이 먹었을 때
   ========================================================= */

function handleScene4FoodCatch() {

  // 이미 성공했다면 더 이상 카운트하지 않음
  if (scene4State.gameEnded) return;

  // 다섯 개 이상 먹지 않도록 제한
  if (scene4State.foodEaten >= 5) return;

  // 정확히 하나씩 증가
  scene4State.foodEaten += 1;
  GameAudio.play("eat");

  // 화면 아래쪽 다이아 채우기
  updateScene4EatGauge();

  // 현재 먹은 개수 확인
  console.log("먹은 다이아:", scene4State.foodEaten, "/ 5");

  // 정확히 5개를 먹어야 성공
  if (scene4State.foodEaten === 5) {

    finishScene4Game();

  }
}
/* =========================================================
   scene4 클리어
   ========================================================= */

async function finishScene4Game() {
  if (scene4State.gameEnded) return;
  scene4State.gameEnded = true;
  scene4State.controlsEnabled = false;
  scene4ArrowLeft.disabled = true;
  scene4ArrowRight.disabled = true;
  scene4State.currentLane = 2;
  updateShrimpLanePosition();
  clearTimeout(scene4State.foodSpawnTimer);
  scene4State.foods.forEach(food => food.element.remove());
  scene4State.foods = [];

  // 큰 보석 -> 게이지 획득 -> 성공 이미지 -> 다음 장면
  scene4RewardPiece.classList.remove("is-pop", "is-to-slot");
  scene4RewardPiece.style.opacity = "1";
  void scene4RewardPiece.offsetWidth;
  scene4RewardPiece.classList.add("is-pop");
  GameAudio.play("gem");
  await wait(650);
  setScene4RewardTarget();
  scene4RewardPiece.classList.remove("is-pop");
  void scene4RewardPiece.offsetWidth;
  scene4RewardPiece.classList.add("is-to-slot");
  await wait(760);
  scene4PieceBase.src = "images/scene4/1piece.png";
  await wait(350);
  scene4Success.classList.remove("is-show");
  void scene4Success.offsetWidth;
  scene4Success.classList.add("is-show");
  GameAudio.play("win");
  await wait(2000);
  await transitionToSceneFive();
}
/* =========================================================
   reward piece가 0piece의 보석 위치로 날아갈 좌표
   ========================================================= */

function setScene4RewardTarget() {

  // 화면 중앙 기준에서 오른쪽 위의 보석 쪽으로 이동
  const stageRect = gameStage.getBoundingClientRect();

  // 대략 0piece의 보석 위치
  const targetX = (stageRect.width * 0.745) - (stageRect.width / 2);
  const targetY = (stageRect.height * 0.085) - (stageRect.height / 2);

  scene4RewardPiece.style.setProperty("--piece-target-x", `${targetX}px`);
  scene4RewardPiece.style.setProperty("--piece-target-y", `${targetY}px`);
}
/* =========================================================
   scene5로 전환
   ========================================================= */

async function transitionToSceneFive() {

  // 흰색 화면 페이드 인
  whiteTransition.classList.add("is-visible");

  await new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  whiteTransition.classList.add("is-white");

  await wait(500);

  // 게임 화면 밖에서도 돌아가던 루프와 물방울 생성 중지
  scene4State.gameStarted = false;
  clearTimeout(scene4State.foodSpawnTimer);
  clearTimeout(scene4State.bubbleSpawnTimer);
  cancelAnimationFrame(scene4State.loopId);
  scene4BubbleLayer.replaceChildren();

  // 다음 장면 보이기
  sceneFive.classList.add("is-active");
  prepareSceneFive();

  // 흰색 화면 페이드 아웃
  whiteTransition.classList.remove("is-white");

  setTimeout(() => {
    whiteTransition.classList.remove("is-visible");
  }, 500);
}
/* =========================================
   버튼 이미지 호버 시 교체
   ========================================= */

// 시작 안내판
const introImage = document.querySelector(".scene4-intro-panel");

scene4IntroStart.addEventListener("mouseenter", () => {
  introImage.src = "images/scene4/y1button.png";
});

scene4IntroStart.addEventListener("mouseleave", () => {
  introImage.src = "images/scene4/1button.png";
});

// 좌우 화살표
const arrowsImage = document.querySelector(".scene4-arrows");

scene4ArrowLeft.addEventListener("mouseenter", () => {
  arrowsImage.src = "images/scene4/leftyarrows.png";
});

scene4ArrowLeft.addEventListener("mouseleave", () => {
  arrowsImage.src = "images/scene4/arrows.png";
});

scene4ArrowRight.addEventListener("mouseenter", () => {
  arrowsImage.src = "images/scene4/rightyarrows.png";
});

scene4ArrowRight.addEventListener("mouseleave", () => {
  arrowsImage.src = "images/scene4/arrows.png";
});

/* =========================================================
   SCENE 5: 장갑 -> 새우1 -> 용기 -> 새우2 -> 비닐 -> 포장 클릭
   ========================================================= */
const sceneSix = document.querySelector("#sceneSix");
const scene5Gloves = document.querySelector("#scene5Gloves");
const scene5Package = document.querySelector("#scene5Package");
const scene5Bag = document.querySelector("#scene5Bag");
const scene5Shrimp = document.querySelector("#scene5Shrimp");
const scene5Held = document.querySelector("#scene5Held");
const scene5Gauge = document.querySelector("#scene5Gauge");
const scene5Highlight = document.querySelector("#scene5Highlight");
const scene5Target = document.querySelector("#scene5Target");
const scene5Packed = document.querySelector("#scene5Packed");
const scene5Reward = document.querySelector("#scene5Reward");
const scene5Success = document.querySelector("#scene5Success");
const scene5Panel = document.querySelector("#scene5Panel");
const scene5Start = document.querySelector("#scene5Start");
const scene5IntroBackdrop = document.querySelector("#scene5IntroBackdrop");

const scene5Path = (name) => `images/scene5/${name}.png`;
// 원본 이미지는 1921x1081 전체 캔버스. hit 영역/손잡이 위치도 이 좌표계.
const scene5Steps = [
  {name:"gloves", src:"ygloves", rect:[122,441,424,766]},
  {name:"shrimp1", src:"yshrimp1", rect:[408,504,1244,916]},
  {name:"package", src:"ypackage", rect:[1249,475,1530,628]},
  {name:"shrimp2", src:"yshrimp2", rect:[906,460,1015,994]},
  {name:"bag", src:"ybag", rect:[1527,465,1864,623]},
  {name:"packed", src:"ypacked", rect:[420,472,1501,984]}
];
const scene5State = {step:-1, busy:false, held:null};

// 미리 다음에 보일 이미지를 준비하여 Safari에서 첫 교체 시 멈춤 완화
[
  "panel","ypanel","frame2","gloves","ygloves","package","ypackage",
  "bag","ybag","shrimp1","yshrimp1","shrimp2","yshrimp2",
  "packed","ypacked","sealed","piece","1piece","2piece","3piece","success"
].forEach(name => { const img = new Image(); img.src = scene5Path(name); });
const scene6Preload = new Image();
scene6Preload.src = "images/scene6/background6.png";

function prepareSceneFive() {
  scene5State.step = -1;
  scene5State.busy = false;
  scene5State.held = null;
  scene5Panel.src = scene5Path("panel");
  scene5Start.classList.remove("is-hidden");
  scene5IntroBackdrop.classList.remove("is-fading");
  scene5Panel.classList.remove("is-leaving");
  scene5Target.classList.remove("is-active");
  scene5Highlight.classList.remove("is-blinking","is-hovered");
  scene5Highlight.style.opacity = "0";
}

scene5Start.addEventListener("pointerenter", () => {
  scene5Panel.src = scene5Path("ypanel");
});
scene5Start.addEventListener("pointerleave", () => {
  scene5Panel.src = scene5Path("panel");
});
scene5Start.addEventListener("click", async () => {
  if (scene5State.step !== -1 || scene5State.busy) return;
  scene5State.busy = true;
  scene5Start.classList.add("is-hidden");
  GameAudio.play("button");
  scene5Panel.classList.add("is-leaving");
  scene5IntroBackdrop.classList.add("is-fading");
  await wait(560);
  scene5Panel.style.display = "none";
  scene5IntroBackdrop.style.display = "none";
  scene5State.busy = false;
  setScene5Step(0);
});

function setScene5Step(step) {
  scene5State.step = step;
  if (step < 0 || step >= scene5Steps.length) {
    scene5Target.classList.remove("is-active");
    scene5Highlight.classList.remove("is-blinking", "is-hovered");
    return;
  }
  const active = scene5Steps[step];
  const [x1,y1,x2,y2] = active.rect;
  scene5Highlight.src = scene5Path(active.src);
  scene5Highlight.style.opacity = "";
  scene5Highlight.classList.remove("is-hovered","is-blinking");
  void scene5Highlight.offsetWidth;
  scene5Highlight.classList.add("is-blinking");
  scene5Target.style.left = `${x1 / 1921 * 100}%`;
  scene5Target.style.top = `${y1 / 1081 * 100}%`;
  scene5Target.style.width = `${(x2 - x1) / 1921 * 100}%`;
  scene5Target.style.height = `${(y2 - y1) / 1081 * 100}%`;
  scene5Target.classList.add("is-active");
}

scene5Target.addEventListener("pointerenter", () => {
  scene5Highlight.classList.add("is-hovered");
});
scene5Target.addEventListener("pointerleave", () => {
  scene5Highlight.classList.remove("is-hovered");
});

// 잡은 도구는 원본 위치에서 사라지고, frame2 + 게이지 뒤쪽을 따라다님
function scene5Grab(name, original) {
  GameAudio.play("pickup");
  original.style.visibility = "hidden";
  scene5State.held = {name};
  scene5Held.src = scene5Path(name);
  scene5Held.classList.add("is-visible");
  // 클릭 순간부터 포인터 위치로 이동
  const last = scene5Pointer;
  if (last) scene5MoveHeld(last.clientX, last.clientY);
}
function scene5Drop(original) {
  GameAudio.play("place");
  scene5State.held = null;
  scene5Held.classList.remove("is-visible");
  scene5Held.style.transform = "";
  if (original) original.style.visibility = "visible";
}
let scene5Pointer = null;
const scene5Anchors = {gloves:[273,603],package:[1390,550],bag:[1696,544]};
function scene5MoveHeld(x,y) {
  if (!scene5State.held) return;
  const rect = sceneFive.getBoundingClientRect();
  const anchor = scene5Anchors[scene5State.held.name];
  const dx = x - rect.left - anchor[0]/1921*rect.width;
  const dy = y - rect.top - anchor[1]/1081*rect.height;
  scene5Held.style.transform = `translate3d(${dx}px,${dy}px,0)`;
}
// pointermove는 초당 프레임당 최대 1회만 DOM 갱신
let scene5PointerFrame = 0;
sceneFive.addEventListener("pointermove", e => {
  scene5Pointer = {clientX:e.clientX,clientY:e.clientY};
  if (!scene5State.held || scene5PointerFrame) return;
  scene5PointerFrame = requestAnimationFrame(() => {
    scene5PointerFrame = 0;
    if (scene5Pointer) scene5MoveHeld(scene5Pointer.clientX,scene5Pointer.clientY);
  });
});

scene5Target.addEventListener("click", async (e) => {
  if (scene5State.busy) return;
  scene5Pointer = {clientX:e.clientX,clientY:e.clientY};
  const step = scene5State.step;
  if (step === 0) {
    scene5Grab("gloves",scene5Gloves);
    setScene5Step(1);
  } else if (step === 1) {
    scene5Drop(scene5Gloves);
    scene5Shrimp.src = scene5Path("shrimp2");
    setScene5Step(2);
  } else if (step === 2) {
    scene5Grab("package",scene5Package);
    setScene5Step(3);
  } else if (step === 3) {
    scene5Drop(scene5Package);
    scene5Shrimp.style.visibility = "hidden";
    scene5Packed.src = scene5Path("packed");
    scene5Packed.classList.add("is-visible");
    scene5State.busy = true;
    setScene5Step(6); // 보석이 획득될 때까지 클릭 잠금
    await scene5GainReward("2piece");
    scene5State.busy = false;
    setScene5Step(4);
  } else if (step === 4) {
    scene5Grab("bag",scene5Bag);
    setScene5Step(5);
  } else if (step === 5) {
    scene5Drop(scene5Bag);
    scene5Packed.src = scene5Path("sealed");
    scene5State.busy = true;
    setScene5Step(6);
    await scene5GainReward("3piece");
    scene5Success.classList.remove("is-show");
    void scene5Success.offsetWidth;
    scene5Success.classList.add("is-show");
    GameAudio.play("win");
    await wait(2000);
    await transitionToSceneSix();
  }
});

async function scene5GainReward(gaugeFile) {
  GameAudio.play("gem");
  scene5Reward.classList.remove("is-pop","is-to-slot");
  scene5Reward.style.opacity = "1";
  void scene5Reward.offsetWidth;
  scene5Reward.classList.add("is-pop");
  await wait(650);
  const rect = sceneFive.getBoundingClientRect();
  // 보상 피스 중심(960,540)에서 게이지의 다음 보석 슬롯으로
  const slotX = gaugeFile === "2piece" ? 1610 : 1705;
  const targetX = (slotX - 960)/1921 * rect.width;
  const targetY = (104 - 540)/1081 * rect.height;
  scene5Reward.style.setProperty("--piece-target-x",`${targetX}px`);
  scene5Reward.style.setProperty("--piece-target-y",`${targetY}px`);
  scene5Reward.classList.remove("is-pop");
  void scene5Reward.offsetWidth;
  scene5Reward.classList.add("is-to-slot");
  await wait(760);
  scene5Gauge.src = scene5Path(gaugeFile);
  scene5Reward.classList.remove("is-to-slot");
  scene5Reward.style.opacity = "0";
  await wait(350);
}

async function transitionToSceneSix() {
  whiteTransition.classList.add("is-visible");
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  whiteTransition.classList.add("is-white");
  await wait(500);
  sceneSix.classList.add("is-active");
  startSceneSix();
  whiteTransition.classList.remove("is-white");
  setTimeout(() => whiteTransition.classList.remove("is-visible"), 500);
}

/* =========================================================
   SCENE 6: 소금 -> 새우 -> 소금친 새우 -> 튀김가루 -> SCENE 7
   모든 이미지는 1921×1081 전체 레이어로 합성하며 CSS 크기 축소 없음.
   ========================================================= */
const sceneSeven = document.querySelector("#sceneSeven");
const scene6Board = document.querySelector("#scene6Board");
const scene6Shrimp = document.querySelector("#scene6Shrimp");
const scene6Salt = document.querySelector("#scene6Salt");
const scene6Fry = document.querySelector("#scene6Fry");
const scene6Highlight = document.querySelector("#scene6Highlight");
const scene6Held = document.querySelector("#scene6Held");
const scene6Reward = document.querySelector("#scene6Reward");
const scene6Gauge = document.querySelector("#scene6Gauge");
const scene6Target = document.querySelector("#scene6Target");
const scene6IntroBackdrop = document.querySelector("#scene6IntroBackdrop");
const scene6Panel = document.querySelector("#scene6Panel");
const scene6Start = document.querySelector("#scene6Start");
const scene6Path = name => `images/scene6/${name}.png`;
const scene6State = {step:-1,busy:false,held:null,lastPointer:null};
const scene6Steps = [
  {name:"salt",src:"ysalt",rect:[84,564,327,922]},
  {name:"shrimp",src:"yshrimp2",rect:[906,460,1015,994]},
  {name:"salted",src:"ysaltshrimp",rect:[807,486,1110,961]},
  {name:"fry",src:"yfry",rect:[1500,314,1921,622]}
];
const scene6Anchors = {salt:[205,744],salted:[1002,725]};
["panel","ypanel","frame6","3piece","4piece","doma","domas","salt","ysalt","fry","yfry","shrimp2","yshrimp2","saltshrimp","ysaltshrimp","holdsaltshrimp","fryshrimp","piece"].forEach(name=>{
  const img = new Image(); img.src=scene6Path(name);
});
const preload7 = new Image();preload7.src="images/scene7/background7.png";
function startSceneSix(){
  scene6State.step=-1;scene6State.busy=false;scene6State.held=null;
  scene6Board.src=scene6Path("doma");
  scene6Shrimp.src=scene6Path("shrimp2");scene6Shrimp.style.visibility="visible";
  scene6Shrimp.style.transform="";
  scene6Salt.style.visibility="visible";scene6Fry.style.visibility="visible";
  scene6Gauge.src=scene6Path("3piece");
  scene6Panel.src=scene6Path("panel");
  scene6Panel.classList.remove("is-leaving");scene6Panel.style.display="";
  scene6Start.classList.remove("is-hidden");
  scene6IntroBackdrop.style.display="";scene6IntroBackdrop.classList.remove("is-fading");
  scene6Highlight.className="scene6-full scene6-highlight";scene6Highlight.style.opacity="0";
  scene6Target.classList.remove("is-active");
  scene6Held.classList.remove("is-visible","is-sprinkling");scene6Held.style.transform="";
  scene6Reward.classList.remove("is-pop","is-to-slot");scene6Reward.style.opacity="0";
}
scene6Start.addEventListener("pointerenter",()=>{scene6Panel.src=scene6Path("ypanel");});
scene6Start.addEventListener("pointerleave",()=>{scene6Panel.src=scene6Path("panel");});
scene6Start.addEventListener("click",async()=>{
  if(scene6State.step!==-1||scene6State.busy)return;
  scene6State.busy=true;
  scene6Start.classList.add("is-hidden");
  GameAudio.play("button");
  scene6Panel.classList.add("is-leaving");
  scene6IntroBackdrop.classList.add("is-fading");
  await wait(560);
  scene6Panel.style.display="none";scene6IntroBackdrop.style.display="none";
  scene6State.busy=false;setScene6Step(0);
});
function setScene6Step(step){
  scene6State.step=step;
  scene6Highlight.classList.remove("is-blinking","is-hovered");
  scene6Target.classList.remove("is-active");
  if(step<0||step>=scene6Steps.length)return;
  const next=scene6Steps[step];const [x1,y1,x2,y2]=next.rect;
  scene6Highlight.src=scene6Path(next.src);scene6Highlight.style.opacity="";
  void scene6Highlight.offsetWidth;
  scene6Highlight.classList.add("is-blinking");
  scene6Target.style.left=`${x1/1921*100}%`;
  scene6Target.style.top=`${y1/1081*100}%`;
  scene6Target.style.width=`${(x2-x1)/1921*100}%`;
  scene6Target.style.height=`${(y2-y1)/1081*100}%`;
  scene6Target.classList.add("is-active");
}
scene6Target.addEventListener("pointerenter",()=>scene6Highlight.classList.add("is-hovered"));
scene6Target.addEventListener("pointerleave",()=>scene6Highlight.classList.remove("is-hovered"));
function scene6MoveHeld(clientX,clientY){
  if(!scene6State.held)return;
  const rect=sceneSix.getBoundingClientRect();
  const anchor=scene6Anchors[scene6State.held];
  const dx=clientX-rect.left-anchor[0]/1921*rect.width;
  const dy=clientY-rect.top-anchor[1]/1081*rect.height;
  scene6Held.style.transform=`translate3d(${dx}px,${dy}px,0)`;
}
let scene6PointerFrame=0;
sceneSix.addEventListener("pointermove",e=>{
  scene6State.lastPointer={clientX:e.clientX,clientY:e.clientY};
  if(!scene6State.held||scene6PointerFrame)return;
  scene6PointerFrame=requestAnimationFrame(()=>{
    scene6PointerFrame=0;
    if(scene6State.lastPointer)scene6MoveHeld(scene6State.lastPointer.clientX,scene6State.lastPointer.clientY);
  });
});
function scene6Grab(src,held,source){
  GameAudio.play("pickup");
  source.style.visibility="hidden";
  scene6State.held=held;
  scene6Held.src=scene6Path(src);
  scene6Held.style.transition="none";
  scene6Held.style.transformOrigin="10.7% 69%";
  scene6Held.classList.add("is-visible");
  if(scene6State.lastPointer)scene6MoveHeld(scene6State.lastPointer.clientX,scene6State.lastPointer.clientY);
}
function scene6Drop(){scene6State.held=null;scene6Held.style.transition="none";scene6Held.classList.remove("is-visible","is-sprinkling");scene6Held.style.transform="";}
scene6Target.addEventListener("click",async e=>{
  if(scene6State.busy)return;
  scene6State.lastPointer={clientX:e.clientX,clientY:e.clientY};
  if(scene6State.step===0){
    scene6Grab("salt","salt",scene6Salt);
    setScene6Step(1);
  }else if(scene6State.step===1){
    scene6State.busy=true;scene6State.held=null;setScene6Step(4);
    const rect=sceneSix.getBoundingClientRect();
    // 소금통을 새우보다 충분히 높은 곳(960,385)으로 옮깁니다.
    const dx=(960-205)/1921*rect.width, dy=(385-744)/1081*rect.height;
    scene6Held.style.transformOrigin="10.7% 69%";
    scene6Held.style.transition="transform .62s cubic-bezier(.22,.61,.36,1)";
    scene6Held.style.transform=`translate3d(${dx}px,${dy}px,0) rotate(175deg)`;
    await wait(480);
    scene6Held.style.setProperty("--salt-dx",`${dx}px`);
    scene6Held.style.setProperty("--salt-dy",`${dy}px`);
    scene6Held.classList.add("is-sprinkling");
    GameAudio.play("salt");
    await wait(760);
    scene6Held.classList.remove("is-sprinkling");
    scene6Board.src=scene6Path("domas");
    scene6Shrimp.src=scene6Path("saltshrimp");
    scene6Held.style.transition="transform .45s ease";
    scene6Held.style.transform="translate3d(0,0,0)";
    await wait(470);
    scene6Drop();scene6Salt.style.visibility="visible";
    await scene6GainReward();
    scene6State.busy=false;setScene6Step(2);
  }else if(scene6State.step===2){
    scene6Grab("holdsaltshrimp","salted",scene6Shrimp);
    setScene6Step(3);
  }else if(scene6State.step===3){
    scene6State.busy=true;scene6State.held=null;setScene6Step(4);
    const rect=sceneSix.getBoundingClientRect();
    const dx=(1670-1002)/1921*rect.width,dy=(465-725)/1081*rect.height;
    GameAudio.play("place");
    GameAudio.play("fry");
    scene6Held.style.transition="transform .38s ease";
    scene6Held.style.transform=`translate3d(${dx}px,${dy}px,0)`;
    await wait(390);

    // 튀김옷 입힌 새우 이미지 자체를 용기 쪽에서 중앙으로 천천히 이동.
    // 전체 화면 투명 PNG이므로 레이어의 위치만 이동해야 크기가 맞습니다.
    const startX=(1670-960)/1921*rect.width;
    const startY=(465-540)/1081*rect.height;
    scene6Held.style.transition="none";
    scene6Held.src=scene6Path("fryshrimp");
    scene6Held.style.transform=`translate3d(${startX}px,${startY}px,0)`;
    void scene6Held.offsetWidth;
    scene6Held.style.transition="transform 1.05s cubic-bezier(.22,.61,.36,1)";
    scene6Held.style.transform="translate3d(0,0,0)";
    await wait(1080);

    // 중앙 도착 후 고정 이미지로 교체 (겹침/순간이동 방지)
    scene6Shrimp.src=scene6Path("fryshrimp");
    scene6Shrimp.style.visibility="visible";
    scene6Shrimp.style.transform="";
    scene6Drop();
    await wait(350);
    await transitionToSceneSeven();
  }
});
async function scene6GainReward(){
  GameAudio.play("gem");
  scene6Reward.classList.remove("is-pop","is-to-slot");
  scene6Reward.style.opacity="1";void scene6Reward.offsetWidth;
  scene6Reward.classList.add("is-pop");
  await wait(650);
  const rect=sceneSix.getBoundingClientRect();
  const dx=(1610-960)/1921*rect.width,dy=(105-540)/1081*rect.height;
  scene6Reward.style.setProperty("--piece-target-x",`${dx}px`);
  scene6Reward.style.setProperty("--piece-target-y",`${dy}px`);
  scene6Reward.classList.remove("is-pop");void scene6Reward.offsetWidth;
  scene6Reward.classList.add("is-to-slot");
  await wait(760);
  scene6Gauge.src=scene6Path("4piece");
  scene6Reward.classList.remove("is-to-slot");scene6Reward.style.opacity="0";
  await wait(350);
}
async function transitionToSceneSeven(){
  whiteTransition.classList.add("is-visible");
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  whiteTransition.classList.add("is-white");
  await wait(500);
  sceneSeven.classList.add("is-active");
  sceneSix.classList.remove("is-active");
  startSceneSeven();
  whiteTransition.classList.remove("is-white");
  await wait(500);
  whiteTransition.classList.remove("is-visible");
}

/* =========================================================
   SCENE 7: 기름 통 -> 집게 -> 끓는 기름 -> 접시 -> 완료 -> SCENE 8
   ========================================================= */
const sceneEight = document.querySelector("#sceneEight");
const scene7Oil = document.querySelector("#scene7Oil");
const scene7BubbleLayer = document.querySelector("#scene7BubbleLayer");
const scene7Glow = document.querySelector("#scene7Glow");
const scene7Shrimp = document.querySelector("#scene7Shrimp");
const scene7HoldShrimp = document.querySelector("#scene7HoldShrimp");
const scene7Plate = document.querySelector("#scene7Plate");
const scene7Hold = document.querySelector("#scene7Hold");
const scene7Highlight = document.querySelector("#scene7Highlight");
const scene7Held = document.querySelector("#scene7Held");
const scene7Reward = document.querySelector("#scene7Reward");
const scene7Done = document.querySelector("#scene7Done");
const scene7Confetti = document.querySelector("#scene7Confetti");
const scene7Gauge = document.querySelector("#scene7Gauge");
const scene7Target = document.querySelector("#scene7Target");
const scene7Path = name => `images/scene7/${name}.png`;
const scene8Background = new Image();
scene8Background.src = "images/scene8/background8.png";
const scene7State = {
  step: -1,
  busy: false,
  held: null,
  lastPointer: null,
  bubbleTimer: 0,
  bubbleLive: false,
  confettiTimer: 0,
  confettiLive: false
};
const scene7Steps = [
  { name: "oil", src: "yoil", rect: [609,381,1317,1081] },
  { name: "hold", src: "yhold", rect: [1401,529,1837,953] },
  { name: "boil", src: "yboil", rect: [609,381,1317,1081] }
];
const scene7Anchors = { hold: [1660, 820] };
[
  "background7","frame6","4piece","oil","yoil","hold","yhold","fryshrimp","boil",
  "boil2","yboil","holdshrimp","plate","shrimp","piece","5piece","done"
].forEach(name => { const img = new Image(); img.src = scene7Path(name); });

function startSceneSeven(){
  scene7State.step = -1;
  scene7State.busy = false;
  scene7State.held = null;
  scene7State.lastPointer = null;
  stopScene7Bubbles();
  stopScene7Confetti();
  scene7Oil.src = scene7Path("oil");
  scene7Shrimp.src = scene7Path("fryshrimp");
  scene7Shrimp.style.visibility = "visible";
  scene7Shrimp.style.opacity = "1";
  scene7HoldShrimp.style.opacity = "0";
  scene7Plate.classList.remove("is-visible");
  scene7Plate.style.removeProperty("opacity");
  scene7Plate.style.removeProperty("transform");
  scene7Glow.classList.remove("is-show");
  scene7Hold.style.visibility = "visible";
  scene7Held.classList.remove("is-visible");
  scene7Held.style.transform = "";
  scene7Gauge.src = scene7Path("4piece");
  scene7Reward.classList.remove("is-pop","is-to-slot");
  scene7Reward.style.opacity = "0";
  scene7Done.classList.remove("is-show");
  scene7Done.style.opacity = "0";
  scene7Highlight.classList.remove("is-blinking","is-hovered");
  scene7Highlight.style.opacity = "0";
  scene7Target.classList.remove("is-active");
  setScene7Step(0);
}

function setScene7Step(step){
  scene7State.step = step;
  scene7Highlight.classList.remove("is-blinking","is-hovered");
  scene7Target.classList.remove("is-active");
  if (step < 0 || step >= scene7Steps.length) return;
  const next = scene7Steps[step];
  const [x1,y1,x2,y2] = next.rect;
  scene7Highlight.src = scene7Path(next.src);
  // 기름 하이라이트는 새우 아래, 집게 하이라이트는 집게 위에 둡니다.
  scene7Highlight.style.zIndex = step === 1 ? "8" : "4";
  scene7Highlight.style.opacity = "";
  void scene7Highlight.offsetWidth;
  scene7Highlight.classList.add("is-blinking");
  scene7Target.style.left = `${x1 / 1921 * 100}%`;
  scene7Target.style.top = `${y1 / 1081 * 100}%`;
  scene7Target.style.width = `${(x2 - x1) / 1921 * 100}%`;
  scene7Target.style.height = `${(y2 - y1) / 1081 * 100}%`;
  scene7Target.classList.add("is-active");
}
scene7Target.addEventListener("pointerenter",()=>scene7Highlight.classList.add("is-hovered"));
scene7Target.addEventListener("pointerleave",()=>scene7Highlight.classList.remove("is-hovered"));

function scene7MoveHeld(clientX, clientY){
  if (!scene7State.held) return;
  const rect = sceneSeven.getBoundingClientRect();
  const anchor = scene7Anchors[scene7State.held];
  const dx = clientX - rect.left - anchor[0] / 1921 * rect.width;
  const dy = clientY - rect.top - anchor[1] / 1081 * rect.height;
  scene7Held.style.transform = `translate3d(${dx}px,${dy}px,0)`;
}
let scene7PointerFrame = 0;
sceneSeven.addEventListener("pointermove", e => {
  scene7State.lastPointer = { clientX: e.clientX, clientY: e.clientY };
  if (!scene7State.held || scene7PointerFrame) return;
  scene7PointerFrame = requestAnimationFrame(() => {
    scene7PointerFrame = 0;
    if (scene7State.lastPointer) scene7MoveHeld(scene7State.lastPointer.clientX, scene7State.lastPointer.clientY);
  });
});
function scene7GrabHold(){
  GameAudio.play("pickup");
  scene7State.held = "hold";
  scene7Hold.style.visibility = "hidden";
  scene7Held.src = scene7Path("hold");
  scene7Held.classList.add("is-visible");
  if (scene7State.lastPointer) scene7MoveHeld(scene7State.lastPointer.clientX, scene7State.lastPointer.clientY);
}
function scene7ReleaseHeld(){
  scene7State.held = null;
  scene7Held.classList.remove("is-visible");
  scene7Held.style.transform = "";
}
function spawnScene7Bubble(){
  if (!scene7State.bubbleLive) return;
  const bubble = document.createElement("span");
  bubble.className = "scene7-bubble";
  // 거품의 크기·이동 거리·흔들림을 튀김기 영역에 비례시켜 창 크기에 대응
  const sizePercent = 3.2 + Math.random() * 8.2;
  const left = 16 + Math.random() * 68;
  const duration = 0.9 + Math.random() * 0.75;
  const driftPercent = -8 + Math.random() * 16;
  const risePercent = 46 + Math.random() * 34;
  const bottom = Math.random() * 18;
  bubble.style.width = `${sizePercent}%`;
  bubble.style.left = `${left}%`;
  bubble.style.bottom = `${bottom}%`;
  bubble.style.setProperty("--bubble-duration", `${duration}s`);
  bubble.style.setProperty("--bubble-drift", `${driftPercent}cqw`);
  bubble.style.setProperty("--bubble-rise", `${risePercent}cqh`);
  scene7BubbleLayer.appendChild(bubble);
  bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
}
function startScene7Bubbles(){
  stopScene7Bubbles();
  scene7BubbleLayer.classList.add("is-active");
  scene7State.bubbleLive = true;
  for (let i = 0; i < 18; i += 1) setTimeout(spawnScene7Bubble, i * 70);
  scene7State.bubbleTimer = window.setInterval(spawnScene7Bubble, 90);
}
function stopScene7Bubbles(){
  scene7State.bubbleLive = false;
  if (scene7State.bubbleTimer) {
    clearInterval(scene7State.bubbleTimer);
    scene7State.bubbleTimer = 0;
  }
  scene7BubbleLayer.classList.remove("is-active");
  scene7BubbleLayer.innerHTML = "";
}
function launchScene7Confetti(){
  stopScene7Confetti();
  scene7State.confettiLive = true;
  const colors = ["#ffd45a", "#ffb347", "#fff3c2", "#f7d7ff", "#c6f1ff", "#d9f6b6"];
  for (let i = 0; i < 32; i += 1) {
    const piece = document.createElement("span");
    piece.className = "scene7-confetti-piece";
    piece.style.left = `${4 + Math.random() * 92}%`;
    piece.style.setProperty("--w", `${8 + Math.random() * 10}px`);
    piece.style.setProperty("--h", `${12 + Math.random() * 14}px`);
    piece.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty("--dx", `${-120 + Math.random() * 240}px`);
    piece.style.setProperty("--rot", `${280 + Math.random() * 520}deg`);
    piece.style.setProperty("--dur", `${1.9 + Math.random() * 1.4}s`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    scene7Confetti.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
  scene7State.confettiTimer = window.setTimeout(() => {
    scene7State.confettiLive = false;
  }, 3200);
}
function stopScene7Confetti(){
  if (scene7State.confettiTimer) {
    clearTimeout(scene7State.confettiTimer);
    scene7State.confettiTimer = 0;
  }
  scene7State.confettiLive = false;
  scene7Confetti.innerHTML = "";
}
function showScene7Glow(){
  scene7Glow.classList.remove("is-show");
  void scene7Glow.offsetWidth;
  scene7Glow.classList.add("is-show");
}

async function scene7GainReward(){
  GameAudio.play("gem");
  scene7Reward.classList.remove("is-pop","is-to-slot");
  scene7Reward.style.opacity = "1";
  void scene7Reward.offsetWidth;
  scene7Reward.classList.add("is-pop");
  await wait(650);
  const rect = sceneSeven.getBoundingClientRect();
  const dx = (1790 - 960) / 1921 * rect.width;
  const dy = (101 - 540) / 1081 * rect.height;
  scene7Reward.style.setProperty("--piece-target-x", `${dx}px`);
  scene7Reward.style.setProperty("--piece-target-y", `${dy}px`);
  scene7Reward.classList.remove("is-pop");
  void scene7Reward.offsetWidth;
  scene7Reward.classList.add("is-to-slot");
  await wait(760);
  scene7Gauge.src = scene7Path("5piece");
  scene7Reward.classList.remove("is-to-slot");
  scene7Reward.style.opacity = "0";
  await wait(250);
}
async function scene7PlateSequence(){
  scene7Plate.classList.remove("is-visible");
  scene7Plate.style.removeProperty("opacity");
  scene7Plate.style.removeProperty("transform");
  void scene7Plate.offsetWidth;
  scene7Plate.classList.add("is-visible");
  await wait(1100);
  stopScene7Bubbles();
  scene7HoldShrimp.style.opacity = "0";
  scene7Shrimp.src = scene7Path("shrimp");
  scene7Shrimp.style.visibility = "visible";
  scene7Shrimp.style.opacity = "1";
  showScene7Glow();
  await wait(160);
  await scene7GainReward();
  scene7Done.classList.remove("is-show");
  void scene7Done.offsetWidth;
  scene7Done.style.opacity = "1";
  scene7Done.classList.add("is-show");
  GameAudio.play("win");
  showScene7Glow();
  GameAudio.play("pop");
  launchScene7Confetti();
  GameAudio.play("applause");
  await wait(2200);
  await transitionToSceneEight();
}
scene7Target.addEventListener("click", async e => {
  if (scene7State.busy) return;
  scene7State.lastPointer = { clientX: e.clientX, clientY: e.clientY };
  if (scene7State.step === 0) {
    scene7State.busy = true;
    setScene7Step(-1);
    scene7Oil.src = scene7Path("boil");
    GameAudio.play("place");
    GameAudio.boilStart();
    scene7Shrimp.style.visibility = "hidden";
    scene7Shrimp.style.opacity = "0";
    startScene7Bubbles();
    await wait(3000);
    scene7Oil.src = scene7Path("boil2");
    scene7State.busy = false;
    setScene7Step(1);
  } else if (scene7State.step === 1) {
    scene7GrabHold();
    setScene7Step(2);
  } else if (scene7State.step === 2) {
    scene7State.busy = true;
    setScene7Step(-1);
    scene7ReleaseHeld();
    GameAudio.boilStop();
    GameAudio.play("place");
    scene7Hold.style.visibility = "visible";
    scene7Oil.src = scene7Path("oil");
    scene7HoldShrimp.style.opacity = "1";
    await wait(280);
    await scene7PlateSequence();
  }
});
async function transitionToSceneEight(){
  whiteTransition.classList.add("is-visible");
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  whiteTransition.classList.add("is-white");
  await wait(500);
  stopScene7Bubbles();
  GameAudio.boilStop();
  sceneEight.classList.add("is-active");
  sceneSeven.classList.remove("is-active");
  whiteTransition.classList.remove("is-white");
  await wait(500);
  whiteTransition.classList.remove("is-visible");
}
