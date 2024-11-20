<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Great Vibes&display=swap" rel="stylesheet">
    <title>나의 여행 계획</title>
    <link rel="stylesheet" href="/css/myPlan.css">
    <script type="module" src="/js/myPlan.js" defer></script>
</head>
<script>
    function navigateToPage() {
      window.location.href = "main-map.html"; // 클릭 시 main-map.html로 이동
    }

    function navigateToPage1() {
      window.location.href = "mypage.jsp"; // 클릭 시 main-map.html로 이동
    }

    function navigateToPage2() {
      window.location.href = "myPlan.jsp"; // 클릭 시 main-map.html로 이동
    }
</script>
<body>
    <header>
        <div class="logo animate__animated animate__backInLeft" onclick="navigateToPage()">Planify</div>
        <div class="buttons">
            <button class="mypage-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage1()">마이페이지</button>
            <button class="bookmark-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage2()">나의 여행계획</button>
        </div>
    </header>

    <div class="my-page-container animate__animated animate__fadeInUp">
        <div class="post-container">
            <!--계획 들어오는 부분-->
        </div>
    </div>
</body>
</html>