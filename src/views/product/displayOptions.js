import * as APi from "../api.js";
// DB에서 항목들을 가져와서 렌더링 진행

const getItems = async () => {
    const data = await APi.get('/main/product');
    return data;
}

// console.log(await getItems());

// console.log(await APi.get('/main/product'));

const totalTypes = (await getItems()); // 카테고리 넘버들
// console.log(totalTypes);

// const pushInfo = async (data) => {
//     Categories.push(data);
// }

const getData = async (number) => {
    const data = await APi.get(`/main/product/${number}`);
    return data;
}

// const getProducts = async ()

const makeContent = (i, name) => {
    return `<div id="opt-${i}" class="select">
    <h2 class="title">${name}</h2>
    <div id=${i} class="content">
    <p class="optionName"></p>
    <ul class="list">
    </ul>
    </div>
    </div>`;
};

const makeLettering = (i, name) => {
    return `<div id="opt-${i}" class="select">
        <h2 class="title">${name}</h2>
        <div id=${i} class="content">
          <p class="optionName">문구 입력</p>
          <input type="text" class="문구입력" name="cake-lettering" placeholder="문구를 입력 해 주세요" id="sl" value="" >
        </div>
      </div>`;
}

const makeList = (name, productName, KCAL, G, PRICE) =>{
 return `<li>
    <label class="label" for="${name} : ${productName}">
      <input name="${name}" type="radio" id="${name} : ${productName}" value="">
      <div>
        <span class="${name},${productName},${KCAL},${G},${PRICE}">${productName}</span>
      </div>
  </li>`;
};

const catArr = (await getItems());
console.log(catArr);

for (let i=0;i<catArr.length;i++){ // 카테고리 개수 만큼 만들기
    const $container = document.querySelector('.product-opt-wrap');

    console.log(i);
    const catName = catArr[i].CATEGORY_NAME; // 카테고리 이름

    if (catName === "레터링"){
        $container.innerHTML += makeLettering(i, catName);
    }else{
        $container.innerHTML += makeContent(i, catName); // 컨텐츠 출력
    
    const $ul = document.querySelector(`div[id="opt-${i}"] ul`);

    const products = (await getData(catArr[i].CATEGORY_NO)).products; // 상품 배열

    let listContents = "";


    for (let i=0;i<products.length;i++){

        const item = products[i]; // 상품 하나
        const itemInfo = item.DETAIL; // 상품 정보

        const [KCAL, G, PRICE] = [itemInfo.KCAL, itemInfo.G, itemInfo.PRICE];

        listContents += makeList(catName, item.PRODUCT_NAME, KCAL, G, PRICE);
    }
        $ul.innerHTML += listContents;
    }
}


const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');
const $optContainter = document.querySelector('#opt-container');
const optNumber = $optContainter.children.length-1 < 0 ? 0 : $optContainter.children.length-1;

let active = 0;

$prevBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none;');
    if (active !==0) active--;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex;');
})

$nextBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none;');
    if (active !==optNumber-1) active++;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex;');                 
})

const $orderSubmit = document.querySelector('#orderSubmit');

$orderSubmit.addEventListener('click', ()=>{
    const $options = document.querySelectorAll('input[type="radio"]:checked');

    if ($options.length === 0) {
        alert('옵션을 선택해주세요.');
        return;
    }

    const token = JSON.parse(sessionStorage.getItem('token')); // 토큰 가져오기
    console.log(token);
    if (!token){
        window.location.href = '/login';
    }else{
        window.location.href = '/shipping';
    }
})

// const display = async () => {
//     totalTypes.forEach(async (x,i)=>{
//         const number = x.CATEGORY_NO; // 카테고리 번호
//         const name = x.CATEGORY_NAME; // 카테고리 이름
//         let productName;
//         let detail;

//         const products = await APi.get(`/main/product/${number}`); // 상품 배열
//         const productNum = products.products.length;

//         console.log("상품 개수", productNum);

//         $container.innerHTML = makeContent(i, name, productName); // 카테고리 개수만큼
        
//         // 상품 배열에서 하나씩 빼오면서 이름과 디테일 가져오기

//         const makeList = async (products) => {
//                 products.forEach(async (x,j)=>{
//                     const pn = products[j].PRODUCT_NAME; // 상품 이름
//                     const d = products[j].DETAIL; // 상품 상세 내용 객체

//                     productName = pn;
//                     detail = d;

//                     console.log(number, name, productName, detail);

//                 })

//             }

//         await makeList(products.products); // 상품 개수만큼 리스트 만들기

            

            
//         }
//     );
// }

// await display();







// for (let i=0;i<totalTypes;i++){
//     const data = await APi.get(`/main/product/${i}`);
//     await pushInfo(data);
// }

// console.log(Categories);


// (await getItems()).forEach((x, i) => {
//     console.log(x);
//     const categoryNum = x.CATEGORY_NO;
//     console.log(categoryNum);
// })