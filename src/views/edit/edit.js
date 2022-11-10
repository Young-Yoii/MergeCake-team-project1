import * as Api from "../api.js";
import { validatePhoneNumber, validatePassword } from "../useful-functions.js";

// 요소(element), input 혹은 상수
const $userName = document.querySelector(".user-name");
const $email = document.querySelector("#email");
const $passwordInput = document.querySelector("#password");
const $passwordConfirmInput = document.querySelector("#password-confirm");
const $nameInput = document.querySelector("#name");
const $phoneNumberInput = document.querySelector("#phone-number");

const $moreInformationForm = document.querySelector("#more-information-form");

const $withdrawButton = document.querySelector(".withdraw-btn");

// 에러 관련 요소(element), input 혹은 상수
const $passwordError = document.querySelector("#password-error");
const $passwordConfirmError = document.querySelector("#passwordConfirm-error");
const $phoneNumberError = document.querySelector("#phoneNumber-error");

// // 잘 입력했는지 확인 (비밀번호)
const isPasswordValid = (password) => validatePassword(password);
const isPasswordSame = (password, passwordConfirm) =>
  password === passwordConfirm;

// 비밀번호 확인
$passwordInput.addEventListener("keyup", () => {
  const password = $passwordInput.value;
  if (!password) {
    $passwordError.classList.remove("correct-input");
    $passwordError.innerHTML = "비밀번호는 필수정보 입니다.";
  } else if (!isPasswordValid(password)) {
    $passwordError.classList.remove("correct-input");
    $passwordError.innerHTML =
      "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
  } else {
    $passwordError.classList.add("correct-input");
    $passwordError.innerHTML = "사용 가능한 비밀번호입니다.";
  }
});

// 비밀번호 재확인
$passwordConfirmInput.addEventListener("keyup", () => {
  const password = $passwordInput.value;
  const passwordConfirm = $passwordConfirmInput.value;
  if (!isPasswordSame(password, passwordConfirm)) {
    $passwordConfirmError.classList.remove("correct-input");
    $passwordConfirmError.innerHTML = "비밀번호가 일치하지 않습니다.";
  } else {
    $passwordConfirmError.classList.add("correct-input");
    $passwordConfirmError.innerHTML = "비밀번호가 일치합니다.";
  }
});

// 휴대전화 번호 확인
$phoneNumberInput.addEventListener("keyup", () => {
  const phoneNumber = $phoneNumberInput.value;
  if (!phoneNumber) {
    $phoneNumberError.classList.remove("correct-input");
    $phoneNumberError.innerHTML = "휴대전화 번호는 필수정보 입니다.";
  } else if (!validatePhoneNumber(phoneNumber)) {
    $phoneNumberError.classList.remove("correct-input");
    $phoneNumberError.innerHTML = "올바른 휴대전화 번호 형식이 아닙니다.";
  } else {
    $phoneNumberError.classList.add("correct-input");
    $phoneNumberError.innerHTML = "올바른 휴대전화 번호 형식입니다.";
  }
});

// 주소 관련 요소(element), input 혹은 상수
const $postcodInput = document.querySelector("#postcode");
const $addressInput = document.querySelector("#address");
const $detailAddressInput = document.querySelector("#detailAddress");
const $extraAddressInput = document.querySelector("#extraAddress");
const $searchAddressButton = document.querySelector("#searchAddressButton");

// user 정보 가져오기
const email = sessionStorage.getItem("email");

const getUsers = async (email) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);
const setUserInfo = (targetUserInfo) => {
  const name = targetUserInfo.FULL_NAME ?? "";
  const password = targetUserInfo.PASSWORD ?? "";
  const passwordConfirm = targetUserInfo.PASSWORD ?? "";
  const phoneNumber = targetUserInfo.PHONE_NUMBER ?? "";
  const postcode = targetUserInfo.ZIP_CODE ?? "";
  const address = targetUserInfo.ADDRESS1 ?? "";
  const detailAddress = targetUserInfo.ADDRESS2 ?? "";
  const extraAddress = targetUserInfo.ADDRESS1_REF ?? "";

  $userName.innerText = (name ? name : "회원") + "님";
  $email.innerText = email;
  $nameInput.value = name;
  $passwordInput.value = password;
  $passwordConfirmInput.value = passwordConfirm;
  $phoneNumberInput.value = phoneNumber;
  $postcodInput.value = postcode;
  $addressInput.value = address;
  $detailAddressInput.value = detailAddress;
  $extraAddressInput.value = extraAddress;
};
setUserInfo(userInfo);

