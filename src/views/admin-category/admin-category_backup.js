import * as Api from "../api.js";
import * as Template from "./template.js";

const $nameInput = document.querySelector("#inputName");
const $subNameInput = document.querySelector("#inputSubName");
const $optionSelect = document.querySelector("#optChoose");

const $optionContent = document.querySelector("#optContent");
const $optionAddBtn = document.querySelector("#addOptBtn");
const $addCategoryBtn = document.querySelector("#cateCreate");
const $categoryList = document.querySelector("#categoryTree");
const $btnDelete = document.querySelector("#deleteBtn");
const $subCategoryBtn = document.querySelector("#createSubCategory");

function render() {
    getCategoryData()
}

async function getCategoryData() {
    const catrgories = await Api.get('/api/category');

    const html = catrgories.map((item) => Template.showListTemplate(item).join(''));
    $categoryList.insertAdjacentHTML('beforeend', html);
}

async function submitButtonEvent(e) {
    e.preventDefault();
        if (!$nameInput.value) {
            $nameInput.focus();
         return;
    }

        if (!$subNameInput.value) {
          $subNameInput.focus();
        return;
    }

    const name = $nameInput.value;
    const subName = $subNameInput.value;
    if(name && subName){
        catrgories.forEach(async category => {
            if(category.CATEGORY_BIG !== name || category.CATEGORY_SMALL !== subName) {
                const data = {
                    'CATEGORY_BIG': name,
                    'CATEGORY_SMALL': subName,
                }
                await Api.patch('/category', data);
            }
        });
    }

    const formData = new FormData();
    formData.append('CATEGORY_BIG' ,name);
    formData.append('CATEGORY_SMALL' ,subName);
}


async function deleteBtn(e) {
    e.preventDefault();

    const isDelete = confirm("정말 삭제하시겠습니까?");

    if(isDelete) {
        try{
          const target = categoryDelete.dataset;
          await Api.delete('/category', target);
          render()
        }catch(err){
          alert(`오류가 발생하였습니다: ${err}`);
        }  
    }
}

$addCategoryBtn.addEventListener('click', () => {
    const html = Template.showListTemplate()
    $categoryList.insertAdjacentHTML('afterend', html)
})

$subCategoryBtn.addEventListener('click', () => {
    const html = `
    <p>서브 카테고리 설정</p>
        <table>
          <tr>
            <th>서브 카테고리 이름</th>
            <td>
              <input type="text" class="input-option-name" id="inputOptionName">
            </td>
          </tr>
          <tr>
            <th>옵션선택</th>
            <td>
              <select id="optChoose" name="옵션형식선택">
                <option value="album">앨범형</option>
                <option value="color">색상선택형</option>
                <option value="inputText">문구입력형</option>
                 <option value="text">텍스트형</option>
              </select>
            </td>
            <td><button id="addOptBtn">옵션 추가</button></td>
          </tr>
        </table>
      </div>
      <div class="opt-list">
        <ul id="optContent">
          <li>
            <span><input type="checkbox"></span>
            <span>옵션 정보</span>
          </li>
        </ul>
      </div>

    `
    document.querySelector('#registerCategoryForm').insertAdjacentHTML('beforeend', html);
    document.querySelector('#addOptBtn').addEventListener('click', showOption)
})

function showOption(e) {
    e.preventDefault()
    
    const optionValue = ($optionSelect.options[$optionSelect.selectedIndex].value);

    if(optionValue === 'album') {
        const html = Template.addImgTemplate()
        $optionContent.insertAdjacentHTML('afterend', html)
    }else if(optionValue === 'color'){
        const html = Template.addColorTemplate()
        $optionContent.insertAdjacentHTML('afterend', html)
    }else if(optionValue === 'text'){
        const html = Template.addTextTemplate()
        $optionContent.insertAdjacentHTML('afterend', html)
    }else if(optionValue === 'inputText'){
        const html = Template.addInputTemplate()
        $optionContent.insertAdjacentHTML('afterend', html)
    }

}

$optionAddBtn.addEventListener('click', showOption);


// function onKeyUp() {
//     const treeName =  $nameInput.value;
//     $nameOutput.innerText = treeName;
// }
    


render()