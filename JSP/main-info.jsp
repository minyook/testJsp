<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/index.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
    <script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js"></script>
    <title>Planify</title>
</head>

<script type="importmap">
    {
        "imports": {
            "@google/generative-ai": "https://esm.run/@google/generative-ai"
        }
    }
</script>

<script>
    function navigateToPage() {
        window.location.href = "main-map.html";
    }
    function navigateToPage1() {
        window.location.href = "mypage.html";
    }
    function navigateToPage2() {
        window.location.href = "myPlan.html";
    }
</script>

<body>
    <div class="container" id="conatiner-box">
        <div class="left-panel">
            <div class="logo animate__animated animate__backInLeft" onclick="navigateToPage()">Planify</div>
            <div class="buttons">
                <button class="mypage-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage1()">마이페이지</button>
                <button class="bookmark-button animate__animated animate__fadeIn animate__delay-1s" onclick="navigateToPage2()">나의 여행계획</button>
            </div>
        </div>
        <div class="right-panel">
            <div class="form-container animate__animated animate__zoomIn">
                <div class="people">
                    <input type="number" placeholder="여행 인원을 적어주세요" min="1" />
                    <input type="number" placeholder="예상 경비를 적어주세요" step="10000" />
                </div>
                <div class="Date">
                    <input type="date" placeholder="출발 날짜" />
                    <input type="date" placeholder="도착 날짜" />
                </div>

                <div class="preference">
                    <input type="button" value="맛집" />
                    <input type="button" value="숙소" />
                    <input type="button" value="기타" />
                </div>

                <input type="submit" value="계획 생성하기" id="plan-button" class="animate__animated animate__fadeIn animate__delay-0.5s" />
            </div>
        </div>
    </div>

    <div id="loading" style="display: none">
        <lottie-player
            src="https://lottie.host/01a85ff6-da67-4c88-b320-911b0ace1078/AkMQZYZVms.json"
            background="#ffffff"
            speed="1"
            style="width: 300px; height: 300px"
            loop
            autoplay
        ></lottie-player>
        <br />
        <p>여행 계획을 생성 중입니다...</p>
    </div>

    <script type="module" src="/js/info.js"></script>
</body>
</html>
