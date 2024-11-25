<%@ page import="com.google.firebase.FirebaseApp" %>
<%@ page import="com.google.firebase.FirebaseOptions" %>
<%@ page import="com.google.firebase.auth.FirebaseAuth" %>
<%@ page import="com.google.firebase.auth.FirebaseAuthException" %>
<%@ page import="com.google.firebase.database.FirebaseDatabase" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="org.json.JSONObject" %>

<%
    // Firebase 초기화 (한 번만 실행)
    if (FirebaseApp.getApps().isEmpty()) {
        FileInputStream serviceAccount = new FileInputStream("/path/to/serviceAccountKey.json");

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://your-database-name.firebaseio.com/")
            .build();

        FirebaseApp.initializeApp(options);
    }

    // 요청 데이터 읽기
    String email = request.getParameter("email");
    String password = request.getParameter("password");

    response.setContentType("application/json");
    JSONObject jsonResponse = new JSONObject();

    try {
        // Firebase 인증 사용자 확인
        FirebaseAuth auth = FirebaseAuth.getInstance();
        UserRecord userRecord = auth.getUserByEmail(email);

        // Firestore 또는 Realtime Database에서 추가 정보 가져오기
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        String nickname = database.getReference("users").child(userRecord.getUid()).get().getValue(String.class);

        // 세션에 사용자 정보 저장
        session.setAttribute("email", email);
        session.setAttribute("nickname", nickname);

        jsonResponse.put("status", "success");
        jsonResponse.put("message", "로그인 성공!");
        response.getWriter().write(jsonResponse.toString());
    } catch (FirebaseAuthException e) {
        jsonResponse.put("status", "error");
        jsonResponse.put("message", "로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
        response.getWriter().write(jsonResponse.toString());
    } catch (Exception e) {
        e.printStackTrace();
        jsonResponse.put("status", "error");
        jsonResponse.put("message", "로그인 중 오류 발생: " + e.getMessage());
        response.getWriter().write(jsonResponse.toString());
    }
%>
