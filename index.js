class Event {
  // конструктор
  constructor(param) {
    // в качестве аргумента конструктор принимает объект param
    this.date = param.date;
    this.time = param.time;
  }
}

class BirthDay extends Event {
  // конструктор
  constructor(param) {
    // в качестве аргумента конструктор принимает объект param
    super(param);
    this.hero = param.hero;
    this.place = param.place;
    this.age = param.age;
  }
  // методы
  toString() {
    return (
      Object.entries(this)
        .reduce(function (previous, entry) {
          return (
            previous + `  "${entry[0]}": ${entry[1] ? `"${entry[1]}"` : null},\n`
          );
        }, "{\n")
        .slice(0, -2) + "\n}" // .slice(0, -2) для красоты убираю запятую после последнего свойства
    );
  }
}

class Meeting extends Event {
  // конструктор
  constructor(param) {
    // в качестве аргумента конструктор принимает объект param
    super(param);
    this.person = param.person;
    this.place = param.place;
  }
  // методы
  toString() {
    return (
      Object.entries(this)
        .reduce(function (previous, entry) {
          return (
            previous + `  "${entry[0]}": ${entry[1] ? `"${entry[1]}"` : null},\n`
          );
        }, "{\n")
        .slice(0, -2) + "\n}" // .slice(0, -2) для красоты убираю запятую после последнего свойства
    );
  }
}

class Custom extends Event {
  // конструктор
  constructor(param) {
    // в качестве аргумента конструктор принимает объект param
    super(param);
    this.description = param.description;
  }
  // методы
  toString() {
    return (
      Object.entries(this)
        .reduce(function (previous, entry) {
          return (
            previous + `  "${entry[0]}": ${entry[1] ? `"${entry[1]}"` : null},\n`
          );
        }, "{\n")
        .slice(0, -2) + "\n}" // .slice(0, -2) для красоты убираю запятую после последнего свойства
    );
  }
}

class Events {
  // конструктор
  constructor(events) {
    // в качестве аргумента конструктор принимает массив объектов событий events
    this.events = events || []; // если конструктор не получит параметров, то создаётся пустой массив
  }
  // методы
  show() {
    return this.events.length // проверяем что список не пуст
      ? this.events
          .reduce(function (previous, event) {
            return previous + event.toString() + ",\n";
          }, "[")
          .slice(0, -2) + "]" // .slice(0, -2) для красоты убираю запятую после последнего свойства
      : "[]"; // если список пуст
  }

  add(event) {
    this.events.push(event); // добавляем в массив событий новое событие
    return this.events;
  }

  sortByDate() {
    this.events.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    return this.events;
  }

  sortByTime() {
    this.events.sort(function (a, b) {
      return (
        new Date("1970-01-01T" + a.time + ":00") - // сортируем события по времени так как как если бы они являлись
        new Date("1970-01-01T" + b.time + ":00") // датами со временем одного и того же дня
      );
    });
    return this.events;
  }
}

function loadIntoTable(events, table) {
  const headers = ["Дата", "Время", "Описание", "Место", "С кем встреча", "Именинник", "Возраст"];
  const rows = events;
  table.innerHTML = `
    <thead><tr>${headers.map((itm)=>{
      return `<th>${itm}</th>`
    },"").join("")}</tr></thead>

    <tbody>${rows.map((e)=>{
      return `<tr>${
        [e.date, e.time, e.description, e.place, e.person, e.hero, e.age].map((i)=>{
          return `<td>${i || ""}</td>`
        },'').join("")
      }</tr>`
    },'').join('')}</tbody>
`
}

const eventsList = new Events();

const eventType = document.getElementById("eventType");

eventType.addEventListener('change', e => {
  const fields = {
    type: document.getElementById("eventType"),
    description: document.querySelector(".description"),
    place: document.querySelector(".place"),
    person: document.querySelector(".person"),
    hero: document.querySelector(".hero"),
    age: document.querySelector(".age")
  };
  switch (fields.type.value) {
    case "custom":
      fields.description.classList.remove("hidden");
      fields.place.classList.add("hidden");
      fields.person.classList.add("hidden");
      fields.hero.classList.add("hidden");
      fields.age.classList.add("hidden");
      break;
    case "meeting":
      fields.description.classList.add("hidden");
      fields.place.classList.remove("hidden");
      fields.person.classList.remove("hidden");
      fields.hero.classList.add("hidden");
      fields.age.classList.add("hidden");
      break;
    case "birthDay":
      fields.description.classList.add("hidden");
      fields.place.classList.remove("hidden");
      fields.person.classList.add("hidden");
      fields.hero.classList.remove("hidden");
      fields.age.classList.remove("hidden");
      break;
  }
})

const collection = document.querySelector("table");

const addButton = document.getElementById("add");

addButton.addEventListener('click', e => {
  const event = {
    type: document.getElementById("eventType").value,
    date: document.getElementById("date").value,
    time: {
      hours: document.getElementById("hours").value,
      minutes: document.getElementById("minutes").value
    },
    description: document.getElementById("description").value,
    place: document.getElementById("place").value,
    person: document.getElementById("person").value,
    hero: document.getElementById("hero").value,
    age: document.getElementById("age").value
  }
  switch (event.type) {
    case "custom":
      eventsList.add(
        new Custom({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minutes,
          description: event.description
        })
      );
      break;
    case "meeting":
      eventsList.add(
        new Meeting({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minutes,
          place: event.place,
          person: event.person
        })
      );
      break;
    case "birthDay":
      eventsList.add(
        new BirthDay({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minutes,
          place: event.place,
          hero: event.hero,
          age: event.age
        })
      );
      break;
  }

loadIntoTable(JSON.parse(eventsList.show()),collection);
});

const sortByDateButton = document.getElementById("sortByDate");

sortByDateButton.addEventListener('click', e => {
  eventsList.sortByDate()
  loadIntoTable(JSON.parse(eventsList.show()),collection);
})

const sortByTimeButton = document.getElementById("sortByTime");

sortByTimeButton.addEventListener('click', e => {
  eventsList.sortByTime()
  loadIntoTable(JSON.parse(eventsList.show()),collection);
})