<%@ page import="com.google.firebase.FirebaseApp" %>
<%@ page import="com.google.firebase.FirebaseOptions" %>
<%@ page import="com.google.firebase.auth.FirebaseAuth" %>
<%@ page import="com.google.firebase.auth.UserRecord" %>
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
    String nickname = request.getParameter("nickname");

    response.setContentType("application/json");
    JSONObject jsonResponse = new JSONObject();

    try {
        // Firebase 인증 사용자 생성
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
            .setEmail(email)
            .setPassword(password)
            .setDisplayName(nickname);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);

        // Firestore 또는 Realtime Database에 추가 정보 저장
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        database.getReference("users").child(userRecord.getUid()).setValueAsync(nickname);

        jsonResponse.put("status", "success");
        jsonResponse.put("message", "회원가입 성공!");
        response.getWriter().write(jsonResponse.toString());
    } catch (Exception e) {
        e.printStackTrace();
        jsonResponse.put("status", "error");
        jsonResponse.put("message", "회원가입 중 오류 발생: " + e.getMessage());
        response.getWriter().write(jsonResponse.toString());
    }
%>
