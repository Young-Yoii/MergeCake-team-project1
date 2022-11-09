import * as Api from "../api.js";

const $email = document.querySelector("#email");
const $name = document.querySelector(".name");
const $phoneNumber = document.querySelector(".phone-number");
const $address = document.querySelector(".address");
const $moreInformationForm = document.querySelector("#more-information-form");

// DB 가져오기
const email = sessionStorage.getItem("email");

const getUsers = async (email) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);
const setUserInfo = (targetUserInfo) => {
  // console.log(userInfo._id);
  // 이름 없으면 회원님....

  const name = targetUserInfo.FULL_NAME ?? "";
  const phoneNumber = targetUserInfo.PHONE_NUMBER
    ? targetUserInfo.PHONE_NUMBER
    : "입력 없음";
  const address = targetUserInfo.ZIP_CODE
    ? targetUserInfo.ZIP_CODE +
      targetUserInfo.ADDRESS1 +
      targetUserInfo.ADDRESS2
    : "입력 없음";

  // const zipC

  $email.innerText = email;
  $name.innerText = name;
  $phoneNumber.innerText = phoneNumber;
  $address.innerText = address;
};
setUserInfo(userInfo);

$moreInformationForm.addEventListener("click", function (e) {
  // 추가정보 - 수정하기
  if (e.target.classList.contains("edit-btn")) {
    const targetEl = e.target;
    const inputEl = targetEl.parentElement.querySelector("input");
    inputEl.style.display = "block";
    const labelEl = targetEl.parentElement.querySelector("label");
    labelEl.style.display = "none";
    const containerEl =
      targetEl.parentElement.parentElement.querySelector(".button-container");
    containerEl.style.display = "block";
    targetEl.style.display = "none";
  }

  // 추가정보 - 취소
  if (e.target.classList.contains("cancel-button")) {
    const targetEl = e.target;
    const inputEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > input"
    );
    inputEl.style.display = "none";
    const labelEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > label"
    );
    labelEl.style.display = "block";
    const containerEl = targetEl.parentElement;
    containerEl.style.display = "none";
    const editBtnEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > .edit-btn"
    );
    editBtnEl.style.display = "block";
  }
});

$moreInformationForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const targetUserId = userInfo._id;

  const params = {
    FULL_NAME:
      e.target.FULL_NAME.value.trim() === ""
        ? null
        : e.target.FULL_NAME.value.trim(),
    PHONE_NUMBER:
      e.target.PHONE_NUMBER.value.trim() === ""
        ? null
        : e.target.PHONE_NUMBER.value.trim(),
  };

  try {
    const result = await Api.patch(`/api/users/${targetUserId}`, params);
    e.target.parentElement.querySelector(".cancel-button").click();
    setUserInfo(result);
  } catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});
