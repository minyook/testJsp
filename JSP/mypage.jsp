<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/mypage.css">
    <title>My Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <script type="module" defer src="/js/mypage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage.js"></script>
</head>
<body>
    <header>
        <div class="logo animate__animated animate__backInLeft" onclick="navigateToPage()">Planify</div>
        <div class="buttons">
            <button class="mypage-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage1()">마이페이지</button>
            <button class="bookmark-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage2()">나의 여행계획</button>
        </div>
    </header>
    <div class="my-page-container animate__animated animate__fadeInUp">
        <div class="profile">
            <div class="profile-header">
                <h1>My Page</h1>
                <div class="button">
                    <button class="edit-button animate__animated animate__fadeIn animate__delay-1s">정보 수정</button>
                    <button class="logout-button animate__animated animate__fadeIn animate__delay-1s" id="logoutButton">로그아웃</button>
                </div>
            </div>
            <div class="profile-info">
                <p id="userName"><strong>이름:</strong> </p>
                <p id="email"><strong>이메일:</strong> </p>
            </div>
        </div>
    </div>

    <script>
        document.querySelector('.edit-button').addEventListener('click', () => {
            alert('정보 수정 화면으로 이동합니다.');
        });
        function navigateToPage() {
            window.location.href = "main-map.html"; // 클릭 시 main-map.html로 이동
        }

        function navigateToPage1() {
            window.location.href = "mypage.html"; // 클릭 시 mypage.html로 이동
        }

        function navigateToPage2() {
            window.location.href = "myPlan.html"; // 클릭 시 myPlan.html로 이동
        }
    </script>
</body>
</html>
