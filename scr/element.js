// Функція для побудови елемента та розміщення його в DOM
function buildElementToPage(id, elem) {                               
    const element = document.createElement('div')
    element.classList.add('element')
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-data">
        <img src="img/${elem.pictname}" class="element-img">
        <p class="element-text">Номер рейсу: <span class="element-flight-number">${elem.flightNumber}</span></p>
        <p class="element-text">Маршрут: <span class="element-route">${elem.route}</span></p>
        <p class="element-text">Дата відправлення: <span class="element-departure-date">${elem.departureDate}</span></p>
        <p class="element-text">Час відправлення: <span class="element-departure-time">${elem.departureTime}</span></p>
        <p class="element-text">Час прибуття: <span class="element-arrival-time">${elem.arrivalTime}</span></p>
        <p class="element-text">Ціна квитка: <span class="element-ticket-price">${elem.ticketPrice}</span> UAH</p>
    </div>
    <div class="element-footer">
        <button class="blue-button" onclick="modifyModalToEdit(${id})">Edit</button><span> </span>
        <button class="red-button" onclick="removeElementFromStorage(${id})">Delete</button>
    </div>
    <p></p>
    `)
    document.getElementsByClassName("displayzone")[0].appendChild(element)
}

// Зміна параметрів модалки для СТВОРЕННЯ нового елементу
function modifyModalToCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Створити новий білет"
    document.getElementById("submitbtn").setAttribute("onclick", `addElementToLocalStorage()`)
    document.getElementById("submitbtn").innerText = "Створити"
    document.getElementById("img-prev-section").setAttribute("style", "display: none")
    document.getElementById("label-select-img").innerText = "Select image file:"
    //  Вікриваємо модалку
    modal.open()
}

// Зміна параметрів модалки для РЕДАГУВАННЯ поточного елементу
function modifyModalToEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Редагування білета"
    document.getElementById("submitbtn").innerText = "Оновити"
    document.getElementById("submitbtn").setAttribute("onclick", `editElementInLocalStorage(${id})`)
    //  Вибираємо елемент по ID з LS і парсимо в об'єкт
    let edElem = JSON.parse(localStorage.getItem(id))
    //  Встановлюємо значення полів форми
    document.getElementById("flightNumber").value = edElem.flightNumber;
    document.getElementById("route").value = edElem.route;
    document.getElementById("departureDate").value = edElem.departureDate;
    document.getElementById("departureTime").value = edElem.departureTime;
    document.getElementById("arrivalTime").value = edElem.arrivalTime;
    document.getElementById("ticketPrice").value = edElem.ticketPrice;
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.pictname}`)
    document.getElementById("label-select-img").innerText = "Ви можете вибрати інший файл зображення:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
    // document.getElementById("imgfile").value = edElem.pictname; 
    //  Вікриваємо модалку
    modal.open()
}

//  Відображення в модалці зменшеної картинки
function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`)
    document.getElementById("label-select-img").innerText = "Ви можете вибрати інший файл зображення:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
}

//Слухаємо, чи змінилося значення поля input type="file" (чи вибралася інша картинка)
document.getElementById("imgfile").addEventListener("change", showPrewImg)


//Валідація введеного імені і інших даних
function validFlightData() {
    let valid = true;
    let errorMsg = '';

    const flightNumber = document.getElementById("flightNumber").value.trim();
    const route = document.getElementById("route").value.trim();
    const departureDate = document.getElementById("departureDate").value.trim();
    const departureTime = document.getElementById("departureTime").value.trim();
    const arrivalTime = document.getElementById("arrivalTime").value.trim();
    const ticketPrice = document.getElementById("ticketPrice").value.trim();

    if (!flightNumber) {
        errorMsg += 'Поле номеру рейсу порожнє. Будь ласка, введіть номер рейсу.\n';
        valid = false;
    }

    if (!route) {
        errorMsg += 'Поле маршруту порожнє. Будь ласка, введіть маршрут.\n';
        valid = false;
    }

    if (!departureDate) {
        errorMsg += 'Поле дати відправлення порожнє. Будь ласка, введіть дату відправлення.\n';
        valid = false;
    }

    if (!departureTime) {
        errorMsg += 'Поле часу відправлення порожнє. Будь ласка, введіть час відправлення.\n';
        valid = false;
    }

    if (!arrivalTime) {
        errorMsg += 'Поле часу прибуття порожнє. Будь ласка, введіть час прибуття.\n';
        valid = false;
    }

    if (!ticketPrice) {
        errorMsg += 'Поле ціни квитка порожнє. Будь ласка, введіть ціну квитка.\n';
        valid = false;
    }

    if (valid) {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

function validImg() {
    if (document.getElementById("imgfile").value) {
        return true;
    } else {
        alert("Зображення для квитка не вибрано. Будь ласка, виберіть зображення для квитка.");
        return false;
    }
}
// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (validFlightData() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        // Будуємо новий елемент
        const newElement = {};
        newElement.flightNumber = document.getElementById("flightNumber").value.trim();
        newElement.route = document.getElementById("route").value.trim();
        newElement.departureDate = document.getElementById("departureDate").value.trim();
        newElement.departureTime = document.getElementById("departureTime").value.trim();
        newElement.arrivalTime = document.getElementById("arrivalTime").value.trim();
        newElement.ticketPrice = document.getElementById("ticketPrice").value.trim();
        newElement.pictname = filename; 
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement)
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
// Редагування параметрів елемента та розміщення його в LS
function editElementInLocalStorage(id) {
    if (validFlightData()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.flightNumber = document.getElementById("flightNumber").value.trim();   
        edElem.route = document.getElementById("route").value.trim();   
        edElem.departureDate = document.getElementById("departureDate").value.trim();   
        edElem.departureTime = document.getElementById("departureTime").value.trim();   
        edElem.arrivalTime = document.getElementById("arrivalTime").value.trim();   
        edElem.ticketPrice = document.getElementById("ticketPrice").value.trim();             
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(''); 
            edElem.pictname = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000) //Перезавантажуємо вікно
    }
   
}

// Видалення параметрів елемента з LS
function removeElementFromStorage(id){
    if (confirm("Are you sure you want to delete?")) {
        localStorage.removeItem(id)
        location.reload();          //Перезавантажуємо вікно
    }

} 

let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}
