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

  // 새우가 현재 있는 레일은 제외
  const availableLanes = [0, 1, 2, 3, 4].filter(
    lane => lane !== scene4State.currentLane
  );

  // 먹이가 떨어질 레일 선택
  const lane = availableLanes[
    Math.floor(Math.random() * availableLanes.length)
  ];

  const xPercent = scene4State.laneCenters[lane];

  // 먹이 생성
  const element = document.createElement("div");
  element.className = "scene4-food";

  element.style.left = `${xPercent}%`;
element.style.top = "0px";

  scene4FoodLayer.appendChild(element);

  scene4State.foods.push({
    element,
    lane,
    xPercent,

    y: -80,

    // 기존 4.2~5.6보다 느리게
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
  const sceneHeight = sceneFour.clientHeight;

  function loop(currentTime) {
    // 다이아 충돌만 JavaScript로 처리합니다. 물방울은 CSS가 이동시킵니다.
    const delta = lastTime ? Math.min(currentTime - lastTime, 50) / 16.67 : 1;
    lastTime = currentTime;

    updateScene4Foods(delta, sceneHeight);
    scene4State.loopId = requestAnimationFrame(loop);
  }

  scene4State.loopId = requestAnimationFrame(loop);
}
/* =========================================================
   다이아 먹이 업데이트
   ========================================================= */

function updateScene4Foods(delta, sceneHeight) {

  if (scene4State.gameEnded) return;

  const catchY = sceneHeight * 0.30;
  const catchRange = sceneHeight * 0.025;

  for (let i = scene4State.foods.length - 1; i >= 0; i--) {

    const food = scene4State.foods[i];

    if (!food || food.caught) continue;

    // 실제 경과 시간에 맞춰 이동
    food.y += food.speed * delta;

    food.element.style.transform =
      `translate(-50%, ${food.y}px)`;

    const sameLane =
      food.lane === scene4State.currentLane;

    const touchingHead =
      food.y >= catchY - catchRange &&
      food.y <= catchY + catchRange;

    if (sameLane && touchingHead) {

      food.caught = true;

      food.element.classList.add("is-caught");

      setTimeout(() => {
        food.element.remove();
      }, 280);

      scene4State.foods.splice(i, 1);

      handleScene4FoodCatch();
      continue;
    }

    if (food.y > sceneHeight + 80) {
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
  original.style.visibility = "hidden";
  scene5State.held = {name};
  scene5Held.src = scene5Path(name);
  scene5Held.classList.add("is-visible");
  // 클릭 순간부터 포인터 위치로 이동
  const last = scene5Pointer;
  if (last) scene5MoveHeld(last.clientX, last.clientY);
}
function scene5Drop(original) {
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
    await wait(2000);
    await transitionToSceneSix();
  }
});

async function scene5GainReward(gaugeFile) {
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
  whiteTransition.classList.remove("is-white");
  setTimeout(() => whiteTransition.classList.remove("is-visible"), 500);
}
