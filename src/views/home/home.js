import { header } from "../components/header.js";
import { footer } from "../components/footer.js";

insertHeader()
insertFooter()

async function insertHeader() {
  document.body.insertAdjacentElement("afterBegin" , header)
}

async function insertFooter() {
  document.body.insertAdjacentElement("beforeend" , footer)
}