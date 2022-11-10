import * as Api from "../api.js";

// 요소(element), input 혹은 상수
const $ordersContainer = document.getElementById("ordersContainer");
const $modal = document.getElementById("modal");
const $modalBackground = document.getElementById("modalBackground");
const $modalCloseButton = document.getElementById("modalCloseButton");
const $deleteCompleteButton = document.getElementById("deleteCompleteButton");
const $deleteCancelButton = document.getElementById("deleteCancelButton");
let orderIdToDelete;


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


insertOrders()
addAllEvents();

function addAllEvents() {
  $modalBackground.addEventListener("click", closeModal);
  $modalCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", keyDownCloseModal);
  $deleteCompleteButton.addEventListener("click", deleteOrderData);
  $deleteCancelButton.addEventListener("click", cancelDelete);
}
  
async function insertOrders() {
  const orders = await Api.get("/admin/ordercheck");

  orders.forEach(data => {
    const order_no = data.order_no;
    const email = data.email;
    const state = data.state;
    const obj = data.orderData[0].selectData[0].createdAt.split("T")[0];
    const total_price = parseInt(data.orderData[0].selectData[0].OPTIONS.price)+18000;
    const optionObj = data.orderData[0].selectData[0].OPTIONS;
    let optionValue = "";

    for (const [key, value] of Object.entries(optionObj)) {
      optionValue += `- ${key}: ${value} <br>`;
    }

    $ordersContainer.insertAdjacentHTML(
      "beforeend",
      `
      <tr id="order-${order_no}">
        <td>${obj}</td>
        <td>${email}</td>
        <td class="product-info">
          <p> ${optionValue}</p>
        </td>
	      <td>${total_price !== undefined ? `${total_price}` : `0`}</td>
		    <td><span id="state-${order_no}">${state}</span>
          <div id="number">
            <input type="text" placeholder="운송장 번호" class="waybill-input" id="billingNumber-${order_no}">
          </div>
          <select name = "배송상태 수정" class="state" id="statusSelectBox-${order_no}">
          <option value="none">배송상태 수정</option>
          <option 
            class=""
            ${state === "상품 준비중" ? "selected" : ""} 
            value="상품 준비중">
            상품 준비중
          </option>
			    <option class=""
            ${state === "배송중" ? "selected" : ""} 
            value="배송중">
            배송중
            </option>
			      <option class=""
            ${state === "배송완료" ? "selected" : ""} 
            value="배송완료">
            배송완료
          </option>
		    </select>
      </td>
      <td>
        <button class="cancle-button" id="deleteButton-${order_no}">주문 취소</button>
      </td>
	  </tr>
     `
  )
  // 요소 선택
    const $statusSelectBox = document.querySelector(`#statusSelectBox-${order_no}`);
    const $deleteButton = document.querySelector(`#deleteButton-${order_no}`);
    const $billingNumber = document.querySelector(`#billingNumber-${order_no}`);
    const $state = document.querySelector(`#state-${order_no}`);

      // 이벤트 - 상태관리 박스 수정 시 바로 db 반영 (상태, 운송장정보)
    $statusSelectBox.addEventListener("change", async () => {
      const newStatus = $statusSelectBox.value;
      let waybill = $billingNumber.value;

      if(!waybill){
        alert('운송장 번호를 입력해 주세요.');
        newStatus = `${state}`
      }else if(waybill){
        // api 요청
      // const data = {
      //   waybill : waybill,
      //   STATE : newStatus,
      // }
      await Api.patch(`/admin/ordercheck/${order_no}/${waybill}`, { STATE :newStatus });
      $state.innerHTML = newStatus;
      $billingNumber.value = waybill;
      }
    });

    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    $deleteButton.addEventListener("click", () => {
      orderIdToDelete = order_no;
      openModal();
    });
  })
}

// db에서 주문정보 삭제
async function deleteOrderData(e) {
    e.preventDefault();
  
    try {
      await Api.delete(`/admin/ordercheck/${orderIdToDelete}`);
  
      // 삭제 성공
      alert("주문 정보가 삭제되었습니다.");
  
      // 삭제한 아이템 화면에서 지우기
      const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
      deletedItem.remove();
  
      // 전역변수 초기화
      orderIdToDelete = "";
      closeModal();

    } catch (err) {
      alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
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
  