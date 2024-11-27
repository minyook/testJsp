<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/login.css" />
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage.js"></script>
    <script>
      // Firebase 초기화 (중복 선언 방지)
      const firebaseConfig = {
        apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
        authDomain: "web-project-planify.firebaseapp.com",
        projectId: "web-project-planify",
        storageBucket: "web-project-planify.firebasestorage.app",
        messagingSenderId: "97117691884",
        appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
        measurementId: "G-BHGJ3YWP1Z"
      };
      firebase.initializeApp(firebaseConfig);

      // 이메일 중복 체크 함수
      function checkEmailDuplication(email) {
        return firebase.firestore().collection('users')
          .where('email', '==', email)
          .get()
          .then(function(querySnapshot) {
            return querySnapshot.size > 0; // 중복 여부 반환
          })
          .catch(function(error) {
            console.error('이메일 중복 체크 중 오류 발생:', error);
            return false;
          });
      }

      // 닉네임 중복 체크 함수
      function checkNicknameDuplication(nickname) {
        return firebase.firestore().collection('users')
          .where('nickname', '==', nickname)
          .get()
          .then(function(querySnapshot) {
            return querySnapshot.size > 0; // 중복 여부 반환
          })
          .catch(function(error) {
            console.error('닉네임 중복 체크 중 오류 발생:', error);
            return false;
          });
      }

      // 회원가입 이벤트 처리
      function handleSignUp(event) {
        event.preventDefault();

        var signupButton = event.target.querySelector('button[type="submit"]');
        signupButton.disabled = true;

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        var nickname = document.getElementById('nickname').value;

        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
          alert('비밀번호는 최소한 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 혼합하여 사용해야 합니다.');
          signupButton.disabled = false;
          return;
        }

        if (password !== confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          signupButton.disabled = false;
          return;
        }

        checkEmailDuplication(email).then(function(isEmailDuplicated) {
          if (isEmailDuplicated) {
            alert('중복된 이메일입니다.');
            signupButton.disabled = false;
            return;
          }

          checkNicknameDuplication(nickname).then(function(isNicknameDuplicated) {
            if (isNicknameDuplicated) {
              alert('중복된 닉네임입니다.');
              signupButton.disabled = false;
              return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(function(userCredential) {
                var user = userCredential.user;
                firebase.firestore().collection('users').doc(user.uid).set({
                  email: email,
                  nickname: nickname
                }).then(function() {
                  alert('회원가입 완료!');
                  location.href = 'login.jsp';
                }).catch(function(error) {
                  alert('회원가입 실패!');
                  signupButton.disabled = false;
                });
              })
              .catch(function(error) {
                alert('회원가입 중 오류 발생!');
                signupButton.disabled = false;
              });
          });
        });
      }

      document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('signup-form');
        form.addEventListener('submit', handleSignUp);
      });
    </script>
    <title>Planify</title>
  </head>
  <body>
    <div class="MainLogin">
      <div class="Mainleft">
         <div class="box">
           <img class="logoimg" src="/image/logo.png" />
         </div>
      </div>
      <div class="Mainright">
         <div class="loginBox">
            <h1 id="loginTitle">회원가입</h1>
            <form id="signup-form" method="post">
               <label>이메일</label><br>
               <input type="email" id="email" name="email" placeholder="이메일" required /><br>
               <label style="margin-top: 20px;">비밀번호</label><br>
               <input type="password" id="password" name="password" placeholder="비밀번호" required /><br>
               <label style="margin-top: 20px;">비밀번호 확인</label><br>
               <input type="password" id="confirm-password" placeholder="비밀번호 확인" required /><br>
               <label style="margin-top: 20px;">이름</label><br>
               <input type="text" id="nickname" name="nickname" placeholder="반드시 본인 이름으로 부탁드립니다." required /><br>
               <button style="margin-top: 20px; margin-bottom: 20px;" type="submit">회원가입</button>
            </form>
         </div>
      </div>
    </div>
  </body>
</html>