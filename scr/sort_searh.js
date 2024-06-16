function getArrayFromStorage() {
  let keyNumbers = Object.keys(localStorage).length;
  let incomingArr = [];

  for (let i = 0; i < keyNumbers; i++) {
      let keyName = localStorage.key(i);
      let row = JSON.parse(localStorage.getItem(keyName));
      let elm = {
          id: keyName,
          flightNumber: row.flightNumber,
          route: row.route,
          departureDate: row.departureDate,
          departureTime: row.departureTime,
          arrivalTime: row.arrivalTime,
          ticketPrice: row.ticketPrice,
          pictname: row.pictname,
      };
      incomingArr.push(elm);
  }
  return incomingArr;
}

function sortElements() {
  let checkBox = document.getElementById("sortcheckbox");
  if (checkBox.checked == true) {
      let sortArr = getArrayFromStorage();

      function byField(field) {
          return (a, b) => a[field] > b[field] ? 1 : -1;
      }

      sortArr.sort(byField('ticketPrice'));

      document.getElementsByClassName("displayzone")[0].innerHTML = '';
      for (let n = 0; n < sortArr.length; n++) {
          let tempEl = sortArr[n];
          buildElementToPage(tempEl.id, tempEl);
      }
  } else {
      setTimeout(location.reload(), 1000);
  }
}

function searchElements() {
  document.getElementsByClassName("displayzone")[0].innerHTML = '';
  let searchtArr = getArrayFromStorage();
  let str = document.querySelector("#csearch").value.toLowerCase();
  let regExp = new RegExp(`${str}`, "gi");
  let isFounded = false;

  for (let i = 0; i < searchtArr.length; i++) {
      let row = searchtArr[i];
      let strN = row.flightNumber.toLowerCase();
      let strR = row.route.toLowerCase();
      let strP = row.ticketPrice.toString().toLowerCase();
      if (regExp.test(strN) || regExp.test(strR) || regExp.test(strP)) {
          buildElementToPage(row.id, row);
          isFounded = true;
      }
  }
  if (!isFounded) {
      document.getElementsByClassName("displayzone")[0].innerHTML = '<h1 style="color:red; width:100%; text-align: center;" >No matches found</h1>';
  }
}

refresh = () => location.reload();

sortcheckbox.addEventListener('click', sortElements);

searchbtn.addEventListener('click', searchElements);

cancelbtn.addEventListener('click', refresh);
