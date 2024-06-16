
// Неважлива фенкція. Служить для полегшеного запуску процесу демонстрації проекту
function prepare(){
    let startArray = [
        {flightNumber: "AA123", route: "New York - London", departureDate: "2024-06-15", departureTime: "08:00", arrivalTime: "14:00", ticketPrice: 250, pictname: "gallery_first_110656.jpg"},
        {flightNumber: "BB456", route: "London - Tokyo", departureDate: "2024-06-20", departureTime: "10:30", arrivalTime: "18:30", ticketPrice: 400, pictname: "Tokyo.jpg"},
        {flightNumber: "CC789", route: "Tokyo - Sydney", departureDate: "2024-06-25", departureTime: "12:45", arrivalTime: "21:00", ticketPrice: 550, pictname: "b1e36771-city-2258-163f4d7f814.jpg"}  
    ]
    
    localStorage.clear() //Очищуємо LocalStorage
    
    //Додаємо нові елементи в LocalStorage
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }

    location.reload();  //Перезавантажуємо вікно
}