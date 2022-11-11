const footer = document.querySelector('footer')

footer.innerHTML = `
  <address>
    <div>
      <ul class="area">
        <li>브랜드 소개</li>
        <li>창업 안내</li>
        <li>채용</li>
        <li>개인정보 처리방침</li>
      </ul>
      <ul class="area second">
        <li>Contact Us</li>
        <li>고객센터 000-1234-5678</li>
        <li>서울특별시 성동구 성수동2가 280</li>
      </ul>
    </div>
    <div class="logo">
      <img src="../../resources/mergy_qr.png" alt="Merge cake 큐알코드">
    </div>
  </address>
`

export { footer }