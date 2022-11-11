// 이전 버튼
// const $prevBtn = document.querySelector('.prev');
// const $nextBtn = document.querySelector('.next');
// const $optContainter = document.querySelector('#opt-container');
// const optNumber = $optContainter.children.length-1 < 0 ? 0 : $optContainter.children.length-1;

// let active = 0;

// $prevBtn.addEventListener('click', ()=>{
//     const $prevOpt = document.querySelector(`#opt-${active}`);
//     $prevOpt.setAttribute('style', 'display:none;');
//     if (active !==0) active--;
//     const $nextOpt = document.querySelector(`#opt-${active}`);
//     $nextOpt.setAttribute('style', 'display:flex;');
// })

// $nextBtn.addEventListener('click', ()=>{
//     const $prevOpt = document.querySelector(`#opt-${active}`);
//     $prevOpt.setAttribute('style', 'display:none;');
//     if (active !==optNumber-1) active++;
//     const $nextOpt = document.querySelector(`#opt-${active}`);
//     $nextOpt.setAttribute('style', 'display:flex;');                 
// })

// const $itemPrice = document.querySelector('.product-price');

// const $b = document.querySelectorAll('input[type="radio"]');

// console.log($b);
// for (let i=0;i<$b.length;i++){
//     $b[i].addEventListener('click', ()=>{

//         const $selectedBtns = document.querySelectorAll('input[type="radio"]:checked+div>span');
        
//         for (let i=0;i<$selectedBtns.length;i++){
//             console.log($selectedBtns[i].className.split(',')[4]);
//         }
//     })
// }