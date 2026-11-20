/*
 * 12주차 인터랙티브반 공통 실습 시작 파일
 *
 * 구현됨: 페이지 진입 애니메이션, 연도 선택에 따른 비교 콘텐츠 전환.
 *
 * 비교 콘텐츠의 부모: .unemployment-compare-section
 * 선택 버튼: .year-button-a / .year-button-b
 * 변경 대상: .year-rate / .year-description / .year-chart
 */

// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const compareSection = document.querySelector('.unemployment-compare-section');
const yearButtons = {
  a: compareSection.querySelector('.year-button-a'),
  b: compareSection.querySelector('.year-button-b')
};
const yearContent = {
  a: {
    rate: '4.2',
    label: 'YEAR A',
    title: '연도 A의 실업률 변화',
    description: '연도 A를 선택한 화면입니다. 학습용 가상 수치를 기반으로 그래프와 설명이 표시됩니다.',
    image: 'images/year-a.svg',
    imageAlt: '가상 데이터 연도 A 실업률 추이 그래프',
    chartLabel: '연도 A',
    chartStatus: '연도 A 그래프가 표시 중입니다.'
  },
  b: {
    rate: '3.6',
    label: 'YEAR B',
    title: '연도 B의 실업률 변화',
    description: '연도 B를 선택한 화면입니다. 학습용 가상 수치를 기반으로 그래프와 설명이 표시됩니다.',
    image: 'images/year-b.svg',
    imageAlt: '가상 데이터 연도 B 실업률 추이 그래프',
    chartLabel: '연도 B',
    chartStatus: '연도 B 그래프가 표시 중입니다.'
  }
};

const yearRate = compareSection.querySelector('.year-rate');
const yearLabel = compareSection.querySelector('.year-label');
const metricTitle = compareSection.querySelector('.metric-title');
const yearDescription = compareSection.querySelector('.year-description');
const yearChart = compareSection.querySelector('.year-chart');
const chartYear = compareSection.querySelector('.chart-year');
const chartStatus = compareSection.querySelector('.chart-status');
const statusMessage = compareSection.querySelector('.practice-status-message');

function selectYear(year) {
  const content = yearContent[year];

  yearRate.firstChild.textContent = content.rate;
  yearLabel.textContent = content.label;
  metricTitle.textContent = content.title;
  yearDescription.textContent = content.description;
  yearChart.src = content.image;
  yearChart.alt = content.imageAlt;
  chartYear.textContent = content.chartLabel;
  chartStatus.textContent = content.chartStatus;
  statusMessage.textContent = `${content.chartLabel}가 선택되었습니다. 아래 수치는 학습용 가상 데이터입니다.`;

  Object.entries(yearButtons).forEach(([buttonYear, button]) => {
    const isSelected = buttonYear === year;
    button.classList.toggle('active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

Object.entries(yearButtons).forEach(([year, button]) => {
  button.addEventListener('click', () => selectYear(year));
});
