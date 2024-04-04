import ExcelJS from "exceljs";
import Member from "./Member";
import "./style.css";

let members = [];

const inputElement = document.getElementById("file-xslx");
inputElement.addEventListener("change", handleFiles, false);

async function handleFiles(e) {
  const fileRes = e.target.files[0];

  const buffer = await readFile(fileRes);
  const workbook = new ExcelJS.Workbook();

  const file = await workbook.xlsx.load(buffer);

  createMembers(file.worksheets[0]);

  createTextsToCopy();
}

function readFile(fileRes) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileRes);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

function createMembers(worksheet) {
  members = [];

  worksheet.eachRow(function (row, rowNumber) {
    const dateNegotiation = row.getCell(1).value;
    const member = row.getCell(2).value;
    const nnf = row.getCell(3).value;
    const price = row.getCell(4).value;
    const dateExpire = row.getCell(5).value;
    const email = row.getCell(6).value;

    members.push(
      new Member(dateNegotiation, member, nnf, price, dateExpire, email)
    );
  });
}

function createTextsToCopy() {
  document.getElementById("section-output").textContent = "";

  members.forEach((element) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.innerHTML = `
      <label><strong>${element.member}</strong><label> 
      <button onClick=window.copy(this) class="btn copy-btn">Copiar</button>`;

    wrapper.querySelector("button").dataset.index = members.indexOf(element);

    document.getElementById("section-output").appendChild(wrapper);
  });
}

window.copy = function (e) {
  const fullText = members[e.dataset.index].fullText;

  navigator.clipboard.writeText(fullText).then(
    () => {
      console.log("All Good!");
    },
    () => {
      console.log("Not good at all!");
      alert("Não foi possível copiar!");
    }
  );
};
