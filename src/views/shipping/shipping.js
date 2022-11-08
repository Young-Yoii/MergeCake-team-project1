import * as Api from "../api.js";
import { validatePhoneNumber } from "../useful-functions.js";

// // 요소(element), input 혹은 상수
const $fullNameInput = document.querySelector("#fullNameInput");
const $phoneNumberInput = document.querySelector("#phoneNumberInput");
const $postcode = document.querySelector("#postcode"); // 우편번호
const $address = document.querySelector("#address"); // 주소
const $detailAddress = document.querySelector("#detailAddress"); // 상세주소
const $extraAddress = document.querySelector("#extraAddress"); // 참고항목
const $checkbox = document.querySelector("#checkbox"); // 배송지 정보 저장

const $phoneNumberError = document.querySelector("#phoneNumber-error");

const $searchAddressButton = document.querySelector("#searchAddressButton");
const $cancelButton = document.querySelector(".cancelButton");
const $submitButton = document.querySelector(".submitButton");

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

// 우편번호 찾기
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
      document.getElementById("detailAddress").focus();
    },
  }).open();
});

// 취소 버튼 클릭
$cancelButton.addEventListener("click", () => {
  window.location.href = "/cart";
});

// 확인 버튼 클릭
$submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const fullName = $fullNameInput.value;
  const phoneNumber = $phoneNumberInput.value;
  const postcode = $postcode.value;
  const address = $address.value;
  const detailAddress = $detailAddress.value;
  const extraAddress = $extraAddress.value;
  const isChecked = $checkbox.checked; // true일 경우 user 정보 수정

  // 잘 입력했는지 확인
  if (!fullName) {
    return alert("이름이 입력되지 않았습니다.");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    return alert("휴대전화 번호 형식이 맞지 않습니다.");
  }
  if (!address) {
    return alert("주소가 입력되지 않았습니다.");
  }
  if (!detailAddress) {
    return alert("상세주소가 입력되지 않았습니다.");
  }

  // 배송지 api 요청
  try {
    const userApi = await Api.get("/api/user");
    const userId = userApi._id;

    const data = {
      FULL_NAME: fullName,
      PHONE_NUMBER: phoneNumber,
      ZIP_CODE: postcode,
      ADDRESS1: address + extraAddress,
      ADDRESS2: detailAddress,
    };

    await Api.patch(`/api/users/${userId}`, data);

    alert(`주문이 완료되었습니다.`);

    // 마이페이지 이동
    window.location.href = "/mypage";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});
