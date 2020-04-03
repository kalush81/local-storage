document.addEventListener("DOMContentLoaded", () => {
  const myList = document.querySelector(".showing");
  const task = document.getElementById("task");

  function getTasks() {
    //get tasks from ls
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task => addTask(task));
  }
  function addTask(task) {
    //create list item task
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));

    //create delete task button
    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode("delete task"));

    //append button to list item
    li.appendChild(btn);
    myList.appendChild(li);
  }
  getTasks();

  //add task from form to UI and LS
  document.querySelector("#form").addEventListener("submit", event => {
    event.preventDefault();
    if (task.value == false) return;
    //add to UI
    addTask(task.value);

    //add to LS
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.value = "";
  });

  //remove task from UI and LS
  myList.addEventListener("click", e => {
    //remove from UI
    let toBeDel
    if (e.target.closest('li > button')) {
        toBeDel = e.target.parentNode.childNodes[0].wholeText;
        e.target.parentNode.remove();   
    }
    //remove from LS
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.indexOf(toBeDel);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks))
    
  });

  //   tasks = localStorage.getItem("tasks")
  //     ? JSON.parse(localStorage.getItem("tasks"))
  //     : [];
  //   display();

  //   document.querySelector("#form").addEventListener("submit", event => {
  //     event.preventDefault();
  //     if (task.value == false) return;
  //     update(task.value);
  //     display();
  //     task.value = "";
  // });

  //   function update(task) {
  //     tasks.push(task);
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }

  //   function delfromStore(del) {
  //     tasks = JSON.parse(localStorage.getItem("tasks"));
  //     const actual = tasks.filter(one => one !== del);
  //     localStorage.setItem("tasks", JSON.stringify(actual));
  //     display();
  //   }

  //   function display() {
  //     let newTask = "";
  //     tasks.forEach(task => {
  //       newTask += `<li>${task}<button>del</button></li>`;
  //     });
  //     myList.innerHTML = newTask;
  //     const btns = document.querySelectorAll('button');
  //     btns.forEach(btn => {
  //         btn.addEventListener('click', function(e){
  //             console.log(this.parentElement)
  //             this.parentElement.remove()
  //             const toBeDel = e.currentTarget.parentElement.childNodes[0].data;
  //             delfromStore(toBeDel);
  //         })
  //     })
  //   }
});
