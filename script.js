//clear the list
const reset = document.querySelector(".clear");
reset.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

let List, noItems=0;

//Fetching data from input 
const input = document.getElementById("input");

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const taskName=input.value;

        if(taskName){
            addToDo(taskName,noItems,false,false);

            List.push({
                name:taskName,
                count:noItems,
                complete:false,
                remove:false
            });
            localStorage.setItem("TODO", JSON.stringify(List));
            noItems++;
        }
        else{
            alert("Please enter Task First!!")
        }
        input.value= "";
    }
});



// Adding ToDo list element
const list = document.getElementById("list");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";



let data = localStorage.getItem("TODO");
    if(data){
        List=JSON.parse(data);
        noItems=List.length;
        loadList(List);
    }
    else{
        List=[];
        noItems=0;
    }

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.count,item.complete,item.remove);
    });
}

function addToDo(name,count,complete,remove){
    if(remove){
        return;
    }

    const DONE= complete ? CHECK : UNCHECK;
    const Line= complete ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${count}"></i>
                    <p class="text ${Line}">${name}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${count}"></i>
                  </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    List[element.id].complete=List[element.id].complete? false:true;
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    List[element.id].remove = true;
    noItems--;
}
list.addEventListener("click",function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(List));
});

//Display total task
const totalTask= document.getElementById("showTask");

function display(){
    var totalTaskin="Total Task: "+noItems;
    totalTask.innerHTML = totalTaskin;
}

setInterval(display,10);

