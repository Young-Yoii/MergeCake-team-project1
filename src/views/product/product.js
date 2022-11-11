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
// console.log(catArr);

for (let i=0;i<catArr.length;i++){ // 카테고리 개수 만큼 만들기
    const $container = document.querySelector('.product-opt-wrap');

    // console.log(i);
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

$prevBtn.setAttribute('style', 'opacity:0');

console.log(optNumber);

$prevBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none;');
    if (active !==0) active--;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex;');
    $nextBtn.setAttribute('style', 'display:visible');
    if (active === 1) $prevBtn.setAttribute('style', 'opacity:0;');
})

$nextBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none;');
    if (active !==optNumber-1) active++;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex;');
    $prevBtn.setAttribute('style', 'display:visible');
    if (active === optNumber-1) $nextBtn.setAttribute('style', 'opacity:0;');             
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

const $itemPrice = document.querySelector('#productPrice');
const $kcal = document.querySelector('.kcal');
const $g = document.querySelector('.g');

const $b = document.querySelectorAll('input[type="radio"]');

const $lettering = document.querySelector('input[type="text"]');

///////////////////

let totalPrice = 0;
let totalKcal = 0;
let totalG = 0;

let letteringCost = 0;

const $Btns = document.querySelectorAll('input[type="radio"]');

for (let i=0; i<$Btns.length;i++){
    $Btns[i].addEventListener('click', ()=>{
        totalPrice = 0;
        totalKcal = 0;
        totalG = 0;
        const $selectedBtns = document.querySelectorAll('input[type="radio"]:checked +div > span');

        for (let i=0;i<$selectedBtns.length;i++){
            console.log($selectedBtns[i].className.split(',')[3]);
            totalPrice += Number($selectedBtns[i].className.split(',')[4]);
            totalKcal += Number($selectedBtns[i].className.split(',')[2]);
            totalG += Number($selectedBtns[i].className.split(',')[3]);
        }
        totalPrice += letteringCost;
        $itemPrice.innerHTML = `${totalPrice} 원`;

        $kcal.innerHTML = `칼로리 ${totalKcal}`;
        $g.innerHTML = `중량(g) ${totalG}`;
    })
}

let filled = false;

$lettering.addEventListener('focusout', ()=>{
    if ($lettering.value != "" && filled){ // 값이 들어있었고 값이 들어간 상태
        letteringCost = 0;
        filled = true;
    }
    else if ($lettering.value != "" && !filled){ // 값이 들어있지 않았고 추가했다면
        letteringCost = 5000;
        filled = true;
    }
    else if ($lettering.value === "" && filled){ // 값이 있었는데 뺐다면
        letteringCost = -5000;
        filled = false;
    }else if($lettering.value === "" && !filled){ // 값이 없었는데 빈 상태
        letteringCost = 0;
        filled = false;
    }

    totalPrice += letteringCost;
    $itemPrice.innerHTML = `${totalPrice} 원`;
})


/////////////////
// for (let i=0;i<$b.length;i++){
//     $b[i].addEventListener('click', ()=>{

//         let totalPrice = 0;
//         let totalKcal = 0;
//         let totalG = 0;

//         const $selectedBtns = document.querySelectorAll('input[type="radio"]:checked+div>span');

//         for (let i=0;i<$selectedBtns.length;i++){
//             console.log($selectedBtns[i].className.split(',')[3]);
//             totalPrice += Number($selectedBtns[i].className.split(',')[4]);
//             totalKcal += Number($selectedBtns[i].className.split(',')[2]);
//             totalG += Number($selectedBtns[i].className.split(',')[3]);
//         }

//         // $lettering.addEventListener('focusout', ()=>{
//         //     $itemPrice.innerHTML = `${totalPrice} 원`;
//         // })

//         if($lettering.value !=="") totalPrice += 5000;

//         $itemPrice.innerHTML = `${totalPrice} 원`;

//         $kcal.innerHTML = `칼로리 ${totalKcal}`;
//         $g.innerHTML = `중량(g) ${totalG}`;
//     })
// }


// 상세정보
const $up = document.querySelector('.info-arrow-top');
const $down = document.querySelector('.info-arrow-bottom');
const $infoText = document.querySelector('.info-text');
$infoText.setAttribute('style', 'opacity:0');

$up.addEventListener('click', ()=>{
    $infoText.setAttribute('style', 'opacity:0');
})

$down.addEventListener('click', ()=>{
    $infoText.setAttribute('style', 'opacity:100');
})