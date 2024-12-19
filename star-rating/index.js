// // theme.css를 동적으로 추가하는 함수
// const addCSS = () => {
//   const link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = 'star-rating/theme.css';  // 제공된 CSS 파일 경로
//   document.head.appendChild(link);
// };

// // 별점 시스템 구현 함수
// const StarRating = ($container) => {
//   // 별들 초기화 (중복 방지)
//   $container.innerHTML = ''; // 기존 별을 먼저 지우고 새로 추가합니다.

//   const currentRatingDisplay = $container.nextElementSibling.querySelector('span'); // current-rating span 찾기
//   let currentRating = 0; // 초기 클릭된 별점

//   // 별 색상 업데이트 함수
//   const updateStarColor = (index, color) => {
//     const star = $container.children[index].firstElementChild;
//     star.style.color = color;
//   };

//   // 클릭 후 별 색상 업데이트
//   const updateStarsOnClick = (clickIndex) => {
//     for (let i = 0; i < $container.children.length; i++) {
//       const color = i <= clickIndex ? 'var(--selected-color)' : '#dcdcdc'; // 클릭된 별과 그 이전 별들을 #db5b33 색상으로 변경
//       updateStarColor(i, color);
//     }
//   };

//   // // 호버 시 별 색상 업데이트 함수
//   // const updateStarsOnHover = (hoverIndex) => {
//   //   for (let i = 0; i < $container.children.length; i++) {
//   //     const color = i <= hoverIndex ? '#a7a7a7' : '#dcdcdc'; // 호버된 별과 그 이전 별들을 #a7a7a7 색상으로 변경
//   //     updateStarColor(i, color);
//   //   }
//   // };
//   // 호버 시 별 색상 업데이트 함수
//   const updateStarsOnHover = (hoverIndex) => {
//     for (let i = 0; i < $container.children.length; i++) {
//       const color =
//         currentRating > 0 && i < currentRating
//           ? 'var(--selected-color)' // 클릭된 별점 유지
//           : i <= hoverIndex
//             ? 'var(--hovered-color)' // 호버 색상
//             : 'var(--main-color)'; // 기본 색상
//       updateStarColor(i, color);
//     }
//   };



//   // 별들 생성
//   for (let i = 0; i < $container.dataset.maxRating; i++) {
//     const score = i + 1;
//     let starContainer = document.createElement('span');
//     let starElement = document.createElement('i');

//     starElement.className = 'bx bxs-star'; // boxicons 별 아이콘

//     starContainer.classList.add('star-rating-container');
//     starContainer.appendChild(starElement);
//     $container.appendChild(starContainer);

//     // 마우스 이벤트 처리
//     starElement.addEventListener('mouseover', () => updateStarsOnHover(i)); // 호버
//     starElement.addEventListener('mouseleave', () => updateStarsOnHover(currentRating - 1)); // 마우스 아웃 시 클릭된 별점까지 색상 복원

//     starElement.addEventListener('click', () => {
//       currentRating = score; // 클릭된 별점 저장
//       updateStarsOnClick(i); // 클릭 시 해당 별과 그 이전 별들을 색상 변경
//       currentRatingDisplay.textContent = score; // 클릭된 별 점수 표시

//       // 'rating-change' 이벤트 발생
//       const event = new CustomEvent('rating-change', { detail: score });
//       $container.dispatchEvent(event);
//     });
//   }

//   // 마우스가 밖으로 나갔을 때 클릭된 색상 유지
//   $container.addEventListener('mouseleave', () => {
//     // 마우스 아웃 시, 클릭된 색상 유지하도록 색상 업데이트
//     if (currentRating > 0) {
//       updateStarsOnClick(currentRating - 1); // 클릭된 별까지 색상 유지
//     } else {
//       updateStarsOnClick(-1); // 클릭된 별이 없으면 기본 상태로 돌아감
//     }
//   });
// };


// // star-rating 컨테이너와 관련된 모든 초기화 작업
// const initializeStarRatings = () => {
//   const $containers = [...document.querySelectorAll('.star-rating')];
//   $containers.forEach(($container) => {
//     StarRating($container);
//   });
// };

// // 페이지 로드 시 필요한 작업
// window.addEventListener('DOMContentLoaded', () => {
//   // theme.css 파일 동적으로 추가
//   addCSS();

//   // 별점 시스템 초기화
//   initializeStarRatings();
// });

// export default StarRating;





// // theme.css를 동적으로 추가하는 함수
// const addCSS = () => {
//   const link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = 'star-rating/theme.css'; // 제공된 CSS 파일 경로
//   document.head.appendChild(link);
// };

