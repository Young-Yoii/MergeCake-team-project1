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
      <a href="/orderlist" id="mypage">
        <span class="material-symbols-outlined">person</span>
      </a>
      <a href="/cart" id="cart">
        <span class="material-symbols-outlined">shopping_bag</span>
      </a>
      <a href="/admin-orders" id="admin">
       <span class="material-symbols-outlined">person</span>
      </a>
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

$login.innerHTML = email ? `<span class="material-symbols-outlined">logout</span>` : `<span class="material-symbols-outlined">login</span>`;

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