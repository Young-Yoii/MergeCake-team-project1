import * as Api from "../api.js";

const $usersContainer = document.getElementById("userList");
const $modal = document.getElementById("modal");
const $modalBackground = document.getElementById("modalBackground");
const $modalCloseButton = document.getElementById("modalCloseButton");
const $deleteCompleteButton = document.getElementById("deleteCompleteButton");
const $deleteCancelButton = document.getElementById("deleteCancelButton");
let userIdToDelete;

//어드민 확인
const email = sessionStorage.getItem("email");

const getUsers = async (email) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);

function confirmAdmin() {
    if(userInfo.ROLE === 'user'){
      alert('권한이 없습니다.');
      window.location.href = '/';
    }
    else if(userInfo.ROLE === undefined){
      alert('로그인을 해주세요');
      window.location.href = '/login';
    }
  return;
}
confirmAdmin(userInfo);

insertUsers();
addAllEvents();

function addAllEvents() {
  $modalBackground.addEventListener("click", closeModal);
  $modalCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", keyDownCloseModal);
  $deleteCompleteButton.addEventListener("click", deleteUserData);
  $deleteCancelButton.addEventListener("click", cancelDelete);
}

async function insertUsers() {
  const users = await Api.get("/admin/userlist");
  
  users.forEach(data => {
    const id = data._id;
    const email = data.EMAIL;
    const name = data.FULL_NAME;
    const role = data.ROLE;

    let date="";
    if(data.createdAt === undefined){
      date="가입날짜가 없습니다."
    }
    else{
      date = data.createdAt.split("T")[0];
    }

    let roleName;
    if(role === `user` || role === undefined){
      roleName = '회원'
    }else {
      roleName = '관리자'
    }

    $usersContainer.insertAdjacentHTML(
      "beforeend",
      `
      <tr id="user-${email}" class="row">
        <td>${date}</td>
        <td>${email}</td>
        <td>${name !== undefined ? `${name}` : '머지회원'}</td>
        <td>${roleName}</td>
        <td><button id="userDleteButton-${email}"}>유저 삭제</button></td>
      </tr>
      `
    );

    const $userDleteButton = document.getElementById(`userDleteButton-${email}`)

     // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
     $userDleteButton.addEventListener("click", () => {
      userIdToDelete = email;
      openModal();
    });
  });
}

// db에서 회원정보 삭제
async function deleteUserData(e) {
  e.preventDefault();

  try {
    await Api.delete(`/admin/userlist/${userIdToDelete}`);

    // 삭제 성공
    alert("회원 정보가 삭제되었습니다.");

    // 삭제한 아이템 화면에서 지우기
    const deletedItem = document.getElementById(`user-${userIdToDelete}`);
    deletedItem.remove();

    // 전역변수 초기화
    userIdToDelete = "";
    closeModal();

  } catch (err) {
    alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}

// Modal 창에서 아니오 클릭할 시, 전역 변수를 다시 초기화함.
function cancelDelete() {
  userIdToDelete = "";
  closeModal();
}

// Modal 창 열기
function openModal() {
  $modal.classList.add("is-active");
}

// Modal 창 닫기
function closeModal() {
  $modal.classList.remove("is-active");
}

// 키보드로 Modal 창 닫기
function keyDownCloseModal(e) {
  // Esc 키
  if (e.keyCode === 27) {
    closeModal();
  }
}