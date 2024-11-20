<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/plan.css">
    <title>Planify</title>
</head>

<body>
    <header>
        <div class="logo animate__animated animate__backInLeft" onclick="navigateToPage2()">Planify</div>
        <div class="buttons">
            <button class="mypage-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage3()">마이페이지</button>
            <button class="bookmark-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage4()">나의 여행계획</button>
        </div>
    </header>

    <div class="container">
        <div id="result-container">
            <!-- AI 응답 데이터가 이곳에 표시됩니다 -->
        </div>
        <button id="save-button">저장하기</button>
    </div>

    <script>
        function navigateToPage2() {
            window.location.href = 'main-map.html';
        }
        function navigateToPage3() {
            window.location.href = 'mypage.html';
        }
        function navigateToPage4() {
            window.location.href = 'bookmark.html';
        }
    </script>
    <script type="module" src="/js/plan.js"></script>
</body>

</html>
