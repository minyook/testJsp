<%
    // 세션에서 사용자 정보 제거
    session.invalidate();

    // 성공 응답
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    out.print("{\"status\":\"success\"}");
    out.flush();
%>
