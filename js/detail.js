import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
    // 로컬 스토리지에서 선택한 계획의 ID 가져오기
    const docId = localStorage.getItem('selectedPlanId');
    
    if (!docId) {
        alert('계획이 선택되지 않았습니다.');
        return;
    }

    try {
        // Firestore에서 해당 문서 가져오기
        const docRef = doc(db, "travelPlans", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const planDetails = docSnap.data();

            // 세부 계획 표시
            const detailContainer = document.getElementById('plan-detail-container');
            detailContainer.innerHTML = `
                <h2>여행 계획 세부 내용</h2>
                <div>${planDetails.plan.replace(/\n/g, '<br>')}</div>
            `;
        } else {
            alert('해당 문서를 찾을 수 없습니다.');
        }
    } catch (e) {
        console.error('Error getting document:', e);
        alert('계획을 불러오는 중 오류가 발생했습니다. 콘솔에서 자세한 내용을 확인하세요.');
    }
});
