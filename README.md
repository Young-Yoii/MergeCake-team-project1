# 🍰 MergeCake 
<img src=src/views/resources/merge_showcase.png  width="50%"/>

> 원하는 모양으로 케이크를 만들고 🎂 <br />장바구니에 추가하고 🧸,
> 또 주문을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트입니다. <br />
<br />

## ✅ 시연 영상

<details><summary>회원가입</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442645-f5b2eb42-bd4d-4d64-97c2-5393f8f6b2f9.gif">
</details>

<details><summary>로그인</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442772-a3c2fd4e-1ce1-424a-bbe8-68fa92e891a5.gif">
</details>

<details><summary>일반 회원 - 주문 </summary>
<img src="https://user-images.githubusercontent.com/108056754/215444740-d2786b92-8ac3-462f-8736-bcb6a61a13ff.gif">
<img src="https://user-images.githubusercontent.com/108056754/215442775-07b2f4dd-86ba-4a9d-b78b-947d5fff309a.gif">
</details>

<details><summary>일반 회원 - 회원 정보 RUD</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442857-7a1f1976-355e-41d6-a03f-c5dd5f9e0470.gif">
</details>

<details><summary>관리자 - 주문 내역 RUD</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442723-96f90596-2d4b-42de-9761-c2db0fe7ef77.gif">
</details>

<details><summary>관리자 - 회원 관리 RD</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442753-239e3fe2-c4fb-46b7-94d9-7825c6a14e00.gif">
</details>

<details><summary>관리자 - 카테고리 & 상품 CRUD</summary>
<img src="https://user-images.githubusercontent.com/108056754/215442762-d9f68fe5-8398-42a0-bb72-07c2281297b4.gif">
<img src="https://user-images.githubusercontent.com/108056754/215442900-a42f5dc0-4420-4cf1-bf27-dfcc3a115ab2.gif">
</details>

<br />

## ✅ 페이지별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://user-images.githubusercontent.com/108056754/215431085-20d7d9be-3458-440a-8ca3-24247e400f4b.png) | ![image](https://user-images.githubusercontent.com/108056754/215431284-700b8110-87d4-4490-9b32-b4425d60eec7.png) |
| 메인 페이지 | 회원가입 |
| ![image](https://user-images.githubusercontent.com/108056754/215431485-71d568f8-72d5-456e-8868-361f062ed4c0.png) | ![image](https://user-images.githubusercontent.com/108056754/215431616-754e2b22-bfae-454a-b99b-b7d75c719118.png) |
| 로그인 | 케이크 주문 과정 |
| ![image](https://user-images.githubusercontent.com/108056754/215431778-94ccd66f-5401-4b03-b16a-f0f1bdeb9f11.png) | ![image](https://user-images.githubusercontent.com/108056754/215431919-0863cef8-76d9-4e92-904a-8e2c12fc3807.png) |
| 결제 | 일반 회원 - 주문 관리 |
| ![image](https://user-images.githubusercontent.com/108056754/215432097-35d01086-c274-4a5b-ac9e-475c55989999.png) |![image](https://user-images.githubusercontent.com/108056754/215432290-567b93c8-105c-4721-b6e7-17c30b523aab.png) |
| 일반회원 - 정보 관리 | 관리자 - 주문 관리 |
| ![image](https://user-images.githubusercontent.com/108056754/215432655-589a646c-c5d0-4b2f-b8e1-ea91f7e2b226.png) | ![image](https://user-images.githubusercontent.com/108056754/215432784-7ba8cb7e-20e5-42ef-aa26-3097c919d96b.png) |
| 관리자 - 회원 관리 | 관리자 - 카테고리 관리 |


### 💡 배포링크
http://kdt-sw3-team09.elicecoding.com/
<br />

### 서비스 소개
<hr />

1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, 장바구니에서 CRUD 작업이 가능함.
    - 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리 (localStorage)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
6. 다음 우편번호 api 사용하여 주소입력 가능.
7. nodemailer 사용 - 임시 비밀번호 발급 가능.
<br />

![image](src/views/resources/service.png)

<br />

### 기술 스택
<hr />

![image](src/views/resources/skillstack.PNG)

<br />

### 인프라 구조
<hr />

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

#### 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

### User Flow
<hr />

![image](src/views/resources/userflow.PNG)

### 제작자
<hr />

| 이름 | 담당 업무 |
| ------ | ------ |
| 김현아 | 팀장, BE / DB 설계, 주문 관련 API, 카테고리 관련 API, 배포 |
| 허지윤 | BE / DB 설계, 유저 관련 API, 주문 관련 API, nodemailer |
| 조가영 | FE / 관리자 카테고리 관리, 관리자 주문 관리, 관리자 회원 관리, 회원 주문 조회 (마이페이지),  css |
| 정지훈 | FE / 장바구니, Local Storage, 상품 |
| 유지현 | FE / 회원가입, 로그인, 배송지 정보, 회원 정보 수정, 다음 우편번호 api |