// // 별점 시스템 구현 함수
// const StarRating = ($container) => {
//   // 별들 초기화 (중복 방지)
//   $container.innerHTML = ''; // 기존 별을 먼저 지우고 새로 추가합니다.

//   const maxRating = $container.dataset.maxRating;
//   const currentRatingDisplay = $container.nextElementSibling.querySelector('span');
//   let currentRating = 0;

//   // 별 색상 업데이트 함수
//   const updateStars = (hoverIndex = -1) => {
//     [...$container.children].forEach((star, i) => {
//       if (currentRating > i && 0 < currentRating) {
//         star.firstElementChild.style.color = 'var(--selected-color)';
//       } else if (i <= hoverIndex) {
//         star.firstElementChild.style.color = 'var(--hovered-color)';
//       } else {
//         star.firstElementChild.style.color = 'var(--main-color)';
//       }
//     });
//   };

//   // 별들 생성 및 이벤트 추가
//   for (let i = 0; i < maxRating; i++) {
//     const starContainer = document.createElement('span');
//     const starElement = document.createElement('i');
//     starElement.className = 'bx bxs-star';
//     starContainer.classList.add('star-rating-container');
//     starContainer.appendChild(starElement);
//     $container.appendChild(starContainer);

//     // 이벤트 핸들러
//     starElement.addEventListener('mouseover', () => updateStars(i));
//     starElement.addEventListener('mouseleave', () => updateStars(-1));
//     starElement.addEventListener('click', () => {
//       currentRating = i + 1;
//       currentRatingDisplay.textContent = currentRating;
//       updateStars();
//       $container.dispatchEvent(new CustomEvent('rating-change', { detail: currentRating }));
//     });
//   }
// };

// // star-rating 컨테이너와 관련된 모든 초기화 작업
// const initializeStarRatings = () => {
//   document.querySelectorAll('.star-rating').forEach((container) => StarRating(container));
// };

// // 페이지 로드 시 초기화
// window.addEventListener('DOMContentLoaded', () => {
//   addCSS();
//   initializeStarRatings();
// });

// export default StarRating;




// // theme.css를 동적으로 추가하는 함수
// const addCSS = () => {
//   const link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = 'star-rating/theme.css'; // CSS 파일 경로
//   document.head.appendChild(link);
// };

// // 별점 시스템 구현 함수
// const StarRating = ($container) => {
//   const maxRating = parseInt($container.dataset.maxRating, 10);
//   const currentRatingDisplay = $container.nextElementSibling.querySelector('span');
//   let currentRating = 0;

//   // 별 색상 업데이트 함수
//   const updateStars = (hoverIndex = -1) => {
//     [...$container.children].forEach((star, i) => {
//       star.firstElementChild.style.color =
//         i < currentRating
//           ? 'var(--selected-color)'
//           : i <= hoverIndex
//             ? 'var(--hovered-color)'
//             : 'var(--main-color)';
//     });
//   };

//   // 별들 생성 및 이벤트 추가
//   $container.innerHTML = Array.from({ length: maxRating }, (_, i) => `
//     <span class="star-rating-container">
//       <i class="bx bxs-star"></i>
//     </span>
//   `).join('');

//   // 이벤트 핸들러 추가
//   [...$container.children].forEach((star, i) => {
//     star.addEventListener('mouseover', () => updateStars(i));
//     star.addEventListener('mouseleave', () => updateStars(-1));
//     star.addEventListener('click', () => {
//       currentRating = i + 1;
//       currentRatingDisplay.textContent = currentRating;
//       updateStars();
//       $container.dispatchEvent(new CustomEvent('rating-change', { detail: currentRating }));
//     });
//   });
// };

// // star-rating 컨테이너와 관련된 모든 초기화 작업
// const initializeStarRatings = () => {
//   document.querySelectorAll('.star-rating').forEach(StarRating);
// };

// // 페이지 로드 시 초기화
// window.addEventListener('DOMContentLoaded', () => {
//   addCSS();
//   initializeStarRatings();
// });

// export default StarRating;



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

  // // 별 색상 업데이트 함수
  // const updateStars = (hoverIndex = -1) => {
  //   [...$container.children].forEach((star, i) => {
  //     star.style.color = i < currentRating
  //       ? 'var(--selected-color)' // 선택된 색상
  //       : i <= hoverIndex
  //         ? 'var(--hovered-color)' // 호버된 색상
  //         : 'var(--main-color)';   // 기본 색상
  //   });
  // };
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
