import * as Api from "../api.js";

const $email = document.querySelector("#email");
const $name = document.querySelector(".name");
const $phoneNumber = document.querySelector(".phone-number");
const $address = document.querySelector(".address");

const $editBtns = document.querySelectorAll(".edit-btn");

// DB 가져오기
const email = sessionStorage.getItem("email");

const getUsers = async (email) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);

// console.log(userInfo._id);
// 이름 없으면 회원님....

const name = "ㅇㅇㅇ";
// const name = userInfo.FULL_NAME ? userInfo.FULL_NAME : "입력 없음";
const phoneNumber = userInfo.PHONE_NUMBER ? userInfo.PHONE_NUMBER : "입력 없음";
const address = userInfo.ZIP_CODE
  ? userInfo.ZIP_CODE + userInfo.ADDRESS1 + userInfo.ADDRESS2
  : "입력 없음";

// const zipC

$email.innerText = email;
$name.innerText = name;
$phoneNumber.innerText = phoneNumber;
$address.innerText = address;

$editBtns.forEach((editButton) => {
  editButton.addEventListener("click", (e) => {
    e.preventDefault();

    const $form = e.target.closest("form");
    const $label = $form.querySelector("label");
    const $content = $label.innerText;
    const $input = $form.querySelector('input[type="text"]');
    $input.value = $content;

    const $buttonContainer = $form.querySelector(".button-container");
    const $edit = $form.querySelector(".edit-btn");
    $buttonContainer.style.display = "block";
    $edit.style.display = "none";

    $label.style.display = "none";
    $input.style.display = "block";

    // 취소 버튼 누른 경우
    const $cancelButton = $form.querySelector(".cancel-button");
    $cancelButton.addEventListener("click", (e) => {
      e.preventDefault();

      $buttonContainer.style.display = "none";
      $edit.style.display = "block";

      $label.style.display = "block";
      $input.style.display = "none";
      console.log("c");
    });

    // 확인 버튼 누른 경우
    const $submitButton = $form.querySelector(".submit-button");
    $submitButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const id = userInfo._id;
      console.log(id);
      console.log($input.querySelector());
      console.log($input.value);

      const data = {
        FULL_NAME: name,
        PHONE_NUMBER: $input.value,
        // target id에 따라 key 값 변경
      };

      console.log(data);

      try {
        await Api.patch(`/users/${id}`, data);
        alert("dddd");
      } catch (err) {
        console.error(err.stack);
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }

      $buttonContainer.style.display = "none";
      $edit.style.display = "block";

      $label.style.display = "block";
      $input.style.display = "none";

      console.log("s");
    });
  });
});
