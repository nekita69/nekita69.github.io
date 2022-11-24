
function ChangeColorType(t)
{
    var s = document.getElementById('body');

    if(t == "black")
    {
        s.style.background = "linear-gradient(#09022e, #ff1154)";
    }
        
    if(t == "white")
    {
        s.style.background = "linear-gradient(#5ee6f0, #9a3deb, #6912d5)";
    }
}

//Передаем объект(дочерний элемент) и его отвязываем от нашего главного блока;
function DeleteObject(el)
{
    var main = document.getElementById('mmain');
    main.removeChild(el);
}

//Передаем объект и находим от него родительский элемент;
function Delete(el)
{
    var o = el.parentNode.parentNode.childNodes;
    for(var i = 0; i < localStorage.length; i++)
    {
        if(o[1].innerHTML == localStorage.getItem(localStorage.key(i)))
            {localStorage.removeItem(localStorage.key(i)); break;}
    }
    DeleteObject(el.parentNode.parentNode);
}

//Метод чтобы свернуть блок;
function ChangeVisible(el)
{
    var c = el.parentNode.parentNode.childNodes;
    
    if(c[1].getAttribute('class') == 'block-message-body')
        c[1].setAttribute('class', 'block-message-body-on');
    else
        c[1].setAttribute('class', 'block-message-body');
}

//Создание блока - передаем текст - создаем и цепляем к главному блоку;
function CreateObject(str)
{
    var maindiv = document.createElement('div');
    maindiv.setAttribute('class', 'block-message');

    var headdiv = document.createElement('div');
    headdiv.setAttribute('class', 'block-message-head');

    var bodydiv = document.createElement('div');
    bodydiv.setAttribute('class', 'block-message-body');
    bodydiv.innerHTML = str;

    var a = [document.createElement('a'), document.createElement('a')];
    
    a[0].innerHTML = '-';
    a[1].innerHTML = "X";

    a[0].setAttribute('class', 'marg');
    a[1].setAttribute('class', 'marg');

    a[0].setAttribute('onclick', 'ChangeVisible(this)');
    a[1].setAttribute('onclick', 'Delete(this)');

    headdiv.appendChild(a[0]);
    headdiv.appendChild(a[1]);

    maindiv.appendChild(headdiv);
    maindiv.appendChild(bodydiv);

    var main = document.getElementById("mmain");
    main.appendChild(maindiv);

    var tex = "text" + localStorage.length;
    localStorage.setItem(tex, str);
}

function CreateObjectLoad(str)
{
    var maindiv = document.createElement('div');
    maindiv.setAttribute('class', 'block-message');

    var headdiv = document.createElement('div');
    headdiv.setAttribute('class', 'block-message-head');

    var bodydiv = document.createElement('div');
    bodydiv.setAttribute('class', 'block-message-body');
    bodydiv.innerHTML = str;

    var a = [document.createElement('a'), document.createElement('a')];
    
    a[0].innerHTML = '-';
    a[1].innerHTML = "X";

    a[0].setAttribute('class', 'marg');
    a[1].setAttribute('class', 'marg');

    a[0].setAttribute('onclick', 'ChangeVisible(this)');
    a[1].setAttribute('onclick', 'Delete(this)');

    headdiv.appendChild(a[0]);
    headdiv.appendChild(a[1]);

    maindiv.appendChild(headdiv);
    maindiv.appendChild(bodydiv);

    var main = document.getElementById("mmain");
    main.appendChild(maindiv);

}

//Для создания объекта - он вызывает метод создания;
function ClickButt()
{
    var t = document.getElementsByTagName('textarea');
    if(t[0].value != "")
    {
        CreateObject(t[0].value);
    }
}


//Загрузка страницы;

function load()
{
    for(var i = 0; i < localStorage.length; i++)
    {
        CreateObjectLoad(localStorage.getItem(localStorage.key(i)));
    }
}

window.onload = load();


function move(el)
{
    el.setAttribute('class','block-photo-move');
}

function lev(el)
{
    el.setAttribute('class', 'block-photo');
}


function changeText(el)
{
    var temp = el.innerHTML;
    var p = document.getElementsByClassName('main-photo')[0];

    el.innerHTML = p.innerHTML;
    p.innerHTML = temp;
}