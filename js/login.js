document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/login.jsp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              console.log('로그인 성공:', data.uid);
              location.href = 'mypage.jsp';
          } else {
              alert('로그인 실패: ' + data.message);
          }
      })
      .catch(error => console.error('Error:', error));
});
