// DOM
const list = document.getElementById("list");
const enter = document.getElementById("enter");

const taskText = document.getElementById("taskText");

// vars
const Tasks = [];
let filter = "all";

// function for enter task
const enterTask = () => {
  let task = {
    text: taskText.value,
    complete: false,
  };

  taskText.value = "";

  Tasks.push(task);

  printTasks();
};

// enter key
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    enterTask();
  }
});

// function for printing tasks
const printTasks = () => {
  let content = "";

  Tasks.forEach((t, i) => {
    if (filter == "all") {
      content += `
                <div class="mission">
                    <div class="complete" onclick="doTask(${i})">${
        t.complete ? "✔" : "◯"
      }</div>
                    <div class="text">${t.text}</div>
                    <div class="remove" onclick="removeTask(${i})">⛌</div>
                </div>
            `;
    } else if (filter == "todo" && !t.complete) {
      content += `
                  <div class="mission">
                      <div class="complete" onclick="doTask(${i})">◯</div>
                      <div class="text">${t.text}</div>
                      <div class="remove" onclick="removeTask(${i})">⛌</div>
                  </div>
              `;
    } else if (filter == "done" && t.complete) {
      content += `
                    <div class="mission">
                        <div class="complete" onclick="doTask(${i})">✔</div>
                        <div class="text">${t.text}</div>
                        <div class="remove" onclick="removeTask(${i})">⛌</div>
                    </div>
                `;
    }
  });

  list.innerHTML = content;
};

// function for removing tasks
const removeTask = (index) => {
  Tasks.splice(index, 1);
  printTasks();
};

// function for complete tasks
const doTask = (index) => {
  Tasks[index].complete = true;
  printTasks();
};

// function for filter tasks
const filterTasks = (f, e) => {
  document
    .getElementById("fTodo")
    .classList[`${e == "fTodo" ? "add" : "remove"}`]("active");
  document
    .getElementById("fDone")
    .classList[`${e == "fDone" ? "add" : "remove"}`]("active");
  document
    .getElementById("fAll")
    .classList[`${e == "fAll" ? "add" : "remove"}`]("active");

  filter = f;
  printTasks();
};

// enter onclick button
enter.onclick = () => {
  if (taskText.value) enterTask();
};
