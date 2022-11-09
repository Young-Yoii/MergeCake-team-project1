import * as Api from "../api.js";

const $usersContainer = document.querySelector("#userList");
insertUsers();

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
      <tr id="user-${id}" class="row">
        <td>${date}</td>
        <td>${email}</td>
        <td>${name !== undefined ? `${name}` : '회원'}</td>
        <td>${roleName}</td>
      </tr>
      `
    );
  });
}