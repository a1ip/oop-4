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
            previous + `  ${entry[0]}: ${entry[1] ? `"${entry[1]}"` : null},\n`
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
            previous + `  ${entry[0]}: ${entry[1] ? `"${entry[1]}"` : null},\n`
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
            previous + `  ${entry[0]}: ${entry[1] ? `"${entry[1]}"` : null},\n`
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
/*
function initEventTypeSelector() {
  const eventTypeSelect = document.getElementById("eventTypeSelect");
  const themeStylesheetLink = document.getElementById("themeStylesheetLink");
  const currentEvents = localStorage.getItem("events") || new Events();

  function addEvent(themeName) {
      themeStylesheetLink.setAttribute("href", `css/themes/${themeName}.css`);
  }

  themeSelect.addEventListener("change", () => {
      activateTheme(themeSelect.value);
      localStorage.setItem("events", themeSelect.value);
  });


  themeSelect.value = currentTheme;
  activateTheme(currentTheme);
}

initThemeSelector();*/

async function loadIntoTable(url, table) {
  const response = await fetch(url);
  const { headers, rows } = await response.json();
  table.innerHTML = `
    <thead><tr>${headers.map((itm)=>{
      return `<th>${itm}</th>`
    },"").join("")}</tr></thead>

    <tbody>${rows.map((itm)=>{
      return `<tr>${
        itm.map((i)=>{
          return `<td>${i || ""}</td>`
        },'').join("")
      }</tr>`
    },'').join('')}</tbody>
`
}

const button = document.getElementById("add");

button.addEventListener('click', event => {
  switch (event.eventType) {
    case "Другое":
      Events.add(
        new Custom({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minuts,
          description: event.description
        })
      );
      break;
    case "Встреча":
      Events.add(
        new Meeting({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minuts,
          place: event.place,
          person: event.person
        })
      );
      break;
    case "День Рождения":
      Events.add(
        new BirthDay({
          date: event.date,
          time:
          event.time.hours +
            ":" +
            event.time.minuts,
          place: event.place,
          hero: event.hero,
          age: event.age
        })
      );
      break;
  }
});

loadIntoTable("./data.json",document.querySelector("table"));
