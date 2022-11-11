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

const $categoryListEl = document.getElementById('categoryList');
const $categoryCreateButton = document.getElementById('categroryCreateBtn');
const $optionContentEl = document.getElementById('optionContent');
const $optionAddButton = document.getElementById('optionAddButton');

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

// 대분류 추가시 색 토글
let flag = true;
let selectedCategoryId = null;
let selectedCategoryNumber = null;
let selectedCategoryName = null;
let beforeSelectedCategoryEl = null;
if ($categoryListEl) {
  $categoryListEl.addEventListener('click', function (e) {
    const {id, no , name} = e.target.dataset
    if (selectedCategoryId !== null && id === selectedCategoryId) {
      selectedCategoryId = null;
      selectedCategoryNumber = null;
      selectedCategoryName = null;
      beforeSelectedCategoryEl.style.color = 'black';
      beforeSelectedCategoryEl = null;
      e.target.style.color = 'black';
    } else {
      selectedCategoryId = id;
      selectedCategoryNumber = no;
      selectedCategoryName = name;
      e.target.style.color = 'red';
      if (beforeSelectedCategoryEl) {
        beforeSelectedCategoryEl.style.color = 'black';
      }
      beforeSelectedCategoryEl = e.target;
      getOptions(selectedCategoryNumber);
    }
  });
}

render();

//카테고리 관련
async function render() {
  const categories = await Api.get('/admin/category');
  categories.forEach((category) => {
    $categoryListEl.insertAdjacentHTML('beforeend', 
      `
      <li class="category-wrap">
        <span data-no=${category.CATEGORY_NO} data-id=${category._id} data-name=${category.CATEGORY_NAME}>${category.CATEGORY_NAME ?? '이름 없음'}</span>
        <div class="button-wrap">
          <button class="updateBtn" data-no=${category.CATEGORY_NO} data-name=${category.CATEGORY_NAME}>수정</button>
          <button class="deleteBtn" data-no=${category.CATEGORY_NO} data-name=${category.CATEGORY_NAME}>삭제</button>
        </button>
      </li>
      `
    );
  });
  const $updateButton = document.getElementsByClassName("updateBtn");
  const $deleteButton = document.getElementsByClassName("deleteBtn");
  Array.from($updateButton).forEach((updateButton) => {
    updateButton.addEventListener('click', updateCategory);
  });
  Array.from($deleteButton).forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteCategory);
  });

  $categoryCreateButton.addEventListener('click', addCategory);

  //카테고리 삭제
  async function deleteCategory(e) {
    e.stopPropagation();
    const isDelete = confirm('정말 삭제하시겠습니까?')
      if(isDelete){
        try {
        const categoryNo = Number(e.target.dataset.no);
        await Api.delete("/admin/category", '', {CATEGORY_NO: categoryNo});
        
        // 삭제 성공
        alert("삭제되었습니다.");
        // 삭제한 아이템 화면에서 지우기
        e.target.closest('li').remove();
        window.location.href = "/admin-category"
        } catch (err) {
          alert(`삭제 과정에서 오류가 발생하였습니다: ${err}`);
        }
      }else{
        window.location.href = "/admin-category"
      }
  }

  //카테고리 수정
  async function updateCategory(e) {
    e.stopPropagation();
    const updateCategoryName = prompt('변경할 카테고리명을 입력해주세요.');
      if (!updateCategoryName.trim()) {
        alert('값을 입력해주세요');
        return;
      }
      const textName = e.target.closest('li').children[0];
      const categoryNo = e.target.dataset.no;
        
      const data = {
        CATEGORY_NO:Number(categoryNo),
        CATEGORY_NAME:updateCategoryName,
      };

      await Api.patch('/admin/category', data);
      textName.textContent = updateCategoryName;
  }
    
  //카테고리 추가
  async function addCategory(e) {
    e.preventDefault();
    const result = prompt('추가할 카테고리명을 입력해주세요.');
      if (result.trim() !== '') {
        const data = {
          CATEGORY_NAME : result,
        };
        const resultApi = await Api.post('/admin/category', data);

        const liEl = document.createElement('li');
          liEl.setAttribute('class' ,'category-wrap');
        const spanEl = document.createElement('span');
        const divEl = document.createElement('div');
          divEl.setAttribute('class' ,'button-wrap');
        const updateBtn = document.createElement('button');
          updateBtn.dataset.id = resultApi._id;
          updateBtn.dataset.no = resultApi.CATEGORY_NO;
        const deleteBtn = document.createElement('button');
          deleteBtn.dataset.id = resultApi._id;
          deleteBtn.dataset.no = resultApi.CATEGORY_NO;
      if (flag) {
        spanEl.dataset.id = resultApi._id;
        spanEl.dataset.no = resultApi.CATEGORY_NO;
        flag = false
      } else {
        spanEl.dataset.id = resultApi._id;
        spanEl.dataset.no = resultApi.CATEGORY_NO;
      }

      spanEl.textContent = result;
      deleteBtn.innerText = "삭제"
      updateBtn.innerText = "수정"

      liEl.appendChild(spanEl);
      liEl.appendChild(divEl);
      divEl.appendChild(updateBtn);
      divEl.appendChild(deleteBtn);
      $categoryListEl.appendChild(liEl);

      updateBtn.setAttribute("class", "updateBtn");
      deleteBtn.setAttribute("class", "deleteBtn");
      updateBtn.addEventListener('click', updateCategory);
      deleteBtn.addEventListener('click', deleteCategory); 
    }else{
      alert('값을 입력해 주세요')
    }
  }
}

