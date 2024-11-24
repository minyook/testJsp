<%@ page import="com.google.firebase.database.FirebaseDatabase" %>
<%@ page import="com.google.firebase.database.DatabaseReference" %>
<%@ page import="java.io.PrintWriter" %>

<%
    String uid = (String) session.getAttribute("uid");
    if (uid == null) {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"status\":\"error\",\"message\":\"로그인이 필요합니다.\"}");
        out.flush();
        return;
    }

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("users").child(uid);

    // 사용자 정보 가져오기
    String nickname = ref.child("nickname").get().get();
    String email = (String) session.getAttribute("email");

    // JSON 응답 반환
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    out.print("{\"status\":\"success\",\"nickname\":\"" + nickname + "\",\"email\":\"" + email + "\"}");
    out.flush();
%>
