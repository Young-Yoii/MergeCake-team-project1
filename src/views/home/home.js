const $login = document.querySelector("#login");

// 토큰 정보 가져오기
const email = sessionStorage.getIte;

$login.innerText = email ? "로그아웃" : "로그인";

$login.addEventListener("click", () => {
  if (!email) {
    // 로그아웃 상태
    window.location.href = "/login";
  } else {
    // 로그인 상태
    sessionStorage.clear();
    window.location.href = "/";
  }
});
