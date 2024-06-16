// Задання вихідних параметрів (title, [x], content) конфігурації модалки 
const modal = $.modal({
    title: 'Ticket options',
    closable: true,
    content: `
    <div class="modal-form">
    <label for="flightNumber">Номер рейсу:</label><br>
    <input type="text" id="flightNumber" name="flightNumber" class="modal-form-field" placeholder="Введіть номер рейсу..."/><br><br>
    <label for="route">Маршрут:</label><br>
    <input type="text" id="route" name="route" class="modal-form-field" placeholder="Введіть маршрут..."/><br><br>
    <label for="departureDate">Дата відправлення:</label><br>
    <input type="date" id="departureDate" name="departureDate" class="modal-form-field"/><br><br>
    <label for="departureTime">Час відправлення:</label><br>
    <input type="time" id="departureTime" name="departureTime" class="modal-form-field"/><br><br>
    <label for="arrivalTime">Час прибуття:</label><br>
    <input type="time" id="arrivalTime" name="arrivalTime" class="modal-form-field"/><br><br>
    <label for="ticketPrice">Вартість квитка (UAH):</label><br>
    <input type="number" id="ticketPrice" name="ticketPrice" min="0" step="1" class="modal-form-field" placeholder="Введіть вартість квитка..."/><br><br>
    <div id="img-prev-section">
        <img id="imgprev" src="" >
    </div>   
    <label for="imgfile" id="label-select-img">Select image file:</label><br>
    <input type="file" id="imgfile" name="imgfile"><br><br>
    <button id="submitbtn" class="blue-button">Submit</button>
</div>

    `,
    width: '500px'
})

const registrationModal = $.modal({
    title: 'Регістрація на білет',
    closable: true,
    content: `
    <div class="modal-form">
        <label for="firstName">Ім'я:</label><br>
        <input type="text" id="firstName" name="firstName" class="modal-form-field" placeholder="Введіть своє ім'я..."/><br><br>
        <label for="lastName">Прізвище:</label><br>
        <input type="text" id="lastName" name="lastName" class="modal-form-field" placeholder="Введіть своє прізвище..."/><br><br>
        <label for="phoneNumber">Номер телефону:</label><br>
        <input type="text" id="phoneNumber" name="phoneNumber" class="modal-form-field" placeholder="Введіть свій номер телефону..."/><br><br>
        <label for="ticketSelect">Оберіть білет:</label><br>
        <select id="ticketSelect" name="ticketSelect" class="modal-form-field"></select><br><br>
        <button id="registerSubmitBtn" class="blue-button">Зареєструватися</button>
    </div>
    `,
    width: '400px'
});

const passengersModal = $.modal({
    title: 'Пасажири',
    closable: true,
    content: `<div id="passengerList" class="modal-list"></div>`,
    width: '600px'
});

function openRegistrationModal() {
    const ticketSelect = document.getElementById('ticketSelect');
    ticketSelect.innerHTML = ''; // Clear any existing options

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "registrations") {
            const ticket = JSON.parse(localStorage.getItem(key));
            const option = document.createElement('option');
            option.value = key;
            option.text = `${ticket.flightNumber} - ${ticket.route}`;
            ticketSelect.appendChild(option);
        }
    }

    registrationModal.open();
}

// Function to validate registration form data
function validRegistrationData() {
    let valid = true;
    let errorMsg = '';

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const ticketSelect = document.getElementById("ticketSelect").value;

    if (!firstName) {
        errorMsg += "Ім'я не заповнено. Будь ласка, введіть своє ім'я.\n";
        valid = false;
    }

    if (!lastName) {
        errorMsg += "Прізвище не заповнено. Будь ласка, введіть своє прізвище.\n";
        valid = false;
    }

    if (!phoneNumber) {
        errorMsg += "Номер телефону не заповнено. Будь ласка, введіть свій номер телефону.\n";
        valid = false;
    }

    if (!ticketSelect) {
        errorMsg += "Білет не обрано. Будь ласка, оберіть білет.\n";
        valid = false;
    }

    if (valid) {
        return true;
    } else {
        alert(errorMsg);
        return false;
    }
}

// Function to handle registration form submission
document.getElementById("registerSubmitBtn").addEventListener("click", () => {
    if (validRegistrationData()) {
        const registration = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            phoneNumber: document.getElementById("phoneNumber").value.trim(),
            ticketId: document.getElementById("ticketSelect").value
        };

        // Save registration to localStorage
        let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        registrations.push(registration);
        localStorage.setItem("registrations", JSON.stringify(registrations));

        registrationModal.close();
        alert('Реєстрацію завершено!');
    }
});


function openPassengersModal() {
    const passengerList = document.getElementById('passengerList');
    passengerList.innerHTML = ''; // Clear existing content

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    if (registrations.length === 0) {
        passengerList.innerHTML = '<p>Немає зареєстрованих пасажирів</p>';
    } else {
        registrations.forEach(registration => {
            const ticket = JSON.parse(localStorage.getItem(registration.ticketId));
            const passengerItem = document.createElement('div');
            passengerItem.classList.add('passenger-item');
            passengerItem.innerHTML = `
                <p>Ім'я: ${registration.firstName}</p>
                <p>Прізвище: ${registration.lastName}</p>
                <p>Номер телефону: ${registration.phoneNumber}</p>
                <p>Білет: ${ticket.flightNumber} - ${ticket.route}</p>
                <hr>
            `;
            passengerList.appendChild(passengerItem);
        });
    }

    passengersModal.open();
}