const list = document.getElementById('list');
const input = document.getElementById('task');
const sub = document.getElementById('submit');
sub.addEventListener('click', function(){
    if(input.value === ""){
        return;
    }
    const li = document.createElement('li');

    const div = document.createElement('div');
    const para = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const article = document.createElement('article');
    deleteBtn.innerHTML='Delete';
    editBtn.innerHTML='Edit';
    para.innerHTML=input.value;

    
    div.appendChild(para);
    article.appendChild(editBtn);
    article.appendChild(deleteBtn);
    
    div.appendChild(article);
    li.appendChild(div);
    
    
    list.appendChild(li);

    deleteBtn.onclick = function (e) {
        var li = e.target.parentNode.parentNode;
        e.target.parentNode.parentNode.parentNode.removeChild(li);
    }

    editBtn.onclick = function (e){
        var text = prompt('Enter the edited todo','Default');
        if(text != null){
            e.target.parentNode.parentNode.childNodes[0].innerHTML = text;
        }
    }

    input.value="";
});