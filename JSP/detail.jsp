<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/myPlan.css">
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

    <div id="plan-detail-container">
        <!-- AI 응답 데이터가 이곳에 표시됩니다 -->
    </div>
    
    <script>
        function navigateToPage2() {
            window.location.href = 'main-map.html';
        }
        function navigateToPage3() {
            window.location.href = 'mypage.jsp';
        }
        function navigateToPage4() {
            window.location.href = 'myPlan.jsp';
        }
    </script>
    <script type="module" src="/js/detail.js"></script>
</body>

</html>