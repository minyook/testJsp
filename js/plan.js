import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', function() {
    // localStorage에서 여행 계획 텍스트 가져오기
    const travelPlan = localStorage.getItem('travelPlan');

    if (!travelPlan) {
        alert('AI 응답 데이터를 찾을 수 없습니다.');
        return;
    }

    // 여행 계획을 HTML 형식으로 포맷팅하여 표시
    const resultContainer = document.getElementById('result-container');
    let formattedPlan = `<h2>여행 계획</h2>`;
    const lines = travelPlan.split('\n');

    lines.forEach(line => {
        if (line.startsWith('day')) {
            formattedPlan += `<h3>${line.trim()}</h3>`;
        } else if (line.includes(':')) {
            const [time, description] = line.split(':');
            formattedPlan += `<p><strong>${time.trim()}:</strong> ${description.trim()}</p>`;
        } else {
            formattedPlan += `<p>${line.trim()}</p>`;
        }
    });

    resultContainer.innerHTML = formattedPlan;

    // 폼의 숨겨진 input에 여행 계획을 저장
    document.getElementById('travel-plan-input').value = travelPlan;

    // 저장 버튼 이벤트 리스너
    document.getElementById('save-button').addEventListener('click', async function(event) {
        event.preventDefault(); // 기본 폼 제출 방지

        try {
            const travelPlanJson = { plan: travelPlan };
            await addDoc(collection(db, "travelPlans"), travelPlanJson);
            console.log('Travel plan successfully saved to Firestore');
            alert('여행 계획이 Firestore에 저장되었습니다.');

            // 폼 제출로 서버에 데이터 전송
            window.location.href = "../html/myPlan.html";
        } catch (e) {
            console.error('Error saving travel plan to Firestore:', e);
            alert('여행 계획을 저장하는 중 오류가 발생했습니다. 콘솔에서 자세한 내용을 확인하세요.');
        }
    });
});
