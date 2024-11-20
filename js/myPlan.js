import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase 설정 추가
const firebaseConfig = {
    apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
    authDomain: "web-project-planify.firebaseapp.com",
    projectId: "web-project-planify",
    storageBucket: "web-project-planify.firebasestorage.app",
    messagingSenderId: "97117691884",
    appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
    measurementId: "G-BHGJ3YWP1Z"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Firestore의 "travelPlans" 컬렉션에서 모든 문서 가져오기
        const querySnapshot = await getDocs(collection(db, "travelPlans"));

        // post-container에 데이터를 표시하기 위해 요소 선택
        const postContainer = document.querySelector('.post-container');

        // 각 문서를 화면에 추가
        querySnapshot.forEach((doc) => {
            const planData = doc.data();

            // 여행 계획을 표시할 박스형 HTML 요소 생성
            const planElement = document.createElement('div');
            planElement.classList.add('plan-box');
            planElement.innerHTML = `
                <h3>여행 계획</h3>
                <p>${planData.plan ? planData.plan.substring(0, 50) + '...' : '여행 계획 없음'}</p>
                <button class="view-plan-button" data-id="${doc.id}">자세히 보기</button>
            `;

            // postContainer에 추가
            postContainer.appendChild(planElement);
        });

        // 각 "자세히 보기" 버튼에 이벤트 리스너 추가
        document.querySelectorAll('.view-plan-button').forEach(button => {
            button.addEventListener('click', function () {
                const docId = this.getAttribute('data-id');

                // 로컬 스토리지에 현재 선택한 계획의 ID 저장
                localStorage.setItem('selectedPlanId', docId);

                // detail.html 페이지로 이동
                window.location.href = 'detail.jsp';
            });
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
        alert('여행 계획을 불러오는 중 오류가 발생했습니다. 콘솔에서 자세한 내용을 확인하세요.');
    }
});
