<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/login.css" />
    <title>회원가입</title>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage.js"></script>
    <script type="module" defer src="/js/join.js"></script> <!-- 외부 JS 파일 -->
</head>
<body>
    <div class="MainLogin">
        <div class="Mainleft">
            <div class="box">
                <img class="logoimg" src="/image/logo.png">
            </div>
        </div>
        <div class="Mainright">
            <div class="loginBox">
                <h1 id="loginTitle">회원가입</h1>
                <form id="signup-form">
                    <label>이메일</label><br>
                    <input type="email" id="email" placeholder="이메일"><br>
                    <label style="margin-top: 20px;">비밀번호</label><br>
                    <input type="password" id="password" placeholder="비밀번호"><br>
                    <label style="margin-top: 20px;">비밀번호 확인</label><br>
                    <input type="password" id="confirm-password" placeholder="비밀번호 확인"><br>
                    <label style="margin-top: 20px;">이름</label><br>
                    <input type="text" id="nickname" placeholder="반드시 본인 이름으로 부탁드립니다."><br>
                    <button style="margin-top: 20px; margin-bottom: 20px;" type="submit">회원가입</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
