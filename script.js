window.addEventListener("load", function () {
    var dot = document.querySelector(".dot");
    var dots = document.querySelector(".dots");
    dot.style.opacity = "0";
    dots.style.opacity = "0";
  
    var loader = document.querySelector(".loader");
    loader.style.opacity = 0;
    loader.style.pointerEvents = "none";
  });
  
  var rowCount = 0;
  var additionalRows = [];
  
  var rowsPerPage = 6;
  var currentPage = 1;
  var allRows = [];
  
  nextPage();
  var currentColumnIndex = 1;
  var selectColumnPosition = -1;
  
  var columns;
  
  document.addEventListener("DOMContentLoaded", function () {
    columns = document.querySelectorAll(".students-table thead th");
    findSelectColumnIndex();
    console.log(columns);
  });
  
  function findSelectColumnIndex() {
    const table = document.querySelector(".students-table");
    const headers = table.querySelectorAll("th");
    headers.forEach((header, index) => {
      if (header.textContent.trim() === "Select") {
        selectColumnPosition = index;
        console.log("Select column found at index: " + selectColumnPosition);
      }
    });
  }
  
  function prevColumn() {
    findSelectColumnIndex();
  
    let nextIndex = currentColumnIndex;
    do {
      nextIndex = nextIndex === 0 ? columns.length - 1 : nextIndex - 1;
    } while (nextIndex === selectColumnPosition || nextIndex === 0);
  
    hideColumnData(columns[currentColumnIndex]);
    currentColumnIndex = nextIndex;
    showColumnData(columns[currentColumnIndex]);
  }
  
  function nextColumn() {
    findSelectColumnIndex();
  
    let nextIndex = currentColumnIndex;
    do {
      nextIndex = (nextIndex + 1) % columns.length;
    } while (nextIndex === selectColumnPosition || nextIndex === 0);
  
    hideColumnData(columns[currentColumnIndex]);
    currentColumnIndex = nextIndex;
    showColumnData(columns[currentColumnIndex]);
  }
  
  function hideColumnData(column) {
    const table = column.closest("table");
    const columnIndex = Array.from(column.parentNode.children).indexOf(column);
    const tableRows = Array.from(table.querySelectorAll("tr"));
  
    tableRows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      if (cells[columnIndex]) {
        cells[columnIndex].classList.add("hidden");
      }
      if (selectColumnPosition !== -1 && cells[selectColumnPosition]) {
        cells[selectColumnPosition].classList.add("hidden");
      }
    });
  
    column.classList.add("hidden");
  }
  
  function showColumnData(column) {
    const table = column.closest("table");
    const columnIndex = Array.from(column.parentNode.children).indexOf(column);
    const tableRows = Array.from(table.querySelectorAll("tr"));
  
    tableRows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      if (cells[columnIndex]) {
        cells[columnIndex].classList.remove("hidden");
      }
      if (selectColumnPosition !== -1 && cells[selectColumnPosition]) {
        cells[selectColumnPosition].classList.remove("hidden");
      }
    });
  
    column.classList.remove("hidden");
  }
  
  function updateColumnVisibilityForDynamicRows() {
    const table = document.querySelector(".students-table");
    const columnIndex = currentColumnIndex;
  
    var rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      for (let index = 1; index < cells.length; index++) {
        if (index === columnIndex) {
          cells[index].classList.remove("hidden");
        } else {
          cells[index].classList.add("hidden");
        }
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var totalRows = allRows.length;
    var totalPages = Math.ceil(totalRows / rowsPerPage);
    createPaginationElements(totalPages);
  
    const groupSelect = document.getElementById("group");
  
    groupSelect.addEventListener("change", function () {
      const selectedValue = groupSelect.value;
  
      if (selectedValue === "custom") {
        var menu = document.getElementsByClassName("add-own-group")[0];
        var input = menu.querySelector("input");
        input.value = "";
        menu.style.opacity = "1";
        menu.style.pointerEvents = "auto";
        menu.style.zIndex = "20";
      }
    });
  });
  
  const groupPattern1 = /^(?:[a-zA-Z]{2,3}-[a-zA-Z]{2,3}-\d{2,3})$/;
  const groupPattern2 = /^(?:[a-zA-Z]{2,3}-\d{2,3})$/;
  
  function validateGroupFormat(groupName) {
    let res1 = groupPattern1.test(groupName);
    let res2 = groupPattern2.test(groupName);
    return res1 || res2;
  }
  
  function openDeletion(element) {
    var article = document.querySelector("article");
    var table = article.querySelector(".students-table");
  
    let headers = table.querySelectorAll("th");
    let fullnameIndex;
    headers.forEach((header, index) => {
      if (header.textContent.toLowerCase() === "name") {
        fullnameIndex = index;
      }
    });
    let row = element.closest("tr");
    let cells = row.querySelectorAll("td");
  
    let namePlace = document.querySelector(".student-name-deletion");
    namePlace.textContent = cells[fullnameIndex].textContent + "?";
  
    let deletionWindow = document.querySelector(".validate-deletion");
    deletionWindow.style.pointerEvents = "auto";
    deletionWindow.style.opacity = "1";
    deletionWindow.style.zIndex = "11";
    let rowId = parseInt(row.dataset.rowid);
    let deletionBut = document.querySelector(".button-ok-deletion");
    deletionBut.dataset.rowid = rowId;
  }
  function exitDeletion() {
    let deletionWindow = document.querySelector(".validate-deletion");
    deletionWindow.style.pointerEvents = "none";
    deletionWindow.style.opacity = "0";
    deletionWindow.style.zIndex = "0";
  }
  
  function addGroup() {
    const groupSelect = document.getElementById("group");
  
    const customOption = groupSelect.querySelector('option[value="custom"]');
  
    const groupName = document.getElementById("owngroup").value;
  
    if (groupName !== null) {
      const isValid = validateGroupFormat(groupName);
      if (isValid) {
        const newCustomOption = document.createElement("option");
        newCustomOption.value = groupName;
        newCustomOption.textContent = groupName;
  
        groupSelect.insertBefore(newCustomOption, customOption);
  
        newCustomOption.selected = true;
      } else {
        alert("Invalid group format. Please enter a valid group name.");
        groupSelect.value = "";
      }
    } else {
      groupSelect.value = "";
    }
    exitOwnGroup();
  }
  function exitOwnGroup() {
    var menu = document.getElementsByClassName("add-own-group")[0];
    menu.style.opacity = "0";
    menu.style.pointerEvents = "none";
  
    setTimeout(() => {
      menu.style.zIndex = "0";
    }, 300);
  }
  
  function changePage(element) {
    console.log("Change page button clicked");
    console.log(element);
    var totalRows = allRows.length;
    var totalPages = Math.ceil(totalRows / rowsPerPage);
    var pageid = parseInt(element.dataset.pageid); // Parse the data-pageId attribute as an integer
    if (!isNaN(pageid) && pageid >= 1 && pageid <= totalPages) {
      // Check if pageId is a valid number
      currentPage = pageid;
      console.log("Current Page:", currentPage);
      updatePagination();
  
      // Remove active class from all pagination elements
      var paginationElements = document.querySelectorAll(".pagination-element");
      paginationElements.forEach(function (el) {
        el.classList.remove("active");
      });
  
      // Add active class to the clicked pagination element
      element.classList.add("active");
    } else {
      console.error("Invalid pageId:", pageid);
    }
  }
  
  function nextPage() {
    console.log("Next button clicked");
    totalRows = allRows.length;
    totalPages = Math.ceil(totalRows / rowsPerPage);
    console.log("Total Pages:", totalPages);
    if (currentPage < totalPages) {
      currentPage++;
      console.log("Current Page:", currentPage);
      updatePagination();
      updateActivePageElement();
    }
  }
  
  function prevPage() {
    console.log("Previous button clicked");
    if (currentPage > 1) {
      currentPage--;
      console.log("Current Page:", currentPage);
      updatePagination();
      updateActivePageElement();
    }
  }
  
  function updatePagination() {
    console.log("Updating pagination...");
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = Math.min(startIndex + rowsPerPage, allRows.length);
    console.log(startIndex);
    console.log(endIndex);
  
    allRows.forEach(function (row, index) {
      console.log(row);
      if (index >= startIndex && index < endIndex) {
        row.classList.remove("slideOut");
        setTimeout(function () {
          row.style.display = "";
        }, 500);
      } else {
        row.classList.add("slideOut");
        setTimeout(function () {
          row.style.display = "none";
        }, 500);
      }
    });
  }
  function updateActivePageElement() {
    const paginationElements = document.querySelectorAll(".pagination-element");
    paginationElements.forEach((element) => {
      const pageId = parseInt(element.dataset.pageid);
      if (pageId === currentPage) {
        // Add active class with a delay to enable fade-in effect
        setTimeout(() => {
          element.classList.add("active");
        }, 100);
      } else {
        // Remove active class with a delay to enable fade-out effect
        setTimeout(() => {
          element.classList.remove("active");
        }, 100);
      }
    });
  }
  
  function createPaginationElements(totalPages) {
    const paginationContainer = document.querySelector(
      ".pagination-element-container"
    );
    paginationContainer.innerHTML = "";
  
    if (totalPages === 0) {
      const pageElement = document.createElement("div");
      pageElement.classList.add("pagination-element");
      pageElement.style.width = "100%";
      paginationContainer.appendChild(pageElement);
    } else {
      const widthPerElement = 100 / totalPages + "%";
      paginationContainer.style.setProperty(
        "--pagination-width",
        widthPerElement
      );
  
      for (let i = 1; i <= totalPages; i++) {
        const pageElement = document.createElement("div");
        pageElement.classList.add("pagination-element");
        pageElement.dataset.pageid = i;
        pageElement.addEventListener("click", function () {
          changePage(this);
        });
  
        if (i === currentPage) {
          pageElement.classList.add("active");
        }
  
        paginationContainer.appendChild(pageElement);
      }
    }
  }
  
  // Add new row
  function addNewStudent() {
    var formList = document.querySelector(".form-container .form-list");
    var article = document.querySelector("article");
    var table = article.querySelector(".students-table");
  
    var isValid = true;
    var letters = /^[A-Za-z]+$/;
  
    var liList = formList.querySelectorAll("li");
    liList.forEach((li, index) => {
      var selectElement = li.querySelector("select");
      if (selectElement) {
        var selectedValue = selectElement.value;
        var trimmedInputValue = selectedValue.trim();
        if (trimmedInputValue === "") {
          isValid = false;
          li.querySelector("select").style.border = "1px solid red";
        }
      } else {
        var selectedValue = li.querySelector("input").value;
        var trimmedInputValue = selectedValue.trim();
        if (trimmedInputValue === "") {
          isValid = false;
          li.querySelector("input").style.border = "1px solid red";
        }
  
        if (
          (index === 1 && !trimmedInputValue.match(letters)) ||
          (index === 2 && !trimmedInputValue.match(letters))
        ) {
          isValid = false;
          li.querySelector("input").style.border = "1px solid red";
        }
      }
    });
  
    if (!isValid) {
      return;
    }
  
    var newRow = document.createElement("tr");
  
    var headers = table.querySelectorAll("th");
    headers.forEach((header) => {
      var newData = document.createElement("td");
      var headerText = header.textContent.trim().toLowerCase();
      var fieldValue = "";
  
      switch (headerText) {
        case "select":
          var newCheckbox = document.createElement("input");
          newCheckbox.type = "checkbox";
          newCheckbox.addEventListener("change", function () {
            toggleRowColor(this);
          });
          newData.appendChild(newCheckbox);
          newRow.appendChild(newData);
          break;
        case "group":
          liList.forEach((li, index) => {
            var selectElement = li.querySelector("select");
            var trimmedInputValue;
  
            if (selectElement) {
              trimmedInputValue = selectElement.value.trim();
            } else {
              trimmedInputValue = li.querySelector("input").value.trim();
            }
  
            if (index === 0) {
              fieldValue += trimmedInputValue + " ";
            }
          });
          var textNode = document.createTextNode(fieldValue);
          newData.appendChild(textNode);
          newRow.appendChild(newData);
          break;
        case "name":
          liList.forEach((li, index) => {
            var selectElement = li.querySelector("select");
            var trimmedInputValue;
  
            if (selectElement) {
              trimmedInputValue = selectElement.value.trim();
            } else {
              trimmedInputValue = li.querySelector("input").value.trim();
            }
  
            if (index === 1 || index === 2) {
              fieldValue += trimmedInputValue + " ";
            }
          });
          var textNode = document.createTextNode(fieldValue);
          newData.appendChild(textNode);
          newRow.appendChild(newData);
          break;
        case "gender":
          liList.forEach((li, index) => {
            var selectElement = li.querySelector("select");
            var trimmedInputValue;
  
            if (selectElement) {
              trimmedInputValue = selectElement.value.trim();
            } else {
              trimmedInputValue = li.querySelector("input").value.trim();
            }
  
            if (index === 3) {
              fieldValue += trimmedInputValue + " ";
            }
          });
          var textNode = document.createTextNode(fieldValue);
          newData.appendChild(textNode);
          newRow.appendChild(newData);
  
          break;
        case "birthday":
          liList.forEach((li, index) => {
            var selectElement = li.querySelector("select");
            var trimmedInputValue;
  
            if (selectElement) {
              trimmedInputValue = selectElement.value.trim();
            } else {
              trimmedInputValue = li.querySelector("input").value.trim();
            }
  
            if (index === 4) {
              fieldValue += trimmedInputValue + " ";
            }
          });
          var textNode = document.createTextNode(fieldValue);
          newData.appendChild(textNode);
          newRow.appendChild(newData);
          break;
        case "status":
          var newData = document.createElement("td");
          var newParentDiv = document.createElement("div");
          newParentDiv.classList.add("circle-container");
          var newChildDiv = document.createElement("div");
          newChildDiv.classList.add("circle");
  
          
          var fullName = liList[1].querySelector("input").value.trim() + " " + liList[2].querySelector("input").value.trim();
          if (fullName === "Denys Losiev") {
            newChildDiv.classList.add("circle-active"); 
          } else {
            newChildDiv.classList.add("circle-unactive");
          }
  
          newParentDiv.appendChild(newChildDiv);
          newData.appendChild(newParentDiv);
          newRow.appendChild(newData);
          break;
        case "options":
          var newEditDiv = document.createElement("div");
          var svgPencil =
            '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" class="pencil-svg"> <path fill="black" d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188a.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154l4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806l-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z" /> </svg>';
          newEditDiv.innerHTML = svgPencil;
          newEditDiv.classList.add("pencil-svg-container");
          newEditDiv.addEventListener("click", function () {
            editStudent(this);
          });
          newData.appendChild(newEditDiv);
  
          var newBinDiv = document.createElement("div");
          var svgBin =
            '<svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24" class="bin-svg"> <path fill="red" fill-rule="evenodd" d="M10.31 2.25h3.38c.217 0 .406 0 .584.028a2.25 2.25 0 0 1 1.64 1.183c.084.16.143.339.212.544l.111.335a1.25 1.25 0 0 0 1.263.91h3a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25 2.25 0 0 1 1.641-1.183c.178-.028.367-.028.583-.028m-1.302 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75 0 0 1 .547-.395a3.2 3.2 0 0 1 .392-.009h3.29c.288 0 .348.002.392.01a.75.75 0 0 1 .547.394c.021.04.042.095.133.369l.1.3l.039.112c.039.11.085.214.136.315z" clip-rule="evenodd"/><path fill="red" d="M5.915 8.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.813.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.302c-.14-.706-.204-1.644-.294-2.992z"/><path fill="red" d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.15 0a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 0 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671"/></svg>';
          newBinDiv.innerHTML = svgBin;
          newBinDiv.classList.add("bin-svg-container");
          newBinDiv.addEventListener("click", function () {
            openDeletion(newRow);
          });
          newData.append(newBinDiv);
          newRow.appendChild(newData);
          break;
        default:
          break;
      }
    });
  
    newRow.draggable = "true";
    newRow.ondragstart = dragStart;
    var randomId = generateRandomId();
    newRow.dataset.rowid = randomId;
  
    if (rowCount < rowsPerPage) {
      allRows.push(newRow);
      table.appendChild(newRow);
    } else {
      newRow.style.display = "none";
      additionalRows.push(newRow);
      allRows.push(newRow);
      table.appendChild(newRow);
    }
    updateColumnVisibilityForDynamicRows();
  
    selectedHeaders.forEach((header) => {
      selectColumn(header);
      selectColumn(header);
    });
    rowCount++;
    setTimeout(() => {
      updatePagination();
      const totalRows = allRows.length;
      const totalPages = Math.ceil(totalRows / rowsPerPage);
      createPaginationElements(totalPages);
    }, 300);
    totalRows = allRows.length;
    totalPages = Math.ceil(totalRows / rowsPerPage);
    exit();
  }
  
  function deleteRow(element) {
    let rowId = parseInt(element.dataset.rowid);
    var row = document.querySelector("table tr[data-rowid='" + rowId + "']");
    rowCount--;
  
    row.classList.add("swipe-out");
    setTimeout(function () {
      if (row.parentNode) {
        var index = allRows.indexOf(row);
        if (index !== -1) {
          allRows.splice(index, 1);
        }
        row.parentNode.removeChild(row);
      }
      if (additionalRows.length > 0) {
        var table = document.querySelector(".students-table");
        var newRow = additionalRows.shift();
        table.appendChild(newRow);
        updatePagination();
      }
      totalRows = allRows.length;
      totalPages = Math.ceil(totalRows / rowsPerPage);
    }, 500);
    createPaginationElements(totalPages);
    exitDeletion();
  }
  function generateRandomId() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }
  function editAddStudent() {
    var formList = document.querySelector(".form-container .form-list");
    var article = document.querySelector("article");
    var table = article.querySelector(".students-table");
  
    var isValid = true;
    var letters = /^[A-Za-z]+$/;
  
    var liList = formList.querySelectorAll("li");
    liList.forEach((li, index) => {
      var selectElement = li.querySelector("select");
      if (selectElement) {
        var selectedValue = selectElement.value;
      } else {
        var selectedValue = li.querySelector("input").value;
        var trimmedInputValue = selectedValue.trim();
  
        if (trimmedInputValue === "") {
          isValid = false;
          li.querySelector("input").style.border = "1px solid red";
        }
  
        if (
          (index === 1 && !trimmedInputValue.match(letters)) ||
          (index === 2 && !trimmedInputValue.match(letters))
        ) {
          isValid = false;
          li.querySelector("input").style.border = "1px solid red";
        }
      }
    });
  
    if (!isValid) {
      return;
    }
  
    var appBut = document.getElementsByClassName("button-ok-apply")[0];
    console.log(appBut.dataset.rowid);
    var rowId = appBut.dataset.rowid;
    var row = document.querySelector('tr[data-rowid="' + rowId + '"]');
    var cells = row.querySelectorAll("td");
    var headers = row.parentNode.querySelectorAll("th");
  
    headers.forEach((header, index) => {
      var headerText = header.textContent.trim().toLowerCase();
  
      switch (headerText) {
        case "group":
          var selectElement = liList[0].querySelector("select#group");
  
          var trimmedInputValue = selectElement.value.trim();
  
          var textNode = document.createTextNode(trimmedInputValue);
          cells[index].textContent = "";
          cells[index].appendChild(textNode);
  
          break;
        case "name":
          var firstname = liList[1].querySelector("input#firstname").value.trim();
          var lastname = liList[2].querySelector("input#lastname").value.trim();
  
          var fullname = firstname + " " + lastname;
  
          var textNode = document.createTextNode(fullname);
          cells[index].textContent = "";
          cells[index].appendChild(textNode);
  
          break;
        case "gender":
          var selectElement = liList[3].querySelector("select#gender");
  
          var trimmedInputValue = selectElement.value.trim();
          var capitalizedInputValue =
            trimmedInputValue.charAt(0).toUpperCase() +
            trimmedInputValue.slice(1);
  
          var textNode = document.createTextNode(capitalizedInputValue);
          cells[index].textContent = "";
          cells[index].appendChild(textNode);
          break;
        case "birthday":
          var selectElement = liList[4].querySelector("input#birthday");
  
          var trimmedInputValue = selectElement.value.trim();
  
          var textNode = document.createTextNode(trimmedInputValue);
          cells[index].textContent = "";
          cells[index].appendChild(textNode);
          break;
        default:
          break;
      }
    });
  
    row.draggable = "true";
    row.ondragstart = dragStart;
  
    exit();
  }
  
  function editStudent(div) {
    var okBut = document.getElementsByClassName("button-ok-apply")[0];
    okBut.style.display = "block";
  
    var row = div.parentNode.parentNode;
    var cells = row.querySelectorAll("td");
    var headers = row.parentNode.querySelectorAll("th");
  
    var formList = document.querySelector(".form-container .form-list");
    var liList = formList.querySelectorAll("li");
  
    headers.forEach((header, index) => {
      var headerText = header.textContent.trim().toLowerCase();
  
      switch (headerText) {
        case "group":
          var selectElement = liList[0].querySelector("select#group");
          selectElement.value = cells[index].textContent.trim();
          break;
        case "name":
          var fullName = cells[index].textContent.trim();
          var nameParts = fullName.split(" ");
  
          var firstName = nameParts[0];
          var lastName = nameParts.slice(1).join(" ");
  
          var selectElement = liList[1].querySelector("input#firstname");
          selectElement.value = firstName;
  
          var selectElement = liList[2].querySelector("input#lastname");
          selectElement.value = lastName;
          break;
        case "gender":
          var selectElement = liList[3].querySelector("select#gender");
  
          selectElement.value = cells[index].textContent.trim().toLowerCase();
          break;
        case "birthday":
          var selectElement = liList[4].querySelector("input#birthday");
          selectElement.value = cells[index].textContent.trim();
          break;
        default:
          break;
      }
    });
  
    var openedDiv = document.getElementsByClassName("form-add-student")[0];
    var exitButton = document.getElementsByClassName("form-button-exit")[0];
    openedDiv.style.opacity = "1";
    exitButton.style.opacity = "1";
  
    openedDiv.style.zIndex = "10";
    exitButton.style.zIndex = "10";
  
    exitButton.style.pointerEvents = "auto";
  
    var row = div.closest("tr");
    var rowId = row.getAttribute("data-rowid");
    console.log(rowId);
  
    var appBut = document.getElementsByClassName("button-ok-apply")[0];
    appBut.dataset.rowid = rowId;
    console.log(rowId);
  }
  //------------------------------------------------------------------------------------
  //bell and profile hover
  document.addEventListener("DOMContentLoaded", function () {
    const bellSvg = document.querySelector(".bell-container");
    const messageContainer = document.querySelector(".message-container");
  
    let isBellClicked = false;
  
    function isMouseInside(event) {
      const target = event.relatedTarget || event.target;
      return (
        target === messageContainer ||
        target === bellSvg ||
        messageContainer.contains(target) ||
        bellSvg.contains(target)
      );
    }
  
    bellSvg.addEventListener("click", function () {
      isBellClicked = !isBellClicked;
      if (isBellClicked) {
        messageContainer.style.display = "block";
        setTimeout(() => {
          messageContainer.style.opacity = "1";
        }, 300);
      } else {
        messageContainer.style.opacity = "0";
        setTimeout(() => {
          messageContainer.style.display = "none";
        }, 300);
      }
    });
  
    document.addEventListener("click", function (event) {
      if (
        !isMouseInside(event) &&
        !event.target.classList.contains("bell-container")
      ) {
        isBellClicked = false;
        messageContainer.style.opacity = "0";
        setTimeout(() => {
          messageContainer.style.display = "none";
        }, 300);
      }
    });
  
    const profile = document.querySelector(".profile-preview-container");
    const profileContainer = document.querySelector(".profile-container");
  
    let isProfile = false;
  
    function isMouseInsideProfile(event) {
      return (
        event.relatedTarget === profileContainer ||
        event.relatedTarget === profile
      );
    }
  
    profile.addEventListener("mouseenter", function () {
      isProfile = true;
      profileContainer.style.opacity = "1";
      profileContainer.style.display = "block";
    });
  
    profile.addEventListener("mouseleave", function (event) {
      if (!isMouseInsideProfile(event)) {
        profileContainer.style.opacity = "0";
      }
    });
  
    profileContainer.addEventListener("mouseenter", function () {
      if (isProfile) {
        profileContainer.style.opacity = "1";
        profileContainer.style.display = "block";
      }
    });
  
    profileContainer.addEventListener("mouseleave", function (event) {
      if (!isMouseInsideProfile(event)) {
        isProfile = false;
        profileContainer.style.opacity = "0";
        setTimeout(() => {
          profileContainer.style.display = "none";
        }, 300);
      }
    });
  });
  //---------------------------------------------------------------------------------
  //Function to move rows
  let draggedRow = null;
  
  function dragStart(event) {
    draggedRow = event.target.closest("tr");
    event.dataTransfer.setData("text/plain", draggedRow.id);
  }
  
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  
  document.addEventListener("drop", function (event) {
    event.preventDefault();
    const target = event.target.closest("tr");
  
    if (target && target !== draggedRow) {
      const parent = target.parentNode;
      const nextSibling =
        target.nextSibling === draggedRow ? target : target.nextSibling;
      parent.insertBefore(draggedRow, nextSibling);
    }
  });
  //----------------------------------------------------------------------------------------
  
  //Function to open form input to add student
  function openAdd() {
    var okBut = document.getElementsByClassName("button-ok-add")[0];
    okBut.style.display = "block";
  
    var formList = document.querySelector(".form-container .form-list");
    var liList = formList.querySelectorAll("li");
    liList.forEach((li) => {
      var inputElement = li.querySelector("input");
      if (inputElement) {
        inputElement.style.border = "1px solid black";
        inputElement.value = " ";
      }
      var selectElement = li.querySelector("select");
      if (selectElement) {
        selectElement.style.border = "1px solid black";
        selectElement.value = "";
      }
    });
  
    let openedDIv = document.getElementsByClassName("form-add-student")[0];
    let exitBut = document.getElementsByClassName("form-button-exit")[0];
    openedDIv.style.opacity = "1";
    exitBut.style.opacity = "1";
  
    openedDIv.style.zIndex = "10";
    exitBut.style.zIndex = "10";
  
    exitBut.style.pointerEvents = "auto";
  }
  
  //Function to exit form input to add student
  function exit() {
    let openedDiv = document.getElementsByClassName("form-add-student")[0];
    let exitButton = document.getElementsByClassName("form-button-exit")[0];
  
    setTimeout(function () {
      openedDiv.style.opacity = "0";
      exitButton.style.opacity = "0";
    }, 50);
  
    setTimeout(function () {
      openedDiv.style.zIndex = "-10";
      exitButton.style.zIndex = "-10";
      var okBut = document.getElementsByClassName("button-ok-add")[0];
      okBut.style.display = "none";
      var okButApp = document.getElementsByClassName("button-ok-apply")[0];
      okButApp.style.display = "none";
    }, 200);
  }
  //--------------------------------------------------------------------------------
  //Function to select row
  function toggleRowColor(checkbox) {
    var row = checkbox.parentNode.parentNode;

    if (checkbox.checked) {
        row.classList.add("selected");
        if (row.rowIndex === row.parentNode.rows.length - 1) {
            row.firstElementChild.style.borderBottomLeftRadius = "7px";
            row.lastElementChild.style.borderBottomRightRadius = "7px";
        }
    } else {
        setTimeout(function () {
            row.classList.remove("selected");
            row.firstElementChild.style.borderBottomLeftRadius = "0";
            row.lastElementChild.style.borderBottomRightRadius = "0";
        }, 200);
    }

    setTimeout(manageEditDeleteButtons, 200); 
}
  
  
  function manageEditDeleteButtons() {
    const selectedRows = document.querySelectorAll(".students-table tr.selected");
    const editButtons = document.querySelectorAll(".pencil-svg-container");
    const deleteButtons = document.querySelectorAll(".bin-svg-container");
    const tableContainer = document.querySelector(".table-container");

    if (selectedRows.length >= 2) {
        editButtons.forEach(button => button.style.display = "none");
        deleteButtons.forEach(button => button.style.display = "none");

        if (!document.querySelector(".delete-selected-button")) {
            const deleteSelectedButton = document.createElement("bin-svg");
            deleteSelectedButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24" class="bin-svg">
                    <path fill="red" fill-rule="evenodd" d="M10.31 2.25h3.38c.217 0 .406 0 .584.028a2.25 2.25 0 0 1 1.64 1.183c.084.16.143.339.212.544l.111.335a1.25 1.25 0 0 0 1.263.91h3a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25 2.25 0 0 1 1.641-1.183c.178-.028.367-.028.583-.028m-1.302 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75 0 0 1 .547-.395a3.2 3.2 0 0 1 .392-.009h3.29c.288 0 .348.002.392.01a.75.75 0 0 1 .547.394c.021.04.042.095.133.369l.1.3l.039.112c.039.11.085.214.136.315z" clip-rule="evenodd"></path>
                    <path fill="red" d="M5.915 8.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.813.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.302c-.14-.706-.204-1.644-.294-2.992z"></path>
                    <path fill="red" d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.15 0a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 0 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671"></path>
                </svg>
                
            `;
            deleteSelectedButton.classList.add("delete-selected-button");
            deleteSelectedButton.addEventListener("click", function() {
              const selectedRows = document.querySelectorAll(".students-table tr.selected");
              if (selectedRows.length > 0) {
                  openDeletion1(Array.from(selectedRows));
              }
            });
          
            document.querySelector(".button-ok-deletion").addEventListener("click", function() {
              deleteSelectedRows();
              exitDeletion();
            });
            tableContainer.appendChild(deleteSelectedButton);
        }
    } else {
        editButtons.forEach(button => button.style.display = "inline-block");
        deleteButtons.forEach(button => button.style.display = "inline-block");

        const deleteSelectedButton = document.querySelector(".delete-selected-button");
        if (deleteSelectedButton) {
            deleteSelectedButton.remove();
        }
    }
}

function deleteSelectedRows() {
    const rowIds = document.querySelector(".button-ok-deletion").dataset.rowids.split(",");
    rowIds.forEach(rowId => {
        let row = document.querySelector(`.students-table tr[data-rowid='${rowId}']`);
        if (row) {
            row.parentNode.removeChild(row);
        }
    });

    manageEditDeleteButtons();
}
  
  
  document.querySelectorAll(".students-table input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      toggleRowColor(this);
    });
  });
  
  
  let columnSelected = false;
  let selectedHeaders = [];
  
  function selectColumn(header) {
    const rows = document.querySelectorAll(".students-table tbody tr");
  
    const headers = Array.from(header.parentNode.children);
    let columnIndex = headers.indexOf(header);
  
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll("td, th");
  
      cells.forEach((cell, index) => {
        if (index === columnIndex) {
          if (columnSelected) {
            cell.style.backgroundColor = "";
          } else {
            cell.style.backgroundColor = "#BEE3DB";
  
            if (index === 0 && rowIndex === 0) {
              cell.style.borderTopLeftRadius = "7px";
            } else if (index === 0 && rowIndex === rows.length - 1) {
              cell.style.borderBottomLeftRadius = "7px";
            } else if (index === headers.length - 1 && rowIndex === 0) {
              cell.style.borderTopRightRadius = "7px";
            } else if (
              index === headers.length - 1 &&
              rowIndex === rows.length - 1
            ) {
              cell.style.borderBottomRightRadius = "7px";
            }
          }
        }
      });
    });
  
    columnSelected = !columnSelected;
    if (columnSelected) {
      selectedHeaders.push(header);
    } else {
      selectedHeaders = selectedHeaders.filter(
        (selectedHeader) => selectedHeader !== header
      );
    }
  }
  //--------------------------------------------------------------------------------
  
  //Function to open navigation menu and automaticly close menu when window is resized
  var menu1 = document.getElementsByClassName("menu-element-1");
  var menu2 = document.getElementsByClassName("menu-element-2");
  var navigation = document.getElementsByClassName("navigation-container");
  
  function toggleNav() {
    if (window.innerWidth >= 1024) {
      navigation[0].style.top = "3.5%";
      if (
        navigation[0].style.left === "" ||
        navigation[0].style.left === "-15%"
      ) {
        navigation[0].style.left = "0";
        menu1[0].classList.add("cross");
        menu2[0].classList.add("cross");
      } else {
        navigation[0].style.left = "-15%";
        menu1[0].classList.remove("cross");
        menu2[0].classList.remove("cross");
      }
    } else {
      navigation[0].style.left = "0";
      if (navigation[0].style.top === "" || navigation[0].style.top === "-31%") {
        navigation[0].style.top = "-6%";
        menu1[0].classList.add("cross");
        menu2[0].classList.add("cross");
      } else {
        navigation[0].style.top = "-31%";
        menu1[0].classList.remove("cross");
        menu2[0].classList.remove("cross");
      }
    }
  }
  
  function handleResize() {
    navigation[0].style.transitionDuration = "0s";
  
    if (window.innerWidth >= 1024) {
      navigation[0].style.top = "3.5%";
      navigation[0].style.left = "-15%";
    } else {
      navigation[0].style.left = "0";
      navigation[0].style.top = "-31%";
    }
    menu1[0].classList.remove("cross");
    menu2[0].classList.remove("cross");
  
    setTimeout(function () {
      navigation[0].style.transitionDuration = "";
    }, 0);
  }
  
  window.addEventListener("resize", handleResize);
  

  //Function to swap columns
  document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementsByClassName("students-table")[0];
    let draggingEle;
    let draggingColumnIndex;
    let placeholder;
    let list;
    let isDraggingStarted = false;
  
    let x = 0;
    let y = 0;
  
    const swap = function (nodeA, nodeB) {
      const parentA = nodeA.parentNode;
      const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
  
      nodeB.parentNode.insertBefore(nodeA, nodeB);
  
      parentA.insertBefore(nodeB, siblingA);
    };
  
    const isOnLeft = function (nodeA, nodeB) {
      const rectA = nodeA.getBoundingClientRect();
      const rectB = nodeB.getBoundingClientRect();
  
      return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    };
  
    const cloneTable = function () {
      const rect = table.getBoundingClientRect();
  
      list = document.createElement("div");
      list.classList.add("clone-list");
      list.style.position = "absolute";
      table.parentNode.insertBefore(list, table);
  
      table.style.visibility = "hidden";
  
      const originalRows = Array.from(
        table.querySelectorAll("tr:not([style*='display: none'])")
      );
  
      // Select the cells from the originalRows
      const originalCells = originalRows.flatMap((row) =>
        Array.from(row.querySelectorAll("td"))
      );
      console.log(originalCells);
  
      const originalHeaderCells = [].slice.call(table.querySelectorAll("th"));
      const numColumns = originalHeaderCells.length;
  
      originalHeaderCells.forEach(function (headerCell, headerIndex) {
        const width = parseInt(window.getComputedStyle(headerCell).width);
  
        const item = document.createElement("div");
        item.classList.add("draggable");
  
        const newTable = document.createElement("table");
        newTable.setAttribute("class", "clone-table");
  
        const halfTableWidth = table.style.width;
        newTable.style.width = `${halfTableWidth}vw`;
        if (headerIndex === 0) {
          newTable.style.borderTopLeftRadius = "7px";
          newTable.style.borderBottomLeftRadius = "7px";
        } else if (headerIndex === originalHeaderCells.length - 1) {
          newTable.style.borderTopRightRadius = "7px";
          newTable.style.borderBottomRightRadius = "7px";
        }
  
        const th = headerCell.cloneNode(true);
        let newRow = document.createElement("tr");
        newRow.appendChild(th);
        newTable.appendChild(newRow);
  
        const cells = originalCells.filter(function (c, idx) {
          return (idx - headerIndex) % numColumns === 0;
        });
        cells.forEach(function (cell) {
          const newCell = cell.cloneNode(true);
          newCell.style.width = `${width}px`;
          newRow = document.createElement("tr");
          newRow.appendChild(newCell);
          newTable.appendChild(newRow);
        });
  
        item.appendChild(newTable);
        list.appendChild(item);
      });
    };
  
    let isMouseDown = false;
    const mouseDownHandler = function (e) {
      placeholder;
      isMouseDown = true;
      draggingColumnIndex = [].slice
        .call(table.querySelectorAll("th"))
        .indexOf(e.target);
  
      x = e.clientX - e.target.offsetLeft;
      y = e.clientY - e.target.offsetTop;
  
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
  
    const mouseMoveHandler = function (e) {
      if (isMouseDown && !isDraggingStarted) {
        isDraggingStarted = true;
  
        cloneTable();
  
        draggingEle = [].slice.call(list.children)[draggingColumnIndex];
        draggingEle.classList.add("dragging");
  
        placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
        placeholder.style.width = `${draggingEle.offsetWidth}px`;
      }
  
      draggingEle.style.position = "absolute";
      draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - y}px`;
      draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - x}px`;
      x = e.clientX;
      y = e.clientY;
  
      const prevEle = draggingEle.previousElementSibling;
      const nextEle = placeholder.nextElementSibling;
  
      if (prevEle && isOnLeft(draggingEle, prevEle)) {
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);
        return;
      }
  
      if (nextEle && isOnLeft(nextEle, draggingEle)) {
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
      }
    };
  
    const mouseUpHandler = function () {
      isMouseDown = false;
      placeholder && placeholder.parentNode.removeChild(placeholder);
  
      draggingEle.classList.remove("dragging");
      draggingEle.style.removeProperty("top");
      draggingEle.style.removeProperty("left");
      draggingEle.style.removeProperty("position");
  
      const endColumnIndex = [].slice.call(list.children).indexOf(draggingEle);
  
      isDraggingStarted = false;
  
      list.parentNode.removeChild(list);
  
      table.querySelectorAll("tr").forEach(function (row) {
        const cells = [].slice.call(row.querySelectorAll("th, td"));
        draggingColumnIndex > endColumnIndex
          ? cells[endColumnIndex].parentNode.insertBefore(
              cells[draggingColumnIndex],
              cells[endColumnIndex]
            )
          : cells[endColumnIndex].parentNode.insertBefore(
              cells[draggingColumnIndex],
              cells[endColumnIndex].nextSibling
            );
      });
      table.style.removeProperty("visibility");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    table.querySelectorAll("th").forEach(function (headerCell) {
      headerCell.classList.add("draggable");
      headerCell.addEventListener("mousedown", mouseDownHandler);
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const bellSvg = document.querySelector(".bell-container");
    const messageContainer = document.querySelector(".message-container");
  
    function isMouseInside(event) {
      const target = event.relatedTarget || event.target;
      return (
        target === messageContainer ||
        target === bellSvg ||
        messageContainer.contains(target) ||
        bellSvg.contains(target)
      );
    }
  
    bellSvg.addEventListener("mouseenter", function () {
      messageContainer.style.display = "block";
      setTimeout(() => {
        messageContainer.style.opacity = "1";
      }, 300);
    });
  
    bellSvg.addEventListener("mouseleave", function (event) {
      if (!isMouseInside(event)) {
        messageContainer.style.opacity = "0";
        setTimeout(() => {
          messageContainer.style.display = "none";
        }, 1000);
      }
    });
  
    
  });

// Измененная функция openDeletion
function openDeletion1(rows) {
    var article = document.querySelector("article");
    var table = article.querySelector(".students-table");

    let headers = table.querySelectorAll("th");
    let fullnameIndex;
    headers.forEach((header, index) => {
        if (header.textContent.toLowerCase() === "name") {
            fullnameIndex = index;
        }
    });

    let names = rows.map(row => {
        let cells = row.querySelectorAll("td");
        return cells[fullnameIndex].textContent.trim();
    });

    let namePlace = document.querySelector(".student-name-deletion");
    namePlace.textContent = names.join(", ") + "?";

    let deletionWindow = document.querySelector(".validate-deletion");
    deletionWindow.style.pointerEvents = "auto";
    deletionWindow.style.opacity = "1";
    deletionWindow.style.zIndex = "11";

    let deletionBut = document.querySelector(".button-ok-deletion");
    deletionBut.dataset.rowids = rows.map(row => row.dataset.rowid).join(",");
}

// Обновленный обработчик события для deleteSelectedButton
deleteSelectedButton.addEventListener("click", function() {
    const selectedRows = document.querySelectorAll(".students-table tr.selected");
    if (selectedRows.length > 0) {
        openDeletion1(Array.from(selectedRows));
    }
});

document.querySelector(".button-ok-deletion").addEventListener("click", function() {
    deleteSelectedRows();
    exitDeletion();
});

// Измененная функция deleteSelectedRows
function deleteSelectedRows() {
    const rowIds = document.querySelector(".button-ok-deletion").dataset.rowids.split(",");
    rowIds.forEach(rowId => {
        let row = document.querySelector(`.students-table tr[data-rowid='${rowId}']`);
        if (row) {
            row.parentNode.removeChild(row);
        }
    });

    manageEditDeleteButtons();
}
