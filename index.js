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
const eventsList = new Events();

const button = document.getElementById("add");

button.addEventListener('click', e => {
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


  function loadIntoTable(events, table) {
  const headers = ["Date", "Time", "Description", "Place", "Person", "Hero", "Age"];
  const rows = events;
  table.innerHTML = `
    <thead><tr>${headers.map((itm)=>{
      return `<th>${itm}</th>`
    },"").join("")}</tr></thead>

    <tbody>${rows.map((itm)=>{
      return `<tr>${
        Object.values(itm).map((i)=>{
          return `<td>${i || ""}</td>`
        },'').join("")
      }</tr>`
    },'').join('')}</tbody>
`
}

  console.log(event);
  console.log(JSON.parse(eventsList.show()));
  loadIntoTable(JSON.parse(eventsList.show()),document.querySelector("table"));
});