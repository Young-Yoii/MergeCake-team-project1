import * as APi from "../api.js"

const $displayItems = document.querySelector("product-opt-wrap");

// 이전 버튼
const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');
const $optContainter = document.querySelector('#opt-container');
const optNumber = $optContainter.children.length-1 < 0 ? 0 : $optContainter.children.length-1;

// console.log(optNumber);
let active = 0;

$prevBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none');
    if (active !==0) active--;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex');
})

$nextBtn.addEventListener('click', ()=>{
    const $prevOpt = document.querySelector(`#opt-${active}`);
    $prevOpt.setAttribute('style', 'display:none');
    if (active !==optNumber-1) active++;
    const $nextOpt = document.querySelector(`#opt-${active}`);
    $nextOpt.setAttribute('style', 'display:flex');                 
})