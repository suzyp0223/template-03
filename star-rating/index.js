// CSS 경로를 추가하는 함수
const addCSS = (href = 'star-rating/theme.css') => {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
};

// 별점 시스템 초기화 함수
const StarRating = ($container) => {
  const maxRating = +$container.dataset.maxRating || 5; // 기본값 5
  const display = $container.nextElementSibling?.querySelector('span'); // 바로 다음 형제 요소의 span 선택
  let currentRating = 0;

  const updateStars = (hoverIndex = -1) => {
    $container.querySelectorAll('.bx').forEach((star, i) => {
      const color = i < currentRating
        ? 'var(--selected-color)'
        : i <= hoverIndex
          ? 'var(--hovered-color)'
          : 'var(--main-color)';
      star.style.color = color;
    });
  };

  // 별점 초기화
  $container.innerHTML = Array(maxRating).fill('').map(() => `
    <span class="star-rating-container">
       <i class="bx bxs-star"></i>
     </span>
  `).join('');

  // 이벤트 핸들러 설정
  $container.addEventListener('mouseover', (e) => {
    const starContainer = e.target.closest('.star-rating-container');
    if (!starContainer) return;
    const index = [...$container.children].indexOf(starContainer);
    updateStars(index);
  });

  $container.addEventListener('mouseleave', () => updateStars(-1));

  $container.addEventListener('click', (e) => {
    const starContainer = e.target.closest('.star-rating-container');
    if (!starContainer) return;
    const index = [...$container.children].indexOf(starContainer);
      currentRating = index + 1; // 현재 별점 업데이트
      if (display) display.textContent = currentRating; // 별점 표시 업데이트
      $container.dispatchEvent(new CustomEvent('rating-change', { detail: currentRating })); // 이벤트 발생
      updateStars(); // 별 색상 업데이트
  });
};

// 모든 별점 시스템 초기화
const initializeStarRatings = () => {
  document.querySelectorAll('.star-rating').forEach(StarRating);
};

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  addCSS();
  initializeStarRatings();
});

export default StarRating;
