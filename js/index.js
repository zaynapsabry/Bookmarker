//--------------------- Global variables
let documentHtml = document;
let siteName = documentHtml.getElementById("siteName"),
  siteUrl = documentHtml.getElementById("siteUrl"),
  btnAdd = documentHtml.getElementById("btnAdd"),
  btnUpdate = documentHtml.getElementById("btnUpdate"),
  searchBook = documentHtml.getElementById("searchBook"),
  tableBody = documentHtml.getElementById("tableBody"),
  alertName = documentHtml.getElementById("alertName"),
  alertUrl = documentHtml.getElementById("alertUrl"),
  alertExite = documentHtml.getElementById("alertExite");

let booksContainer = [];
let updateIndex;
//---------------------- When start
if (getLocal() !== null) {
  booksContainer = getLocal();
  displayData();
}

//---------------------- Events
btnAdd.addEventListener("click", getData);
btnUpdate.addEventListener("click", updateData);
searchBook.addEventListener("input", searchData);

//---------------------- Functions
function getData() {
  if ((validName() == true) & (validUrl() == true)) {
    let book = {
      name: siteName.value,
      url: siteUrl.value,
    };
    booksContainer.push(book);
    displayData();
    setLocal();
    resetInputs();
  }
}

function displayData() {
  let tableData = "";
  let term = searchBook.value?.toLowerCase();
  for (var i = 0; i < booksContainer.length; i++) {
    if (booksContainer[i].name?.toLowerCase().includes(term)) {
      tableData += `
       <tr>
       <td >${booksContainer[i].name
         .toLowerCase()
         .replaceAll(term, `<span class="bg-info">${term}</span>`)}</td> 
       <td>
          <p class="small text-truncate" style="max-width: 250px">${
            booksContainer[i].url
          }</p>
       </td>
       <td>
          <div class="hstack gap-3 justify-content-center">
             <a href="${
               booksContainer[i].url
             }" target="_blank" class="btn btn-outline-dark">
                <i class="fa-regular fa-eye"></i>
             </a>
 
             <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
                <i class="fa-regular fa-pen-to-square"></i>
             </button>
 
             <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
                <i class="fa-solid fa-trash"></i>
             </button>
          </div>
       </td>
    </tr>
       
       `;
    }
  }
  tableBody.innerHTML = tableData;
}

function resetInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteRow(index) {
  booksContainer.splice(index, 1);
  displayData();
  setLocal();
}

function setUpdateInput(index) {
  updateIndex = index;
  siteName.value = booksContainer[updateIndex].name;
  siteUrl.value = booksContainer[updateIndex].url;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateData() {
  let book = {
    name: siteName.value,
    url: siteUrl.value,
  };
  booksContainer.splice(updateIndex, 1, book);
  displayData();
  setLocal();
  resetInputs();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}

function searchData() {
  displayData();
}

function setLocal() {
  localStorage.setItem("data", JSON.stringify(booksContainer));
}

function getLocal() {
  return JSON.parse(localStorage.getItem("data"));
}

//------------------------ Validation
function validName() {
  if (siteName.value === "") {
    alertName.classList.remove("d-none");
    return false;
  } else {
    alertName.classList.add("d-none");
    return true;
  }
}
function validUrl() {
  if (siteUrl.value === "") {
    alertUrl.classList.remove("d-none");
    return false;
  } else {
    let isExist = false;
    for (let i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].url === siteUrl.value) {
        isExist = true;
      }
    }

    if (isExist == true) {
      alertExite.classList.remove("d-none");
      return false;
    }
    alertUrl.classList.add("d-none");
    return true;
  }
}
