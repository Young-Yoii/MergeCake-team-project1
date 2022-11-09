import * as Api from "../api.js";


const $categoryTreeEl = document.getElementById('categoryTree');
const $cateCreateBtn = document.getElementById('cateCreate');

// 대분류 추가
let flag = true;
let selectedCategoryId = null;
let selectedCategoryNumber = null;
let beforeSelectedCategoryEl = null;
if ($categoryTreeEl) {
    $categoryTreeEl.addEventListener('click', function (e) {
        const {id, no} = e.target.dataset
        if (selectedCategoryId !== null && id === selectedCategoryId) {
            selectedCategoryId = null;
            selectedCategoryNumber = null;
            beforeSelectedCategoryEl.style.color = 'black';
            beforeSelectedCategoryEl = null;
            e.target.style.color = 'black';
        } else {
            selectedCategoryId = id;
            selectedCategoryNumber = no;
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


//카테고리 불러오기
async function render() {
  
    const categories = await Api.get('/admin/category');
    categories.forEach((category) => {
        console.log(category);
      $categoryTreeEl.insertAdjacentHTML('beforeend', 
        `
        <li id="categoryWrap">
          <span data-no=${category.CATEGORY_NO} data-id=${category._id} data-name=${category.CATEGORY_NAME}>${category.CATEGORY_NAME ?? '이름 없음'}</span>
          <button class="updateBtn" data-no=${category.CATEGORY_NO} data-name=${category.CATEGORY_NAME}>수정</button>
          <button class="deleteBtn" data-no=${category.CATEGORY_NO} data-name=${category.CATEGORY_NAME}>삭제</button>
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

    $cateCreateBtn.addEventListener('click', addCategory);

    async function deleteCategory(e) {
        e.preventDefault();

        const isDelete = confirm('정말 삭제하시겠습니까?')
        if(isDelete){
          try {
            const categoryNo = Number(e.target.dataset.no);
            await Api.delete("/admin/category", '', { CATEGORY_NO :categoryNo });
       
           // 삭제 성공
           alert("삭제되었습니다.");
           
           // 삭제한 아이템 화면에서 지우기
           e.target.closest('li').remove();
       
         } catch (err) {
           alert(`삭제 과정에서 오류가 발생하였습니다: ${err}`);
         }
        }else{
          window.location.href = "/admin-category"
        }
     }

    
    async function updateCategory(e) {
       e.preventDefault();
      
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
   
        await Api.patch('/admin/category', '', data);

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
          console.log(resultApi);
           
            const liEl = document.createElement('li');
            const spanEl = document.createElement('span');
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
            liEl.appendChild(updateBtn);
            liEl.appendChild(deleteBtn);
            $categoryTreeEl.appendChild(liEl);

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
const $optionKcal = document.querySelector("#optionKcal").value;
const $optionName = document.querySelector("#optionName").value;
const $optionPrice = document.querySelector("#optionPrice").value;
const $optionGram = document.querySelector("#optionGram").value;

async function getOptions(categoryNumber) {
  const options = await Api.get(`/admin/category/${categoryNumber}`);

  const $optContentEl = document.getElementById('optContent');
  options.products.forEach((data) => {
      const optionName = data.PRODUCT_NAME;
      const kcal = data.DETAIL.KCAL;
      const gram = data.DETAIL.G;
      const price = data.DETAIL.PRICE;
      const categoryNumber = data.CATEGORY_NO;

      $optContentEl.insertAdjacentHTML('beforeend',
          `<li>
        <span>${optionName}</span>
        <span>${price}</span>
        <span>${kcal}</span>
        <span>${gram}</span>
        <button id="optionUpdateButton" data-id=${categoryNumber} data-name=${optionName}>수정</button>
        <button id="optionDeleteButton" data-id=${categoryNumber} data-name=${optionName}>삭제</button>
      </li>`
      )

  })

  const $optionUpdateButton = document.querySelector("#optionUpdateButton");
  const $optionDeleteButton = document.querySelector("#optionDeleteButton");

  $optionUpdateButton('click', optionUpdate);
  $optionDeleteButton('click', optionDelete);
}

//옵션삭제
async function optionDelete(e) {
    e.preventDefault();
    const categoryNumber = e.target.dataset.id
    const productName = e.target.dataset.name

    try {
      await Api.delete("/admin/category", categoryNumber, productName);
  
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
   const newKcal = prompt('변경할 옵션의 칼로리를 입력해주세요');
   const newGram = prompt('변경할 옵션의 중량(g)을 입력해주세요');
   const newPrice = prompt('변경할 옵션의 추가금액을 입력해주세요');

        // if (!updateCategoryName.trim()) {
        //   alert('값을 입력해주세요');
        //   return;
        // }
        const categoryNo = selectedCategoryNumber;
        const data = {
          PRODUCT_NAME: newProductName, 
          DETAIL: {
              KCAL: newKcal,
              PRICE: newGram,
              GRAM: newPrice,
            },
        }
        
        await Api.patch('/admin/category', categoryNo, data);
    
        const ProductName = e.target.closest('li').children[0];
        const Kcal = e.target.closest('li').children[1];
        const Gram = e.target.closest('li').children[2];
        const Price = e.target.closest('li').children[3];

       
    
        ProductName.textContent = newProductName;
        Kcal.textContent = newKcal;
        Gram.textContent = newGram;
        Price.textContent = newPrice;
}
const $addOptBtn = document.querySelector("#addOptBtn")
//옵션추가
if ($addOptBtn) {
    $addOptBtn.addEventListener('click', async function (e) {
        if (selectedCategoryId !== null) {
          const categoryNo = selectedCategoryNumber;
    
          const data = {
            PRODUCT_NAME: $optionName, 
            DETAIL: {
              KCAL: $optionKcal,
              PRICE: $optionPrice,
              GRAM: $optionGram,
              },
            }

            await Api.post('/admin/category', categoryNo, { data })
        } else {
            alert('대분류 생성 및 선택을 먼저 해주셔야합니다.');
            return;
        }
    });

}



 

// function makeCategoryBoxHTML(newCategoryName) {
//     return `
//         <li id="categoryWrap">
//           <span data-id=${newCategoryName}>${newCategoryName}</span>
//           <button class="updateBtn">수정</button>
//           <button class="deleteBtn">삭제</button>
//        </li>
//       `
// }