//상품관련
async function getOptions(categoryNumber) {
  const options = await Api.get(`/admin/category/${categoryNumber}`);
     $optionContentEl.innerHTML =`
     <tr>
      <th>옵션이름</th>
      <th>추가금액</th>
      <th>칼로리</th>
      <th>중량(g)</th>
      <th>관리</th>
    </tr>
     `

  options.products.forEach((data) => {
    const optionName = data.PRODUCT_NAME;
    const kcal = data.DETAIL.KCAL;
    const gram = data.DETAIL.G;
    const price = (data.DETAIL.PRICE).toLocaleString();
    const categoryNumber = data.CATEGORY_NO;

    $optionContentEl.insertAdjacentHTML('beforeend',
      `<tr id="optionList">
        <td>${optionName}</td>
        <td>${price}</span>
        <td>${kcal}</td>
        <td>${gram}</td>
        <td>
        <button class="optionUpdateButton" data-no=${categoryNumber} data-name=${optionName}>수정</button>
        <button class="optionDeleteButton" data-no=${categoryNumber} data-name=${optionName}>삭제</button>
        </td>
      </tr>`
    )
  })
  const $optionUpdateButton = document.getElementsByClassName("optionUpdateButton");
  const $optionDeleteButton = document.getElementsByClassName("optionDeleteButton");
  Array.from($optionUpdateButton).forEach((updateButton) => {
    updateButton.addEventListener('click', optionUpdate);
  });
  Array.from($optionDeleteButton).forEach((deleteButton) => {
    deleteButton.addEventListener('click', optionDelete);
  });
}

//옵션삭제
async function optionDelete(e) {
    e.preventDefault();
    const categoryNumber = Number(selectedCategoryNumber);
    const productName = e.target.dataset.name;
    try {
      await Api.delete(`/admin/category`, categoryNumber, {  PRODUCT_NAME: productName });
      // 삭제 성공
      alert("삭제되었습니다.");
      
      // 삭제한 아이템 화면에서 지우기
      e.target.closest('li').remove();
  
    } catch (err) {
      alert(`삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
 }

//옵션 수정
async function optionUpdate(e) {
   e.preventDefault();
  
   const newProductName = prompt('변경할 옵션이름을 입력해주세요');
   if (!newProductName.trim()) {
    alert('변경할 이름을 입력해주세요');
    return;
    }
  const newKcal = prompt('변경할 옵션의 칼로리를 입력해주세요');
  if (!newKcal.trim()) {
    alert('변경할 칼로리를 입력해주세요');
    return;
    }
  const newGram = prompt('변경할 옵션의 중량(g)을 입력해주세요');
  if (!newGram.trim()) {
    alert('변경할 중량(g)을 입력해주세요');
    return;
    }
  const newPrice = prompt('변경할 옵션의 추가금액을 입력해주세요');
  if (!newGram.trim()) {
    alert('변경할 금액을 입력해주세요');
    return;
    }
         
  const categoryNo = Number(selectedCategoryNumber);
  const PRODUCT_NAME = newProductName;
  const DETAIL = {
    KCAL: newKcal,
    PRICE: newPrice,
    G: newGram,
  }

  await Api.patch(`/admin/category/${categoryNo}`, { PRODUCT_NAME, DETAIL });

  const ProductName = e.target.closest('li').children[0];
  const Kcal = e.target.closest('li').children[1];
  const Gram = e.target.closest('li').children[2];
  const Price = e.target.closest('li').children[3];

  ProductName.textContent = newProductName;
  Kcal.textContent = newKcal;
  Gram.textContent = newGram;
  Price.textContent = newPrice;
}


//옵션추가
if ( $optionAddButton) {
   $optionAddButton.addEventListener('click', async function (e) {
    if (selectedCategoryId !== null) {
      let $optionKcal = document.querySelector("#optionKcal").value;
      let $optionName = document.querySelector("#optionName").value;
      let $optionPrice = document.querySelector("#optionPrice").value;
      let $optionGram = document.querySelector("#optionGram").value;
      const categoryNo = Number(selectedCategoryNumber);

      const PRODUCT_NAME = $optionName;
        const DETAIL = {
          KCAL: $optionKcal,
          PRICE: $optionPrice,
          G: $optionGram,
        }

      await Api.post(`/admin/category/${categoryNo}`, { PRODUCT_NAME, DETAIL })
      $optionContentEl.insertAdjacentHTML('beforeend',
        `<li>
          <span>${$optionName}</span>
          <span>${$optionPrice}</span>
          <span>${$optionKcal}</span>
          <span>${$optionGram}</span>
          <button id="optionUpdateButton" data-no=${categoryNo} data-name=${$optionName}>수정</button>
          <button id="optionDeleteButton" data-no=${categoryNo} data-name=${$optionName}>삭제</button>
        </li>`
      )

      const $optionUpdateButton = document.querySelector("#optionUpdateButton");
      const $optionDeleteButton = document.querySelector("#optionDeleteButton");
      $optionUpdateButton.addEventListener('click', optionUpdate);
      $optionDeleteButton.addEventListener('click', optionDelete); 
    } else {
      alert('대분류 생성 및 선택을 먼저 해주셔야합니다.');
      return;
    }
  });
 }
