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

    // 텍스트를 파싱하여 포맷팅
    let formattedPlan = `<h2>여행 계획</h2>`;
    const lines = travelPlan.split('\n');
    
    lines.forEach(line => {
        // 각 줄의 내용에 따라 적절한 HTML 태그로 래핑
        if (line.startsWith('day')) {
            formattedPlan += `<h3>${line.trim()}</h3>`;
        } else if (line.includes(':')) {
            const [time, description] = line.split(':');
            formattedPlan += `<p><strong>${time.trim()}:</strong> ${description.trim()}</p>`;
        } else {
            formattedPlan += `<p>${line.trim()}</p>`;
        }
    });

    // 결과 컨테이너에 추가
    resultContainer.innerHTML = formattedPlan;

    // 저장 버튼 이벤트 리스너 추가
    document.getElementById('save-button').addEventListener('click', async function() {
        try {
            // travelPlan을 JSON 형식으로 변환
            const travelPlanJson = {
                plan: travelPlan // 단순히 텍스트 전체를 하나의 필드로 저장
            };
            // Firestore에 새로운 문서로 저장
            await addDoc(collection(db, "travelPlans"), travelPlanJson);
            console.log('Travel plan successfully saved to Firestore');
            alert('여행 계획이 Firestore에 저장되었습니다.');
            window.location.href = 'myPlan.html';
        } catch (e) {
            console.error('Error saving travel plan to Firestore:', e);
            alert('여행 계획을 저장하는 중 오류가 발생했습니다. 콘솔에서 자세한 내용을 확인하세요.');
        }
    });
});
