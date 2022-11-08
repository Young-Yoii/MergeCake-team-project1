import * as Api from "../api.js";
import { validateEmail, validatePassword } from "../useful-functions.js";

// 요소(element), input 혹은 상수
const $emailInput = document.querySelector("#emailInput");
const $passwordInput = document.querySelector("#passwordInput");

const $submitButton = document.querySelector(".submitButton");

// 잘 입력했는지 확인
const isEmailValid = (email) => validateEmail(email);
const isPasswordValid = (password) => validatePassword(password);
const isPasswordSame = (password, passwordConfirm) =>
  password === passwordConfirm;

// 로그인 진행
$submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = $emailInput.value;
  const password = $passwordInput.value;

  // 잘 입력했는지 확인
  if (!isEmailValid(email)) {
    return alert("이메일 형식이 맞지 않습니다.");
  }

  if (!isPasswordValid(password)) {
    return alert("비밀번호 형식이 맞지 않습니다.");
  }

  if (!isEmailValid(email) && !isPasswordValid(password)) {
    return alert("이메일, 비밀번호 형식이 맞지 않습니다.");
  }

  // 로그인 api 요청
  try {
    const data = { EMAIL: email, PASSWORD: password };

    const result = await Api.post("/api/login", data);
    const token = result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    sessionStorage.setItem("token", token);

    alert(`정상적으로 로그인되었습니다.`);

    // 기본 페이지로 이동
    window.location.href = "/";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});
