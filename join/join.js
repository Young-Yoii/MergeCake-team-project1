const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const $email = document.querySelector("#user-email");
console.log($email);

$email.addEventListener("keyup", () => {
  if (!emailRegex.test($email.value)) {
    const html = `<span class="input-error" style="display: none">이메일 주소가 올바르지 않습니다.</span>`;
    $email.appendChild(html);
  }
});

console.log($email);
