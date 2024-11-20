document.addEventListener("DOMContentLoaded", function() {
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
  console.log(firebase); // Firebase 객체 확인
});
  var firestore = firebase.firestore();
  // Firebase 인증 상태 변화 감지
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // 로그인 상태
      var uid = user.uid;
      sessionStorage.setItem('uid', uid);
      console.log('UID:', uid);
  
  
  
      var userNameElement = document.getElementById('userName');
      var emailElement = document.getElementById('email');
      firestore.collection('users').doc(uid).get().then(function (doc) {
        var nickname = doc.data().nickname;
        var email = user.email;
        userNameElement.textContent = '이름: ' + nickname;
        emailElement.textContent = '아이디: ' + email;
      }).catch(function (error) {
        console.log('Error getting user document:', error);
      });
  
  
  
  
  
  
    } else {
      // 로그아웃 버튼 클릭 이벤트 추가
      document.getElementById('logoutButton').addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            // 로그아웃 성공 시
            console.log('로그아웃 성공');
            sessionStorage.removeItem('uid');
            location.href = 'index.html'; // 로그아웃 후 이동할 페이지
        }).catch(function(error) {
            // 로그아웃 중 에러 발생 시
            console.log('Error during logout:', error);
        });
    });
    }
  });
  