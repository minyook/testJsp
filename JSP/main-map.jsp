<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/index.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
    <title>Planify</title>

    <!-- 지도 관련 JavaScript -->
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage.js"></script>
    <script defer src="/js/map.js"></script> <!-- 외부 JS 파일 포함 -->
</head>
<body>
    <div class="container">
        <div class="left-panel">
            <div class="logo animate__animated animate__backInLeft" onclick="navigateToPage()">Planify</div>
            <div class="buttons">
                <button class="mypage-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage1()">마이페이지</button>
                <button class="bookmark-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage2()">나의 여행계획</button>
                <button id="next-button" class="animate__animated animate__fadeIn animate__delay-0.5s">다음으로</button>
            </div>
        </div>
        <div class="right-panel">
            <div class="animate__animated animate__zoomIn" id="map"></div>
        </div>
    </div>
</body>
</html>
