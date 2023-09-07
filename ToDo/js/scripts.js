function MakeTask(id, title, desc, teg, complete){
    /* Создание при загрузке страницы */
    let task = document.createElement('div');
    task.setAttribute('class', 'task');
    task.setAttribute('id', "task" + String(id));

    let titleTask = document.createElement('div');
    titleTask.setAttribute('class', 'task-title');
    
    let in1 = document.createElement('input');
    in1.setAttribute('type', 'checkbox');
    in1.setAttribute('onclick', 'CompleteTask(this)');
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerHTML = title;
    div.appendChild(h2);
    
    let in2 = document.createElement('input');
    in2.setAttribute('type', 'button');
    in2.setAttribute('value', 'x');
    in2.setAttribute('onclick', 'DeleteTask(this)'); 
    in2.setAttribute('class', 'btn-inp-close');

    titleTask.appendChild(in1);
    titleTask.appendChild(div);
    titleTask.appendChild(in2);

    let descTask = document.createElement('div');
    descTask.setAttribute('class', 'task-desc');
    let p = document.createElement('p');
    p.innerHTML = desc;
    descTask.appendChild(p);

    let tegTask = document.createElement('div');
    tegTask.setAttribute('class', 'task-teg');
    tegTask.innerHTML = teg;


    task.appendChild(titleTask);
    task.appendChild(descTask);
    task.appendChild(tegTask);

    let tasks = document.getElementById("allTasks");
    
    if(complete == "true") //Если стоит флаг - выполнено
    {
        div.classList.toggle('complete');
        in1.checked = true;
        tasks.append(task);
        return;
    }

    tasks.prepend(task);
    return;
}

window.tasks = ""; //Глобальная переменная;
window.lastId = 0;

function firstStart(){
    //Функция при загрузке страницы
    window.tasks = localStorage.getItem('allTasks');
    //Проверяем существует ли в LS нужное значение
    if(window.tasks == null){
       //При первой загрузке
       window.lastId = 0;
       localStorage.setItem('lastId', window.lastId); //Для id заметок
       
        let firstTask = { //Первая заметка
            "id":localStorage.getItem('lastId'),
            "title":"Первая заметка",
            "desc":"Познакомиться с todo list",
            "teg":"Home",
            "complete":"false"
        };

        let ts = {"task0":firstTask};
        localStorage.setItem('allTasks',JSON.stringify(ts));
    }
    else{
        window.tasks = JSON.parse(window.tasks);
        window.lastId = Number(localStorage.getItem('lastId'));
        for (const [key, value] of Object.entries(tasks)) {
            MakeTask(value['id'], value['title'], value['desc'], value['teg'], value['complete'])
        }
        
    }
}
window.onload = firstStart;

function updateLStorage(){
    localStorage.setItem("allTasks", JSON.stringify(window.tasks));
    localStorage.setItem("lastId", window.lastId);
}

function OpenCloseCT(el){ //Открытие-закрытие формы;
    let ct = document.getElementsByClassName('create-task-body')[0];
    ct.classList.toggle('active');
    if(ct.classList.length == 2)
        el.innerHTML = "X";
    else
        el.innerHTML = "+";
    //none
}



function CreateTask(){
    /* Создание задачи с данными из формы */
    let title = document.getElementById("title").value;
    let teg = document.getElementById("tegs-select").value;
    let desc = document.getElementById("description").value;
    
    if(title != "" && teg != "" && desc != "")
    {
        let task = document.createElement('div');
        task.setAttribute('class', 'task');
        
        //Добавление в список объектов;
        window.lastId += 1;//Увеличиваем id;
        let index = "task" + String(window.lastId);
        window.tasks[String(index)] = {
            "id":window.lastId,
            "title":title,
            "desc":desc,
            "teg":teg,
            "complete":"false"
        };
        updateLStorage();
        console.log(localStorage['allTasks']);
        task.setAttribute('id', "task" + String(window.lastId));

        let titleTask = document.createElement('div');
        titleTask.setAttribute('class', 'task-title');
        
        let in1 = document.createElement('input');
        in1.setAttribute('type', 'checkbox');
        in1.setAttribute('onclick', 'CompleteTask(this)'); 

        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerHTML = title;
        div.appendChild(h2);

        let in2 = document.createElement('input');
        in2.setAttribute('type', 'button');
        in2.setAttribute('value', 'x');
        in2.setAttribute('onclick', 'DeleteTask(this)'); 
        in2.setAttribute('class', 'btn-inp-close');

        titleTask.appendChild(in1);
        titleTask.appendChild(div);
        titleTask.appendChild(in2);

        let descTask = document.createElement('div');
        descTask.setAttribute('class', 'task-desc');
        let p = document.createElement('p');
        p.innerHTML = desc;
        descTask.appendChild(p);

        let tegTask = document.createElement('div');
        tegTask.setAttribute('class', 'task-teg');
        tegTask.innerHTML = teg;


        task.appendChild(titleTask);
        task.appendChild(descTask);
        task.appendChild(tegTask);

        let tasks = document.getElementById("allTasks");
        tasks.prepend(task);

        OpenCloseCT();

        return;
    }
    alert("Заполните все поля");
}

function DeleteTask(el){
    //Удаление задачи;
    let parent = el.parentNode.parentNode;
    let tasks = document.getElementById("allTasks");
    
    delete window.tasks[String(parent.id)];
    updateLStorage();

    tasks.removeChild(parent);
}
function CompleteTask(el){
    //Выполнено - в конец списка;
    let allTasks = document.getElementById('allTasks');
    let task = el.parentNode.parentNode;

    let parent = el.parentNode;
    let div = parent.querySelector('div');
    div.classList.toggle('complete');
    if(div.classList.length == 0){
        //Добавление в начало;
        allTasks.removeChild(task);
        allTasks.prepend(task);
        window.tasks[String(task.id)]["complete"] = "false";
        updateLStorage();
        return;
    }
    allTasks.removeChild(task);
    allTasks.appendChild(task);
    window.tasks[String(task.id)]["complete"] = "true";
    updateLStorage();
}
function Delete(n){
    //Удаление первого или последнего элемента;
    let allTasks = document.getElementById("allTasks");
    let all = document.getElementsByClassName("task");
    if(all.length != 0){
        if(n==0){ //Удаление первого элемента
            allTasks.removeChild(all[0]);

            delete window.tasks[String(all[0].id)];
            updateLStorage();
            return;
        }
        allTasks.removeChild(all[all.length-1]);
        delete window.tasks[String(all[all.length-1].id)];
        updateLStorage();
        return;
    }
}


function DeleteClass(){
    //Удаление всех классов выделения;
    let all = document.getElementsByClassName("task");
    if(all.length > 0){
        for(let i = 0; i < all.length; i++)
            for(let j = 0; j < all[i].classList.length; j++)
            {
                if(all[i].classList[j] == "choice0")
                    all[i].classList.toggle('choice0');

                if(all[i].classList[j] == "choice1")
                    all[i].classList.toggle('choice1');
            }
    }
}
function Choice(n){
    let all = document.getElementsByClassName("task");
    if(all.length > 0){
        DeleteClass();
        if(n=="0"){
            for(let i = 0; i < all.length; i=i+2)
                if(i <= all.length-1)
                    all[i].classList.toggle('choice0');
            return;
        }
        for(let i = 1; i < all.length; i=i+2)
            if(i <= all.length-1)
                all[i].classList.toggle('choice1');
        return;
    }
}
