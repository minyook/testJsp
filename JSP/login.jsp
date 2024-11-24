<%@ page import="com.google.firebase.auth.FirebaseAuth" %>
<%@ page import="com.google.firebase.auth.FirebaseAuthException" %>
<%@ page import="com.google.firebase.database.DatabaseReference" %>
<%@ page import="com.google.firebase.database.FirebaseDatabase" %>
<%@ page import="java.io.PrintWriter" %>

<%
    String email = request.getParameter("email");
    String password = request.getParameter("password");

    try {
        // Firebase Admin SDK로 사용자 인증
        FirebaseAuth auth = FirebaseAuth.getInstance();
        String uid = auth.verifyPassword(email, password).getUid();

        // 사용자 정보를 세션에 저장
        session.setAttribute("uid", uid);
        session.setAttribute("email", email);

        // 성공 응답
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"status\":\"success\",\"uid\":\"" + uid + "\"}");
        out.flush();
    } catch (FirebaseAuthException e) {
        // 오류 응답
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        out.flush();
    }
%>
