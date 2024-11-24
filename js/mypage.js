document.addEventListener("DOMContentLoaded", function () {
  // 서버에서 사용자 정보를 가져오기
  fetch('/getUserInfo.jsp', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              // 서버에서 받은 사용자 정보를 표시
              document.getElementById('userName').textContent = '이름: ' + data.nickname;
              document.getElementById('email').textContent = '아이디: ' + data.email;
          } else {
              alert('사용자 정보를 가져오지 못했습니다. 다시 로그인해주세요.');
              location.href = 'login.jsp'; // 로그인 페이지로 리디렉션
          }
      })
      .catch(error => console.error('사용자 정보 요청 중 오류 발생:', error));

  // 로그아웃 버튼 클릭 이벤트
  document.getElementById('logoutButton').addEventListener('click', function () {
      fetch('/logout.jsp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      })
          .then(response => response.json())
          .then(data => {
              if (data.status === 'success') {
                  alert('로그아웃 성공!');
                  location.href = 'index.jsp'; // 로그아웃 후 메인 페이지로 이동
              } else {
                  alert('로그아웃 실패. 다시 시도해주세요.');
              }
          })
          .catch(error => console.error('로그아웃 요청 중 오류 발생:', error));
  });
});
