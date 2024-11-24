<%@ page import="com.google.firebase.database.FirebaseDatabase" %>
<%@ page import="com.google.firebase.database.DatabaseReference" %>

<%
    String uid = (String) session.getAttribute("uid");
    if (uid == null) {
        response.sendRedirect("login.jsp");
        return;
    }

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("users").child(uid);
    String nickname = ref.child("nickname").get().get();
%>

<div>
    <p>이름: <%= nickname %></p>
    <p>아이디: <%= session.getAttribute("email") %></p>
</div>
