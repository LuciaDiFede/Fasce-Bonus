const api_url = 'https://jsonplaceholder.typicode.com/users';
const c = (el) => document.createElement(el);
const q = (el) => document.querySelector(el);

const usersEl = q('.container');
const firstAgeEl = q('.age-18');
const secondAgeEl = q('.age-36');
const thirdAgeEl = q('.age-65');


async function getArray() {
  const response = await fetch(api_url);
  const data = await response.json();
  // console.log(data);

  const createdAge = data.map((user) => ({
    ...user,
    age: Math.floor(Math.random() * (82 - 18 + 1) + 18),
  }));
  // console.log(createdAge)

  //  Prima fascia di età
  const filteredFirst = createdAge.filter(
    (user) => user.age <= 35 && user.age >= 18
  );

  if (filteredFirst.length) {
    filteredFirst.map((userData) =>
      createCard(firstAgeEl, userData.name, userData.phone, userData.age)
    );
  } else {
    firstAgeEl.innerHTML = `<div>
        <h2>Utenti con età compresa tra i 18 e i 35 anni</h2>
        <p>Nessun utente rientra in questi requisiti di età</p>
        </div>`;
  }

  //  Seconda fascia di età
  const filteredSecond = createdAge.filter(
    (user) => user.age <= 64 && user.age >= 36
  );

  if (filteredSecond.length) {
    filteredSecond.map((userData) =>
      createCard(secondAgeEl, userData.name, userData.phone, userData.age)
    );
  } else {
    secondAgeEl.innerHTML = `<div>
        <h2>Utenti con età compresa tra i 36 e i 64 anni</h2>
        <p>Nessun utente rientra in questi requisiti di età</p>
        </div>`;
  }

  //  Terza fascia di età
  const filteredThird = createdAge.filter((user) => user.age > 64);

  if (filteredThird.length) {
    filteredThird.map((userData) =>
      createCard(thirdAgeEl, userData.name, userData.phone, userData.age)
    );
  } else {
    thirdAgeEl.innerHTML = `<div>
        <h2>Utenti con età superiore ai 64 anni</h2>
        <p>Nessun utente rientra in questi requisiti di età</p>
        </div>`;
  }
}

getArray();



const createCard = (parent, name, phone, age) => {
  const wrapperEl = c('div');
  const nameEl = c('h3');
  const phoneEl = c('p');
  const ageEl = c('p');

  wrapperEl.className = "card-wrapper"
  nameEl.className = "name"
  phoneEl.className = "phone"
  ageEl.className = "age"

  nameEl.textContent = name
  phoneEl.textContent = `Telefono: ${phone}`
  ageEl.textContent = `Età: ${age} anni`;

  wrapperEl.append(nameEl, ageEl, phoneEl);
  parent.appendChild(wrapperEl);
}



 