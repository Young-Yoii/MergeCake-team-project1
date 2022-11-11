import * as Api from "../api.js";

let header = document.querySelector('header')

header.innerHTML = `
<section class="upper-menu">
  <nav>
    <div class="logo">
      <a href="/"><img src="../resources/merge_cake_logo.png" alt="merge cake image"></a>
    </div>
    <div class="menu">
      <a href="#" id="login"></a>
      <a href="/orderlist" id="mypage">마이페이지</a>
      <a href="/cart" id="cart">장바구니</a>
      <a href="/admin-orders" id="admin">관리자페이지</a>
    </div>
  </nav>
</section>
`

const $login = document.querySelector("#login");
const $admin = document.querySelector("#admin");
const $cart = document.querySelector("#cart");
const $mypage = document.querySelector("#mypage");

// 토큰 정보 가져오기
const email = sessionStorage.getItem("token");

$login.innerText = email ? "로그아웃" : "로그인";

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

const role = sessionStorage.getItem("email");

const getUsers = async (role) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === role);
};

const userInfo = await getUsers(role);

function confirmAdmin() {
  if(userInfo.ROLE === 'admin'){
    $admin.style.display = "block";
    $cart.style.display = "none";
    $mypage.style.display = "none";
  }
  else {
    $admin.style.display = "none";
    $cart.style.display = "block";
    $mypage.style.display = "block";
  }
  return;
}
confirmAdmin(userInfo);

export { header }