import * as Api from "../api.js";
import { header } from "../components/header.js";
import { footer } from "../components/footer.js";

insertHeader()
insertFooter()

async function insertHeader() {
  document.body.insertAdjacentElement("afterBegin" , header)
}

async function insertFooter() {
  document.body.insertAdjacentElement("beforeend" , footer)
}

// 요소(element), input 혹은 상수
const $ordersContainer = document.getElementById("ordersContainer");
const $modal = document.getElementById("modal");
const $modalBackground = document.getElementById("modalBackground");
const $modalCloseButton = document.getElementById("modalCloseButton");
const $deleteCompleteButton = document.getElementById("deleteCompleteButton");
const $deleteCancelButton = document.getElementById("deleteCancelButton");
const email = sessionStorage.getItem("email");
let orderIdToDelete;

insertOrders()
addAllEvents();

function addAllEvents() {
  $modalBackground.addEventListener("click", closeModal);
  $modalCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", keyDownCloseModal);
  $deleteCompleteButton.addEventListener("click", deleteOrderData);
  $deleteCancelButton.addEventListener("click", cancelDelete);
}

const getUsers = async (email) => {
  const userList = await Api.get("/api/userlist");
  return userList.find((user) => user.EMAIL === email);
};

const userInfo = await getUsers(email);
let user = document.getElementById('userName');

const setUserName = (userName) => {
    user.innerHTML = (!userName ? userName : "mergy회원") + "님";
}

setUserName(userInfo)
//회원확인
async function insertOrders() {
  const orders = await Api.get(`/mypage/orderlist/${email}`);
  if(email === null){
    alert('로그인이 필요합니다');
    window.location.href="/login"
  }

  orders.forEach(data => {
    const order_no = data.order_no;
    const select_no = data.orderData[0].select_no;
    const state = data.state;
    const obj = data.orderData[0].selectData[0].createdAt.split("T")[0];
    const total_price = parseInt(data.orderData[0].selectData[0].OPTIONS.price)+18000;
    const local = total_price.toLocaleString();
    const optionObj = data.orderData[0].selectData[0].OPTIONS;
    let optionValue = "";

    for (const [key, value] of Object.entries(optionObj)) {
      optionValue += `- ${key}: ${value}<br>`;
    }

    $ordersContainer.insertAdjacentHTML(
      "beforeend",
      `
      <tr id="order-${order_no}">
        <td>${obj}</td>
        <td class="product-info" data-no=${order_no} data-id=${select_no}>
           ${optionValue}
        </td>
	      <td>${local !== undefined ? `${local}` : `0`}</td>
		  <td><span class="state" id="state-${order_no}">${state}</span>
      </td>
      <td>
        <button class="edit-btn" id="updateButton-${order_no}" data-no=${order_no} data-id=${select_no}>주문 수정</button>
        <button class="cancle-button" id="deleteButton-${order_no}">주문 취소</button>
      </td>
	  </tr>
     `
  )
  // 요소 선택
    const $deleteButton = document.querySelector(`#deleteButton-${order_no}`);
    
    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    $deleteButton.addEventListener("click", () => {
      orderIdToDelete = order_no;
      openModal();
    })
  })

  const $updateButton = document.getElementsByClassName(`edit-btn`);
  Array.from($updateButton).forEach((updateButton) => {
    updateButton.addEventListener('click', updateOption);
  });

async function updateOption(e){
    e.stopPropagation();
  
    const newDesignName = prompt('변경할 디자인 이름을 입력해주세요');
    if (!newDesignName.trim()) {
     alert('변경할 값을 입력해주세요');
     return;
     }
   const newSheet = prompt('변경할 옵션의 시트를 입력해주세요');
   if (!newSheet.trim()) {
     alert('변경할 값을 입력해주세요');
     return;
     }
   const newCream = prompt('변경할 크림색상을 입력해주세요');
   if (!newCream.trim()) {
     alert('변경할 값을 입력해주세요');
     return;
     }
   const newTopping = prompt('변경할 토핑을 입력해주세요');
   if (!newTopping.trim()) {
     alert('변경할 값을 입력해주세요');
     return;
     }
     const orderno = Number(e.target.dataset.no);
     const select_no = Number(e.target.dataset.id);
    const OPTIONS = {
        "디자인" : newDesignName,
        "시트" : newSheet,
        "맛" : newCream,
        "토핑" : newTopping,
        "price" : 1000,
    }
    await Api.patch(`/mypage/orderlist/${orderno}/${select_no}` , { OPTIONS })
    const targetEl = document.querySelector(".product-info")
    targetEl.innerHTML = `
    -디자인 : ${newDesignName}<br>
    -시트 : ${newSheet}<br>
    -맛 : ${newCream}<br>
    -토핑 : ${newTopping}
    `
    }   
}

// db에서 주문취소 변경
async function deleteOrderData(e) {
    e.preventDefault();
  
    try {
      await Api.patch(`/mypage/orderlist/${orderIdToDelete}`);
  
      // 삭제 성공
      alert("주문이 취소되었습니다.");
   
      // 전역변수 초기화
      orderIdToDelete = "";
      closeModal();
      window.location.href="/orderlist"

    } catch (err) {
      alert(`주문취소 과정에서 오류가 발생하였습니다: ${err}`);
    }
  }
  
  // Modal 창에서 아니오 클릭할 시, 전역 변수를 다시 초기화함.
  function cancelDelete() {
    orderIdToDelete = "";
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
  