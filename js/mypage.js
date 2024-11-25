const firebaseConfig = {
    apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
    authDomain: "web-project-planify.firebaseapp.com",
    projectId: "web-project-planify",
    storageBucket: "web-project-planify.appspot.com", // Storage Bucket 확인
    messagingSenderId: "97117691884",
    appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
    measurementId: "G-BHGJ3YWP1Z"
  };
  
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();
  var storage = firebase.storage();
  
  // Firebase 인증 상태 변화 감지
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const uid = user.uid;
      sessionStorage.setItem('uid', uid);
      console.log('UID:', uid);
  
      const userNameElement = document.getElementById('userName');
      const emailElement = document.getElementById('email');
      const profileImageElement = document.getElementById('profileImage');
  
      // Firestore에서 사용자 데이터 가져오기
      firestore.collection('users').doc(uid).get().then(function (doc) {
        if (doc.exists) {
          const nickname = doc.data().nickname || '사용자 이름 없음';
          const email = user.email;
          const profilePhoto = doc.data().profilePhoto || "/image/default-profile.png";
  
          userNameElement.textContent = '이름: ' + nickname;
          emailElement.textContent = '아이디: ' + email;
          profileImageElement.src = profilePhoto; // 기본 프로필 사진 설정
        } else {
          console.error('Firestore에서 문서를 찾을 수 없습니다.');
        }
      }).catch(function (error) {
        console.error('Firestore에서 사용자 데이터를 가져오는 중 오류 발생:', error);
      });
  
      // 로그아웃 처리
      document.getElementById('logoutButton').addEventListener('click', function () {
        firebase.auth().signOut().then(function () {
          console.log('로그아웃 성공');
          sessionStorage.removeItem('uid');
          location.href = 'index.html'; // 로그인 페이지로 리다이렉션
        }).catch(function (error) {
          console.error('로그아웃 중 오류 발생:', error);
        });
      });
  
      // 프로필 사진 업로드
      document.getElementById('profileImageUpload').addEventListener('change', async function (event) {
        const file = event.target.files[0];
        if (!file) {
          alert('파일을 선택해주세요!');
          return;
        }
  
        const storageRef = storage.ref(`profile_photos/${uid}/${file.name}`);
  
        try {
          // 파일 미리보기 (기본 이미지 교체)
          const reader = new FileReader();
          reader.onload = function (e) {
            profileImageElement.src = e.target.result; // 미리보기 이미지 설정
          };
          reader.readAsDataURL(file);
  
          // Firebase Storage에 파일 업로드
          const snapshot = await storageRef.put(file);
          console.log('파일 업로드 성공:', snapshot);
  
          // 업로드된 파일의 URL 가져오기
          const downloadURL = await storageRef.getDownloadURL();
          console.log('다운로드 URL:', downloadURL);
  
          // Firestore에 URL 업데이트
          await firestore.collection('users').doc(uid).update({
            profilePhoto: downloadURL
          });
          console.log('Firestore 업데이트 성공');
  
          // 최종 프로필 사진 업데이트
          profileImageElement.src = downloadURL;
          alert('프로필 사진이 성공적으로 업로드되었습니다!');
        } catch (error) {
          console.error('사진 업로드 실패:', error);
  
          // CORS 정책 우회 시도
          handleCORS(error, uid, file);
        }
      });
    } else {
      console.log('사용자가 로그인하지 않았습니다.');
    }
  });
  
  // CORS 정책 우회
  async function handleCORS(error, uid, file) {
    if (error.code === 'storage/unauthorized') {
      console.error('CORS 정책 문제 발생. 프록시 서버를 통해 우회합니다.');
  
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const storageUrl = `https://firebasestorage.googleapis.com/v0/b/web-project-planify.appspot.com/o?name=profile_photos/${uid}/${file.name}`;
  
      try {
        const response = await fetch(proxyUrl + storageUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('프록시 서버를 통한 요청 성공:', result);
        } else {
          console.error('프록시 요청 실패:', response.status);
        }
      } catch (proxyError) {
        console.error('프록시 요청 중 오류 발생:', proxyError);
      }
    } else {
      console.error('CORS 우회 불가능한 오류:', error);
    }
  }
  
  document.getElementById("changePasswordButton").addEventListener("click", function() {
    $('#passwordChangeModal').modal('show');
  });
  
  document.getElementById("changePasswordSubmit").addEventListener("click", function() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
  
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
  
    var user = firebase.auth().currentUser;
    var oldPassword = document.getElementById("oldPassword").value;
  
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
  
  
    user.reauthenticateWithCredential(credential)
      .then(function() {
  
        return user.updatePassword(newPassword);
      })
      .then(function() {
  
        alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
        $('#passwordChangeModal').modal('hide');
  
        firebase.auth().signOut().then(function() {
          // 로그아웃 성공 시 필요한 처리
          console.log("Logged out successfully");
      }).catch(function(error) {
          console.log("Error signing out: ", error);
      });
      })
      .catch(function(error) {
        console.error("Error changing password: ", error);
        alert("비밀번호 변경 중 오류가 발생했습니다.");
        $('#passwordChangeModal').modal('hide');
      });
  });
  
  
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = "block";
  });
  
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  
  document.getElementById("changeNameButton").addEventListener("click", function() {
    $('#changeNameModal').modal('show');
  });
  
  
  document.getElementById("changeNicknameSubmit").addEventListener("click", function() {
    var newNickname = document.getElementById("newNickname").value.trim();
    var user = firebase.auth().currentUser;
  
    if (newNickname === "") {
      alert("새 닉네임을 입력해주세요.");
      return;
    }
  
    // Check for duplicate nickname
    firestore.collection("users").where("nickname", "==", newNickname).get()
      .then(function(querySnapshot) {
        if (!querySnapshot.empty) {
          alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.");
          return;
        }
  
        // Update nickname if not duplicate
        firestore.collection("users").doc(user.uid).update({
          nickname: newNickname
        })
        .then(function() {
          alert("닉네임이 변경되었습니다.");
          $('#changeNameModal').modal('hide');
          location.reload(); // Refresh the page to reflect the updated nickname
        })
        .catch(function(error) {
          console.error("Error changing nickname: ", error);
          alert("닉네임 변경 중 오류가 발생했습니다.");
          $('#changeNameModal').modal('hide');
        });
      })
      .catch(function(error) {
        console.error("Error checking for duplicate nickname: ", error);
        alert("닉네임 중복 확인 중 오류가 발생했습니다.");
      });
  });