$moreInformationForm.addEventListener("click", async (e) => {
  // 수정하기
  if (e.target.classList.contains("edit-btn")) {
    const targetEl = e.target;
    const inputEl = targetEl.parentElement.querySelector("input");

    inputEl.readOnly = e.target.classList.contains("findPostcode")
      ? true
      : false;

    // 비밀번호 변경
    if (e.target.classList.contains("change-password-btn")) {
      $passwordInput.value = "";
      $passwordConfirmInput.value = "";

      $passwordConfirmInput.readOnly = false;
    }

    const containerEl =
      targetEl.parentElement.parentElement.querySelector(".button-container");
    containerEl.style.display = "block";
    targetEl.style.display = "none";
  }

  // 취소
  if (e.target.classList.contains("cancel-button")) {
    const targetEl = e.target;
    const inputEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > input"
    );

    inputEl.readOnly = true;

    // 비밀번호 변경 취소
    if (e.target.classList.contains("cancel-password-btn")) {
      $passwordInput.readOnly = true;
      $passwordConfirmInput.readOnly = true;
    }

    const containerEl = targetEl.parentElement;
    containerEl.style.display = "none";
    const editBtnEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > .edit-btn"
    );
    editBtnEl.style.display = "block";

    $passwordError.innerHTML = "";
    $passwordConfirmError.innerHTML = "";
    $phoneNumberError.innerHTML = "";

    const userInfo = await getUsers(email);
    setUserInfo(userInfo);
  }

  // 확인
  if (e.target.classList.contains("submit-button")) {
    const targetEl = e.target;
    const inputEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > input"
    );
    $phoneNumberError.innerHTML = "";
    inputEl.readOnly = true;

    if (e.target.parentElement.querySelector(".cancel-password-btn")) {
      $passwordInput.readOnly = true;
      $passwordConfirmInput.readOnly = true;
    }

    const containerEl = targetEl.parentElement;
    containerEl.style.display = "none";
    const editBtnEl = targetEl.parentElement.parentElement.querySelector(
      ".input-field > .edit-btn"
    );
    editBtnEl.style.display = "block";
  }
});

// 주소 수정
$searchAddressButton.addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      let addr = ""; // 주소 변수
      let extraAddr = ""; // 참고항목 변수

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("extraAddress").value = extraAddr;
      } else {
        document.getElementById("extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").value = "";
      document.getElementById("detailAddress").readOnly = false;
      document.getElementById("detailAddress").focus();
    },
  }).open();
});

// 확인
$moreInformationForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const password = e.target.PASSWORD.value.trim();
  const fullName = e.target.FULL_NAME.value.trim();
  const phoneNumber = e.target.PHONE_NUMBER.value.trim();
  const postcode = e.target.ZIP_CODE.value.trim();
  const address = e.target.ADDRESS1.value.trim();
  const detailAddress = e.target.ADDRESS2.value.trim();
  const extraAddress = e.target.ADDRESS1_REF.value.trim();

  if (
    !$passwordError.classList.contains("correct-input") &&
    $passwordError.innerHTML
  ) {
    const userInfo = await getUsers(email);
    setUserInfo(userInfo);

    $passwordError.innerHTML = "";
    $passwordConfirmError.innerHTML = "";

    return alert("비밀번호 형식이 맞지 않습니다.");
  }

  if (
    !$passwordConfirmError.classList.contains("correct-input") &&
    $passwordConfirmError.innerHTML
  ) {
    const userInfo = await getUsers(email);
    setUserInfo(userInfo);

    $passwordError.innerHTML = "";
    $passwordConfirmError.innerHTML = "";

    return alert("비밀번호가 일치하지 않습니다.");
  }

  if (!validatePhoneNumber(phoneNumber) && phoneNumber) {
    const userInfo = await getUsers(email);
    setUserInfo(userInfo);

    $phoneNumberError.innerHTML = "";

    return alert("올바른 휴대전화 번호 형식이 아닙니다.");
  }

  const targetUserId = userInfo._id;
  const data = {
    PASSWORD: password === "" ? null : password,
    FULL_NAME: fullName === "" ? null : fullName,
    PHONE_NUMBER: phoneNumber === "" ? null : phoneNumber,
    ZIP_CODE: postcode === "" ? null : postcode,
    ADDRESS1: address === "" ? null : address,
    ADDRESS2: detailAddress === "" ? null : detailAddress,
    ADDRESS1_REF: extraAddress === "" ? null : extraAddress,
  };

  try {
    await Api.patch(`/api/users/${targetUserId}`, data);
    $userName.innerText = fullName;

    const userInfo = await getUsers(email);
    setUserInfo(userInfo);
  } catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});

// 탈퇴하기 버튼 클릭
$withdrawButton.addEventListener("click", async () => {
  try {
    await Api.delete(`/mypage/useredit/${email}`);

    alert("정상적으로 탈퇴되었습니다.");
  } catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});
