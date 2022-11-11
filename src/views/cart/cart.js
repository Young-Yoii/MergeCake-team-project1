import * as APi from "../api.js";

let user = document.querySelector('.user-name');

const email = sessionStorage.getItem("email");
if (!email){
  user.innerHTML = '비회원님';
}else{

const getUsers = async (email) => {
  const userList = await APi.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);

console.log(userInfo);

const setUserName = (userName) => {
    user.innerHTML = `${userName.FULL_NAME !== undefined ? userName.FULL_NAME + '님' : "머지회원님"}`
}

setUserName(userInfo);
}
let num = 0;

const $checkAll = document.querySelector(".check-all");
const $checkboxes = document.querySelectorAll('td > input');
const $deleteBtn = document.querySelector('.delete-btn');

// 모달
const $modal = document.querySelector(".modal-container");
const $closeBtn = document.querySelector(".close-btn");
const $orderBtn = document.querySelector(".order-btn");

// 장바구니 셀 개수
const CELLPERROW = 6;

// 장바구니에 속한 상품
const $basketContents = document.querySelector("#basket-contents");

Object.keys(localStorage).forEach((x,i)=>{
  const $tr = document.createElement('tr'); // 행
  const $checkbox = document.createElement('input'); // 체크박스
  $checkbox.setAttribute("type","checkbox");
  $checkbox.setAttribute('id', `${num++}`);

  $basketContents.appendChild($tr);

  let price = 0;
  for (let j=0;j<CELLPERROW;j++){
    const $td = document.createElement('td'); // 셀
    if (j===0) $td.appendChild($checkbox);

    if (j===1){
      // $td.innerText = "이미지x";
    }
    if (j===2){
      const keys = Object.keys(JSON.parse(localStorage.getItem(x)));
      for (let k=0;k<keys.length-1;k++){
        const $div = document.createElement('div'); // div 만들기
        const $span1 = document.createElement('span'); //
        const $span2 = document.createElement('span'); //
        const $span3 = document.createElement('span'); //

        $span1.textContent = `${keys[k]}`;
        $span2.textContent = `${JSON.parse(localStorage.getItem(x))[keys[k]]}`;
        $span3.textContent = ' : ';
        
        $div.appendChild($span1);
        $div.appendChild($span3);
        $div.appendChild($span2);
        $td.appendChild($div);
      }
      price = JSON.parse(localStorage.getItem(x))[keys[keys.length-1]];
    }

  //   if (j===3){
  //   const $div = document.createElement('div'); // div 만들기
  //   const $input = document.createElement('input');

  //   $input.setAttribute('type', 'number');
  //   $input.setAttribute('value', 1);
  //   $input.setAttribute('class', 'order-count');
  //   $input.setAttribute('min', 0);

  //   $div.appendChild($input);
  //   $td.appendChild($div);
  // }

  if (j===3){
    $td.setAttribute('class', 'price');
    $td.innerText = `${price}`;
  }

  if (j===4){
    $td.innerText = `3000`;
  }  
    $tr.appendChild($td);
  }
});

const deselect = () => {
  const checkboxes = document.querySelectorAll('tbody td input[type="checkbox"]');
  for (let i=0; i<checkboxes.length;i++)
    if (checkboxes[i].checked) checkboxes[i].checked = false;
};

const selectAll = () => {
  const checkboxes = document.querySelectorAll('tbody td input[type="checkbox"]');
  for (let i=0; i<checkboxes.length;i++)
    if (!checkboxes[i].checked) checkboxes[i].checked = true;
}

$checkAll.addEventListener("click", ()=>{
  if ($checkAll.checked) selectAll();
  else deselect();
})

$deleteBtn.addEventListener('click', ()=>{
  const checkboxes = document.querySelectorAll('tbody td input[type="checkbox"]');
  // let cartIds = JSON.parse(sessionStorage.getItem('cartIds'));

  for (let i=0;i<localStorage.length;i++){
    if(checkboxes[i].checked){
      localStorage.removeItem(Object.keys(localStorage)[i]);
    }
  }
  window.location.reload();
})

// function itemPrice(){
// 수량 증감에 따라 주문 금액 변함
// }

function totalPrice() {
  const $totalPrice = document.querySelector('.order-container > div');
  let price = 0;
  const $items = document.querySelectorAll('td[class="price"]');
  $items.forEach((x,i)=>{
    price = price + parseInt(x.innerText);
  });
  
  $totalPrice.innerText = '총 금액 ' + (Number(price) + 3000*($items.length));
}

totalPrice();

// function setNumber() {
//   const result = [];
//   const inputs = document.querySelectorAll('input[type="number"]');
//   const keys = Object.keys(localStorage);

//   keys.forEach((x,i)=>{
//     const obj = JSON.parse(localStorage.getItem(x));
//     obj["수량"] += inputs[i].value;
//   })
//   console.log(result);
// }

// 전송 데이터 준비
// const data = {
//   OPTIONS : {
//     시트 : "동그라미",
//     price : 100
//   }
// };

// Object.keys(localStorage).forEach((x,i)=>{
//   data["OPTIONS"] = JSON.parse(localStorage.getItem(x));  
// })

// const data = {};
// Object.keys(localStorage).forEach((x,i)=>{
//   data[i] = {};
//   data[i].OPTIONS = JSON.parse(localStorage.getItem(x));
// })  

// 서버에 post 요청하기
// const postData = await APi.post('/cart', data);

// console.log(data);

// console.log("data : ", data);

// 모달창 버튼 // 주문하기 눌렀을 때 비회원이면 로그인 페이지로, 회원이면 추가 정보 입력 페이지로
$orderBtn.addEventListener("click", async () => {

  if (localStorage.length===0){
    alert('장바구니가 비어있습니다.');
    return;
  }
  const token = sessionStorage.getItem('token'); // 토큰 가져오기
  if (!token){
    window.location.href = '/login';
  }else{

    window.location.href = '/shipping';
  }
  
  // $modal.classList.add("show");
  // setNumber();
  // console.log(JSON.parse(localStorage.getItem("0")));

  // num = 0;
  // localStorage.clear();
});
$closeBtn.addEventListener("click", () => {
  $modal.classList.remove("show");
});

// setInterval(()=>{
//   window.location.reload();
// }, 5000);