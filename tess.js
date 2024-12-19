const addCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'star-rating/theme.css';  // 제공된 CSS 파일 경로
  document.head.appendChild(link);
};

// 별점 시스템 구현 함수
const StarRating = ($container) => {
  const currentRatingDisplay = $container.nextElementSibling.querySelector('span'); // current-rating span 찾기
  let currentRating = 0; // 초기 클릭된 별점

  // 별 색상 업데이트 함수
  const updateStarColor = (index, color) => {
    const star = $container.children[index].firstElementChild;
    star.style.color = color;
  };

  // 클릭 후 별 색상 업데이트
  const updateStarsOnClick = (clickIndex) => {
    for (let i = 0; i < $container.children.length; i++) {
      const color = i <= clickIndex ? '#db5b33' : '#dcdcdc'; // 클릭된 별과 그 이전 별들을 #db5b33 색상으로 변경
      updateStarColor(i, color);
    }
  };

  // 호버 시 별 색상 업데이트 함수
  const updateStarsOnHover = (hoverIndex) => {
    for (let i = 0; i < $container.children.length; i++) {
      const color = i <= hoverIndex ? '#a7a7a7' : '#dcdcdc'; // 호버된 별과 그 이전 별들을 #a7a7a7 색상으로 변경
      updateStarColor(i, color);
    }
  };

  // 별들 생성
  for (let i = 0; i < $container.dataset.maxRating; i++) {
    const score = i + 1;
    let starContainer = document.createElement('span');
    let starElement = document.createElement('i');

    starElement.className = 'bx bxs-star'; // boxicons 별 아이콘

    starContainer.classList.add('star-rating-container');
    starContainer.appendChild(starElement);
    $container.appendChild(starContainer);

    // 마우스 이벤트 처리
    starElement.addEventListener('mouseover', () => updateStarsOnHover(i)); // 호버
    starElement.addEventListener('mouseleave', () => updateStarsOnHover(currentRating - 1)); // 마우스 아웃 시 클릭된 별점까지 색상 복원

    starElement.addEventListener('click', () => {
      currentRating = score; // 클릭된 별점 저장
      updateStarsOnClick(i); // 클릭 시 해당 별과 그 이전 별들을 색상 변경
      currentRatingDisplay.textContent = score; // 클릭된 별 점수 표시

      // 'rating-change' 이벤트 발생
      const event = new CustomEvent('rating-change', { detail: score });
      $container.dispatchEvent(event);
    });
  }
};

// star-rating 컨테이너와 관련된 모든 초기화 작업
const initializeStarRatings = () => {
  const $containers = [...document.querySelectorAll('.star-rating')];
  $containers.forEach(($container) => {
    StarRating($container);
  });
};

// 페이지 로드 시 필요한 작업
window.addEventListener('DOMContentLoaded', () => {
  // theme.css 파일 동적으로 추가
  addCSS();

  // 별점 시스템 초기화
  initializeStarRatings();
});

export default StarRating;
