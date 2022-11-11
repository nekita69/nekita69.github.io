var all_div = []

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

function CreateObj(str)
{
    var a_a = [document.createElement('a'), document.createElement('a')];
    var div_2 = [document.createElement('div'),document.createElement('div')];
    
    a_a[0].innerHTML = "-";
    a_a[1].innerHTML = "X";

    var div_1 = document.createElement('div');
    div_1.setAttribute('class','block-message-head');

    for(var i = 0; i < a_a.length; i++)
    {
        div_2[i].setAttribute('class', 'marg');
        div_2[i].appendChild(a_a[i]);

        div_1.appendChild(div_2[i]);
    }

    var maindiv = document.createElement('div');
    maindiv.setAttribute('class', 'block-message');

    var divbody = document.createElement('div');
    divbody.setAttribute('class', 'block-message-body');
    divbody.innerText = str;
    
    maindiv.appendChild(div_1);
    maindiv.appendChild(divbody);


    var main = document.getElementById('mmain');
    main.appendChild(maindiv);
}

function DeleteObject(el)
{
    var main = document.getElementById('mmain');
    main.removeChild(el);
}

function Delete(el)
{
    DeleteObject(el.parentNode.parentNode);
}



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

    a[0].setAttribute('href', '');
    a[1].setAttribute('onclick', 'Delete(this)');

    headdiv.appendChild(a[0]);
    headdiv.appendChild(a[1]);

    maindiv.appendChild(headdiv);
    maindiv.appendChild(bodydiv);

    var main = document.getElementById("mmain");
    main.appendChild(maindiv);
}

function ClickButt()
{
    var t = document.getElementsByTagName('textarea');
    if(t[0].value != "")
    {
        CreateObject(t[0].value);
    }
}
