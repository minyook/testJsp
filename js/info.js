import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정 (발급받은 API 키로 교체)
const API_KEY = 'AIzaSyATIzCx4wD4U6WsVRs0zt3ZfwhgEQX8Tq0';

// Google Generative AI 인스턴스 생성
const genAI = new GoogleGenerativeAI(API_KEY);

document.getElementById('plan-button').addEventListener('click', async function(event) {
  event.preventDefault();

  // 입력된 폼 데이터 수집
  const formData = {
    numPeople: document.querySelector('.people input[placeholder="여행 인원을 적어주세요"]').value,
    budget: document.querySelector('.people input[placeholder="예상 경비를 적어주세요"]').value,
    startDate: document.querySelector('.Date input[placeholder="출발 날짜"]').value,
    endDate: document.querySelector('.Date input[placeholder="도착 날짜"]').value,
    preference: Array.from(document.querySelectorAll('.preference input[type="button"].selected'))
                    .map(button => button.value)
  };

  // 로컬 스토리지에 저장된 위치 가져오기
  const selectedLocation = JSON.parse(localStorage.getItem('clickedLocation')) || {};

  // 필수 데이터 검증
  if (!selectedLocation.lat || !formData.numPeople || !formData.budget || !formData.startDate || !formData.endDate || formData.preference.length === 0) {
    alert("모든 필드를 입력하고 위치를 선택하세요.");
    return;
  }

  // AI로 전송할 데이터 구성
  const dataToSend = {
    ...formData,
    location: selectedLocation
  };

  console.log("전송할 데이터:", dataToSend);

  // 로딩 애니메이션 표시
  const containerElement = document.getElementById('conatiner-box');
  containerElement.style.display = 'none';
  const loadingElement = document.getElementById('loading');
  loadingElement.style.display = 'block';

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`여행 계획을 생성해 주세요: ${JSON.stringify(dataToSend)}`);
    const response = await result.response;
    const text = await response.text();

    console.log('Travel plan created (raw text):', response);

    // localStorage에 텍스트 형식 그대로 저장
    localStorage.setItem('travelPlan', text);

    // 로딩 애니메이션 숨기기
    loadingElement.style.display = 'none';

    // 결과 페이지로 이동
    window.location.href = 'plan.jsp';
  } catch (error) {
    console.error('Error:', error);
    alert('AI 요청 중 오류가 발생했습니다. 콘솔에서 자세한 내용을 확인하세요.');

    // 로딩 애니메이션 숨기기 (오류 발생 시)
    loadingElement.style.display = 'none';
    containerElement.style.display = 'block';
  }
});

// 버튼 선택 시 'selected' 클래스 추가/제거
document.querySelectorAll('.preference input[type="button"]').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle('selected');
  });
});
