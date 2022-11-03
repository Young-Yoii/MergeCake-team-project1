const $modal = document.querySelector(".modal-container");
const $closeBtn = document.querySelector(".close-btn");
const $orderBtn = document.querySelector(".order-btn");

$orderBtn.addEventListener("click", () => {
  $modal.classList.add("show");
});
$closeBtn.addEventListener("click", () => {
  $modal.classList.remove("show");
});
