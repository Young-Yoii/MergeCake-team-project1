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
    // const $categoryWrap = document.querySelector("#categoryWrap");

    const categories = await Api.get('/admin/category');
    categories.forEach((category) => {
        console.log(category);
      $categoryTreeEl.insertAdjacentHTML('beforeend', 
        `
        <li id="categoryWrap">
          <span data-no=${category.CATEGORY_NO} data-id=${category._id}>${category.CATEGORY_NAME ?? '이름 없음'}</span>
          <button class="updateBtn" data-no=${category.CATEGORY_NO}>수정</button>
          <button class="deleteBtn" data-no=${category.CATEGORY_NO}>삭제</button>
       </li>
        `
      );
    });
    //렌더링 해온 것들... 버튼 작동안함,, 새로추가한 요소들만 작동됨...
    const $updateButton = document.getElementsByClassName("updateBtn");
    const $deleteButton = document.getElementsByClassName("deleteBtn");
    Array.from($updateButton).forEach((updateButton) => {
      updateButton.addEventListener('click', updateCategory);
    });
    Array.from($deleteButton).forEach((deleteButton) => {
      deleteButton.addEventListener('click', deleteCategory);
    });

    $cateCreateBtn.addEventListener('click', addCategory);

    //카테고리 삭제 카테고리 넘버를 보내줘야함 만약에 카테고리에 상품이 있다면 삭제가 불가능
    //근데 카테고리 넘버가 안받아와짐...ㅎR...
    async function deleteCategory(e) {
        e.preventDefault();

        const isDelete = confirm('정말 삭제하시겠습니까?')
        if(isDelete){
          try {
            const textName = e.target.closest('li').children[0];
            const categoryName = textName.textContent;

            const categoryEl = categories.findIndex(category => category.CATEGORY_NAME === categoryName)
            const categoryNo = categories[categoryEl]

            await Api.delete("/admin/category", categoryNo.CATEGORY_NO);
       
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

     //카테고리 수정 시 카테고리 이름, 넘버 보내줘야하는데 여기도 넘버가 안받아와짐
    async function updateCategory(e) {
       e.preventDefault();
      
       const updateCategoryName = prompt('변경할 카테고리명을 입력해주세요.');
        if (!updateCategoryName.trim()) {
          alert('값을 입력해주세요');
          return;
        }
        const textName = e.target.closest('li').children[0];
        const text = textName.textContent;

        const categoryObj = categories.filter((i) => i.CATEGORY_NAME === text);
        console.log(categoryObj)
        const categoryNo = categoryObj.CATEGORY_NO;
        
        const data = {
          CATEGORY_NO:categoryNo,
          CATEGORY_NAME:updateCategoryName,
        }
   
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
                spanEl.dataset.id = result;
                flag = false
            } else {
                spanEl.dataset.id = result;
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


    //상품관련
    const $addOptBtn = document.getElementById('addOptBtn');
    // const $optionKcal = document.querySelector("#optionKcal").value;
    // const $optionName = document.querySelector("#optionName").value;
    // const $optionColor = document.querySelector("#optionColor").value;
    // const $optionPrice = document.querySelector("#optionPrice").value;
    // const $optionGram = document.querySelector("#optionGram").value;

    //옵션삭제
    async function optionDelete(e) {
        e.preventDefault();
        try {
        //   await Api.delete("/admin/category", id);
      
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
      
    //    $optionKcal = e.target.closest('li').children[0];
    //    $optionName = e.target.closest('li').children[1];
    //    $optionColor = e.target.closest('li').children[2];
    //    $optionPrice = e.target.closest('li').children[3];
    //    $optionGram = e.target.closest('li').children[4];
    //prompt 로 받을지????이게 간편하긴 할듯...
            // if (!updateCategoryName.trim()) {
            //   alert('값을 입력해주세요');
            //   return;
            // }
            // const textName = e.target.closest('li').children[0];
            // await Api.patch('/admin/category', updateCategoryName);
        
            // textName.textContent = updateCategoryName;
    }
     
    //옵션추가
    if ($addOptBtn) {
        $addOptBtn.addEventListener('click', async function (e) {
            if (selectedCategoryId !== null) {
                
              const data = {
                PRODUCT_NAME: $optionName, 
                DETAIL: {
                  KCAL: $optionKcal,
                  PRICE: $optionPrice,
                  GRAM: $optionGram,
                  }
                }

                await Api.post('/admin/category', categoryNo, data)
            } else {
                alert('대분류 생성 및 선택을 먼저 해주셔야합니다.');
                return;
            }
        });
    
    // const id = categories.forEach((category) => category)
    //대분류 카테고리 선택하면 실행하는 함수
    //카테고리에 속한 옵션 렌더링
    //그럼 대분류 카테고리를 선택했을 때 아이디를 기억해야겠네?...?>..?아모르겠다 ㅠ
  }
}

async function getOptions(categoryNumber) {
    const options = await Api.get(`/admin/category/${categoryNumber}`);

    const $optContentEl = document.getElementById('optContent');
    options.products.forEach((data) => {
        const optionName = data.products[0].PRODUCT_NAME;
        const kcal = data.products[0].DETAIL.KCAL;
        const gram = data.products[0].DETAIL.GRAM;
        const price = data.products[0].DETAIL.PRICE;

        $optContentEl.insertAdjacentHTML('beforeend',
            `<li>
          <span>${optionName}</span>
          <span>${price}</span>
          <span>${kcal}</span>
          <span>${gram}</span>
          <button id="optionUpdateButton">수정</button>
          <button id="optionDeleteButton">삭제</button>
        </li>`
        )

    })

    const $optionUpdateButton = document.querySelector("#optionUpdateButton");
    const $optionDeleteButton = document.querySelector("#optionDeleteButton");

    // $optionUpdateButton('click', optionUpdate);
    // $optionDeleteButton('click', optionDelete);
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