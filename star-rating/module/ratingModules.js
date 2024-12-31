// 별 생성 함수
export function createStars($container, maxRating) {
  const stars = [];
  $container.classList.add('star-rating-container'); // 컨테이너에 클래스 추가

  for (let i = 0; i < maxRating; i++) {
    const star = document.createElement('i');
    star.classList.add('bx', 'bxs-star'); 
    $container.appendChild(star);
    stars.push(star);
  }

  return stars; // 생성된 별 요소 반환
}

// 별점 이벤트 등록 함수
export function addStarEvents(stars, $container) {
  let currentRating = 0; // 현재 선택된 별점

  stars.forEach((star, index) => {
    const starIndex = index + 1; // 별 번호

    // 마우스 올리기 (호버)
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('hovered', i < starIndex); // 호버된 별까지 클래스 추가
      });
    });

    // 마우스 빼기
    star.addEventListener('mouseout', () => {
      stars.forEach((s) => s.classList.remove('hovered')); // 호버 클래스 제거
    });

    // 클릭 이벤트
    star.addEventListener('click', () => {
      currentRating = starIndex; // 현재 선택된 별점 갱신
      stars.forEach((s, i) => {
        s.classList.toggle('selected', i < currentRating); // 선택된 별까지 클래스 추가
      });

      // 사용자 정의 이벤트 발생
      const ratingChangeEvent = new CustomEvent('rating-change', {
        detail: currentRating,
      });
      $container.dispatchEvent(ratingChangeEvent); // 컨테이너에 이벤트 전달
    });
  });
}
