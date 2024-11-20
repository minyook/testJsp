<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.io.*, javax.servlet.*, javax.servlet.http.*" %>

<%
    // 요청에서 사용자 데이터 가져오기
    String email = request.getParameter("email");
    String nickname = request.getParameter("nickname");

    // 세션 생성 및 사용자 데이터 저장
    HttpSession session = request.getSession();
    session.setAttribute("userEmail", email);
    session.setAttribute("userNickname", nickname);

    // 예를 들어, 추가로 서버에서 사용자 등록 확인 로직을 수행할 수 있음
    if (email != null && nickname != null) {
        // 서버 측 확인 및 로깅
        out.println("서버에서 회원가입 데이터 수신: " + email + " (" + nickname + ")");
        
        // 회원가입 성공 메시지를 클라이언트로 반환
        response.sendRedirect("login.html"); // 성공 후 리다이렉트할 페이지
    } else {
        // 오류 처리
        out.println("잘못된 데이터입니다.");
        response.sendRedirect("join.html"); // 오류 시 다시 회원가입 페이지로 리다이렉트
    }
%>
