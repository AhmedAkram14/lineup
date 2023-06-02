let mainbtn = document.querySelector('p button')
let section = document.querySelector('.sec')
let nameInput = document.querySelector('.form-control')
let overlayPopup = document.querySelector(".overlay-popup")
let errorOverlayPopup = document.querySelector(".error-overlay-popup")
let welcoming = document.querySelector(".overlay-popup .popup h3")
let goAheadBtn = document.querySelector(".overlay-popup .popup button")
let toDoPage = document.querySelector(".to-do-page")
let tasksHeader = document.querySelector(".tasks h2")
let listIcon = document.querySelector(".tasks .title .iconn")
let sideBar = document.querySelector(".side-bar")
let newTaskBtn = document.querySelector(".new-task")
let writeNewDiv = document.querySelector(".write-new")
let newTaskBox = document.querySelector(".task-box")
let userSpan = document.querySelector(".user")
let select = document.querySelector("select")
let maleImg = document.querySelector(".male")
let addTask = document.querySelector(".add")
let favTask = document.querySelector(".fav")
let addingInput = document.querySelector(".task-box input")
let added = document.querySelector(".added")
let tasksNumber = document.querySelector(".info .name p")
let all = document.querySelector(".all")
let inProgress = document.querySelector('.in-progress')
let completed = document.querySelector(".completed")
let favourite = document.querySelector('.favourite')
let trash = document.querySelector('.trash')
let reset = document.querySelector('.reset')
let trashAll = document.querySelector('.trash-all')
let empty = document.querySelector('.empty')
let star = document.querySelector('.iconns .fav svg')
let searhBar = document.querySelector('.search input')


console.log(added)
console.log(addingInput)
console.log(favTask)
console.log(listIcon)
console.log(sideBar)
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
onload = counting
// console.log(window.localStorage.get('todos'))
let todoData = []
const lists = {
    all: 'all',
    inProgress: 'inProgress',
    completed: 'completed',
    trash: 'trash',
    favourite: 'favourite'
} 
let activeList = lists.all;
// let listsCounts = {
//     all: 0,
//     inProgress: 0,
//     completed: 0,
//     trash: 0,
//     favourite:0
    
// }



let name = document.querySelector('.name h2')
if(window.localStorage.getItem('user')){
    section.style.display = 'none'
    toDoPage.style.display = 'flex'
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(nameInput)
    name.innerHTML = `${user.name}'s todo`
    if (user.gender == 'female'){
        maleImg.innerHTML = `<img src="css/female.png" width="100px" alt="">`
    }
    console.log(JSON.parse(localStorage.getItem('user')))
}

if (window.localStorage.getItem('todos') != null){
    todoData = JSON.parse(localStorage.todos);
   todoData.forEach(todo => {
    let element = todoToHtml(todo)
    added.append(element)
   })
console.log(todoData)

}

mainbtn.addEventListener("click", function () {
    
    if (nameInput.value.length > 0) {
        section.style.display = "none"
        userSpan.innerHTML = nameInput.value[0].toUpperCase() + nameInput.value.slice(1)
        overlayPopup.style.display = "block"
        const user = {

            name: nameInput.value,
            gender: select.value
        }
        
        if (select.value === "female") {
            maleImg.innerHTML = `<img src="css/female.png" width="100px" alt="">`
        }

        window.localStorage.setItem('user', JSON.stringify(user))
    }
    else {
        errorOverlayPopup.style.display = "block"
    }

    errorOverlayPopup.addEventListener("click", function () {
        errorOverlayPopup.style.display = "none"
    })
})

goAheadBtn.addEventListener("click", function () {
    overlayPopup.style.display = "none"
    toDoPage.style.display = "flex"
    tasksHeader.innerHTML = `${nameInput.value[0].toUpperCase() + nameInput.value.slice(1)}'s TODO`
})


function active() {
    sideBar.classList.toggle("active")
}
listIcon.addEventListener("click", active);

document.addEventListener('click', (e) => {
    let icon = e.target.closest('.iconn');
    // icon.classList.toggle('active');
    // console.log(icon)

    let nav = e.target.closest('.side-bar')

    if (!nav && !icon) sideBar.classList.remove("active")
    // if (e.target === sideBar && e.target !== icon) return;
    // sideBar.classList.remove("active")

})

function closingTaskBox() {
    writeNewDiv.style.width = "0%"
    writeNewDiv.style.height = "0%"
    writeNewDiv.style.opacity = "0"
    writeNewDiv.style.transform = "translateY(0px)"
    newTaskBox.style.padding = "0px"
}

newTaskBtn.addEventListener("click", function () {
    addingInput.focus()
    writeNewDiv.style.width = "100%"
    writeNewDiv.style.height = "100%"
    writeNewDiv.style.opacity = "1"
    newTaskBox.style.padding = "80px"
})


document.addEventListener("click", (e) => {
    let writeNew = e.target.closest(".wrtie-new")
    let newTask = e.target.closest(".new-task")
    let taskBox = e.target.closest(".task-box")
    if (!newTask && !taskBox) {
        closingTaskBox()
    }
})

favTask.addEventListener('click' , _ => {
    document.querySelector('.iconns .fav svg').classList.toggle('colored')
})

function todoToHtml(obj) {
    const todo = document.createElement('div');
    todo.dataset.id = obj.id;
    todo.classList = `added-content  ${obj.isFav ? 'go-favourite' : ''} ${obj.isChecked ? 'go-completed' : 'go-progress'} ${obj.isDel ? 'go-trash' : ''} `;

    let date = new Date(obj.id);
    console.log(date)
            let Hours = date.getHours()
        let min = date.getMinutes()
        var suffix = "AM"; //cunverting 24Hours to 12Hours with AM & PM suffix
        	if (Hours >= 12) {
        		suffix = "PM";
        		Hours = Hours - 12;
        	}
        	if (Hours === 0) {
        		Hours = 12;
        	}
            	if (Hours < 10) {
        		Hours = "0" + Hours;
        	}

            	if (min < 10) {
        		min = "0" + min;
        	}
    // todo.classList.toggle("go-completed")
    // todo.classList.toggle("go-progress")
    // empty.classList.toggle('disable')
    // empty.classList.toggle('enable')
    // label.classList.toggle('decoration')

    let todoHtml = `

    <div class="empty ${obj.isChecked ? 'disable' : 'enable'}"></div>
    <label class="check-and-label">
    <input type="checkbox" id="content" class="checkbox__input" ${obj.isChecked ? 'checked': ''}>
    <span class="checkbox__inner ${obj.isChecked ? 'checked': ''}" onclick="toggleEmptyDiv(this)"></span>
    <label class="${obj.isChecked ? 'decoration': ''}">${obj.content}</label>
    </label>
    <div class="right-div">
    <div class="more-div" onclick="toggleMoreList(this)">
    <i class="fa-solid fa-ellipsis-vertical more-icon"></i>
     <ul class="more-list">
        <li class="edit">Edit</li>
        <li class="favo"  onclick="toggleFavStar(this)">${obj.isFav ? 'Unfavourite': 'Favourite'}</li>
        <li class="del" onclick="toggleTrashClass(this)">${obj.isDel ? 'Restore': 'Delete'}</li>
     </ul>

     </div>
     <button style="display: none;">Save</button>
     </div>
     <div style="flex-basis: 100%; height: 0%;"></div>
     <span class="span-time"> ${Hours}:${min} ${suffix} - ${Days[date.getDay()]}  ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}
     <i class="fa-solid fa-star star-icon ${obj.isFav ? 'exist': ''}" style="color: rgb(255, 164, 43); margin-left: 10px; visibility: hidden;"></i> </span>
    `
    addingInput.value = ''
    todo.innerHTML = todoHtml;
    // let rightDiv = document.querySelector(".right-div")

    // let saveBtn = document.createElement('button')
    // rightDiv.appendChild(saveBtn)
    // saveBtn.style.display = "none"
    let saveBtn = todo.querySelector('button')
    let edit = todo.querySelector('.edit')
    edit.addEventListener('click', function () {
        // this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.contentEditable = "true"
        // this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.focus()
        let label = todo.querySelector('label label');
        label.contentEditable = true;
        label.focus();
        saveBtn.className = "save-btn"
        saveBtn.innerHTML = "Save"
        saveBtn.style.display = "block"

        saveBtn.addEventListener('click', function () {
            
            // todoObj.content = this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.innerHTML
            // this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.contentEditable = "false"
            let todoId = todo.dataset.id;
            todoData.forEach(todo => {
                if (todo.id == todoId) todo.content = label.innerHTML;
            })
            label.contentEditable = false;
            // this.style.display = "none"
            saveBtn.style.display = 'none'
        })
    })

    return todo;
}
favTask.addEventListener('click', function () {
    favTask.classList.toggle('active')
});


function toggleMoreList(div) {
    let moreList = div.querySelector('.more-list');


    moreList.classList.toggle("visiblee")


    document.addEventListener('click', function (e) {

        // let moore = e.target.closest('.more-list');
        let moree = e.target.closest('.more-div')
        // let faa = e.target.closest('.favo')
        if (!moree) {
            moreList.classList.remove("visiblee")
        }

    })

    // let enable = document.querySelector('.enable')
    // console.log(enable.dataset.ahmed)
}

function toggleFavStar(div) {
    let todo = div.closest(".added-content")
    let starIcon = todo.querySelector('.star-icon')
    starIcon.classList.toggle('exist')
    if (starIcon.classList.contains('exist')) {
        console.log('hi')
        console.log(div)
        div.innerHTML = 'Unfavourite'
    } else { div.innerHTML = 'Favourite' }
    console.log(todoData)
    todo.classList.toggle("go-favourite")
    console.log(todo.dataset.id)

    if(activeList == lists.favourite){
        todo.remove()
    }

    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isFav = !singleTodo.isFav;
        }
    })
    console.log(todoData)
}

function toggleEmptyDiv(div) {
    let todo = div.closest(".added-content")
    let empty = div.closest(".added-content").firstChild.nextSibling
    let label = div.nextSibling.nextSibling
    todo.classList.toggle("go-completed")
    todo.classList.toggle("go-progress")
    empty.classList.toggle('disable')
    empty.classList.toggle('enable')
    label.classList.toggle('decoration')

    
    if(activeList == lists.completed && todo.classList.contains('go-progress')){
        todo.remove()
    }
    if(activeList == lists.inProgress && todo.classList.contains('go-completed')){
        todo.remove()
    }

    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isChecked = !singleTodo.isChecked;
        }
    })
    console.log(todoData)
}

function toggleTrashClass(btn){
    let todo = btn.closest(".added-content")
    // todo.style.display = "none"
    todo.classList.add('go-trash')
    // todo.classList.remove('go-progress')
    // todo.classList.remove('go-completed')
    btn.parentElement.parentElement.parentElement.parentElement.classList.remove('go-favourite')
    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isDel = !singleTodo.isDel;
        }
    })

    todo.remove()
    console.log(todoData)

}
// let moreIcon = document.querySelector(".more-icon")
let isFavourite = favTask.classList.contains('active')




addTask.addEventListener("click", function () {
    
    
    if (addingInput.value.length >= 1) {
        // tell me if fav icon has active or not.
        // let todo = document.querySelector('.added-content')
        
        let todoObj = {
            content: addingInput.value,
            id: Date.now(),
            isChecked: false,
            isFav: isFavourite,
            isDel: false,
        }

    //     searhBar.addEventListener('input', function(){
    //      todoData.forEach(todo => {
    //     if (searhBar.value.length > 1){
    //         // console.log(label)
    //         added.innerHTML = ''
    //         // console.log(todoObj.content)
    //         // console.log(searhBar.value)
    //     } else{
    //         added.innerHTML = ''
    //         todoData.forEach(todo => {
    //             added.append(todoToHtml(todo))
    //         })
    //     }
    //     for (let i = 0 ; i < todoData.length; i++){
    //         // console.log(todoData[i])
    //         added.innerHTML = ''
    //         if (todoData[i].content.charAt(0) == searhBar.value.charAt(0) ){
    //                 let searchArr = []
    //                 searchArr.push(todoData)
    //                 // added.append(searchArr[i])
    //                 // for(j = 0 ; j <= searchArr.length ; j++){
    //                     console.log(searchArr)
    //                 //     console.log(searchArr[j])
    //                 //     console.log(searchArr[i])
    //                     // searchArr.forEach(todo => {
    //                     //     added.append(todoToHtml(searchArr[todo]))
    //                     // })
                            

    //                 // 
    //         //    }

    //                 // added.append(todoToHtml(todoData[i]))


    //             // console.log( typeof todoData[i].content)
    //             // console.log( typeof searhBar.value)
    //         } 
    //         // else {
    //         //     added.innerHTML = ''
    //         // }
    //     }

    // })

// })


        console.log(todoObj)
        console.log(todoToHtml(todoObj))
        // console.log(todoToHtml(todo))

        todoData.push(todoObj)
        // localStorage.setItem('todos',  JSON.stringify(todoData) )
        window.localStorage.setItem('todos', JSON.stringify(todoData))



        console.log(todoData)
        console.log(todoObj)
        closingTaskBox()
        added.append(todoToHtml(todoObj))
        let moreDiv = document.querySelector(".more-div")
        let rightDiv = document.querySelector(".right-div")
        let moreList = document.querySelector(".more-list")
        let edit = document.querySelector('.edit')
        let favo = document.querySelector('.favo')
        let del = document.querySelector('.del')
        let favSpan = document.querySelector('.star-icon')
         let adddedContent = document.querySelector(".added-content")
         let inner = document.querySelector(".checkbox__inner")
        //  let empty = document.querySelector(".enable")
        //     adddedContent.classList.add("added-content")
        //     adddedContent.classList.add('go-progress')
        //    let content = document.createElement("input")
        //    content.type = "checkbox"
        //    content.id = "content"
        //    content.className = "checkbox__input"
        //    let inner = document.createElement("span")
        //    inner.className = "checkbox__inner"
        //    let label = document.createElement("label")
        //    label.appendChild(document.createTextNode(addingInput.value))
        //    let empty = document.createElement("div")
        //    empty.classList.add('enable')
        //    adddedContent.appendChild(empty)
        //    checkAndLabel = document.createElement("label")
        //    checkAndLabel.className = "check-and-label"
        //    checkAndLabel.appendChild(content)
        //     checkAndLabel.appendChild(inner)
        //    checkAndLabel.appendChild(label)
        //     adddedContent.appendChild(checkAndLabel)
        //     added.appendChild(adddedContent)
        //     let rightDiv = document.createElement("div")
        //     rightDiv.className = 'right-div'
        //     let moreDiv = document.createElement("div")
        //     moreDiv.className = "more-div"
        //     let more = document.createElement('i')
        //     rightDiv.appendChild(moreDiv)
        //     moreDiv.appendChild(more)
        //     more.className = "fa-solid fa-ellipsis-vertical"
        //     more.classList.add("more-icon")
        //     adddedContent.appendChild(rightDiv)
        //     let breaker = document.createElement("div")
        //     breaker.style.flexBasis = "100%"
        //     breaker.style.height = "0%"
        //     adddedContent.appendChild(breaker)
        //     let spanTime = document.createElement("span")
        //     spanTime.className = "span-time"
        //     let Hours = new Date().getHours()
        // let min = new Date().getMinutes()
        // var suffix = "AM"; //cunverting 24Hours to 12Hours with AM & PM suffix
        // 	if (Hours >= 12) {
        // 		suffix = "PM";
        // 		Hours = Hours - 12;
        // 	}
        // 	if (Hours === 0) {
        // 		Hours = 12;
        // 	}
        //     	if (Hours < 10) {
        // 		Hours = "0" + Hours;
        // 	}

        //     	if (min < 10) {
        // 		min = "0" + min;
        // 	}
        //     let theDate = `${Hours}:${min} ${suffix} - ${Days[new Date().getDay()]}  ${new Date().getDate()}-${months[new Date().getMonth()]}-${new Date().getFullYear()}`
        //     spanTime.appendChild(document.createTextNode(theDate))
        //     let favSpan = document.createElement('i')
        //     spanTime.appendChild(favSpan)
        //     adddedContent.appendChild(spanTime)
        //     addingInput.value = ""    

        // document.querySelector('.checkbox__inner').addEventListener("click", function () {
        //     empty.classList.toggle('disable')
        //     empty.classList.toggle('enable')
        //     label.classList.toggle('decoration')
        //     // adddedContent.classList.toggle('go-progress')
        //     // adddedContent.classList.toggle('go-completed')
        //     if (empty.classList.contains("enable")) {
        //         adddedContent.classList.add('go-progress')
        //         adddedContent.classList.remove('go-completed')
        //     }
        //     if (empty.classList.contains("disable")) {
        //         adddedContent.classList.add('go-completed')
        //         adddedContent.classList.remove('go-progress')
        //     }
        //     counting()
        // })

        // let favSpan = document.querySelector('.star-icon')
        // let moreList = document.createElement("ul")
        // moreList.className = "more-list"
        // let edit = document.createElement("li")
        // edit.className = "edit"
        // edit.innerHTML = "Edit"
        // let favo = document.createElement("li")
        // favo.className = "favo"
        // favo.innerHTML = "Favourite"
        // favSpan.className = 'fa-solid fa-star'
        // favSpan.classList.add('not-exist')
        // favSpan.style.display = "none"
        // favSpan.style.color = "#ffa42b"
        // favSpan.style.marginLeft = "10px"


        // let del = document.createElement("li")
        // del.className = "del"
        // del.innerHTML = "Delete"
        // moreList.appendChild(edit)
        // moreList.appendChild(favo)
        // moreList.appendChild(del)
        // moreDiv.appendChild(moreList)



        let saveBtn = document.createElement('button')
        rightDiv.appendChild(saveBtn)
        saveBtn.style.display = "none"
        // edit.addEventListener('click', function () {
        //     this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.contentEditable = "true"
        //     this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.focus()
        //     saveBtn.className = "save-btn"
        //     saveBtn.innerHTML = "Save"
        //     saveBtn.style.display = "block"

        //     saveBtn.addEventListener('click', function () {
        //         console.log(this.parentElement.previousSibling.lastChild)
        //         todoObj.content = this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.innerHTML
        //         this.closest(".added-content").firstChild.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.contentEditable = "false"
        //         this.style.display = "none"
        //     })
        // })



        //parent - previous sibling ele - previous sibling ele - first child -first child - next ele sibling -first child - next ele
        //parent - parent - parent - next ele - next ele -first ele 

        // favSpan.style.visibility = "hidden"
        // favSpan.style.display = "none"
        // favo.addEventListener('click', function () {

        //     let myFav = this.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.firstChild.nextSibling
        //     this.parentElement.parentElement.parentElement.parentElement.classList.toggle('go-favourite')
        //     // favSpan2.style.display= "inline-block"

        //     myFav.classList.toggle('exist')
        //     if (myFav.classList.contains('exist')) {
        //         favo.innerHTML = "Unfavourite"
        //     } else { favo.innerHTML = "Favourite" }
        //     console.log(favSpan)
        //     console.log(this)
        //     counting()
        //     // spanTime.innerHTML += `<i class="fa-solid fa-star" style="color: #ffa42b"></i>`
        // })

        // del.addEventListener('click', function () {
        //     this.parentElement.parentElement.parentElement.parentElement.style.display = "none"
        //     this.parentElement.parentElement.parentElement.parentElement.classList.add('go-trash')
        //     this.parentElement.parentElement.parentElement.parentElement.classList.remove('go-progress')
        //     this.parentElement.parentElement.parentElement.parentElement.classList.remove('go-completed')
        //     this.parentElement.parentElement.parentElement.parentElement.classList.remove('go-favourite')
        //     counting()
        // })



        

        // function search(){
        //     let searhBar = document.querySelector('.search').value;
        //     let toDo = document.querySelectorAll('.added-content');
        //     let toDoName = document.querySelector('.added-content label label')

        //     for(i = 0 ; i < toDoName.length ; i++){
        //         if (toDoName[i].innerHTML.indexOf(searhBar) >= 0){
        //             toDo[i].style.display = "block"
        //         } else{
        //             toDo[i].style.display = "none"
        //         }
        //     } 
        // }
        // let searching = document.querySelector('.search')
        // searching.addEventListener('input', search())

        counting()

    }
})
let sure = document.querySelector('.sure')
let yesBtn = document.querySelector('.yes-btn')
let noBtn = document.querySelector('.no-btn')
reset.addEventListener('click', () => {
    reset.style.display = "none"
    trashAll.style.display = "none"
    sure.style.display = "block"
    yesBtn.addEventListener('click', () => {
        todoData = []
        added.innerHTML = '';
        counting()
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })
    noBtn.addEventListener('click', function () {
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })

})

searhBar.addEventListener('input', (e) => {
    if (searhBar.value !== '') {
        all.click()
        added.innerHTML = '';
        todoData.forEach(todo => {
            if (todo.content.startsWith(searhBar.value)) {
                added.append(todoToHtml(todo))
            }
        })
    } else {
        updateMainBlock()
    }
})


trashAll.addEventListener('click', () => {
    reset.style.display = "none"
    trashAll.style.display = "none"
    sure.style.display = "block"

    yesBtn.addEventListener('click', () => {

        todoData =  todoData.filter(todo => !todo.isDel)
        console.log(todoData)

        counting()
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })

    noBtn.addEventListener('click', function () {
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })


})

function updateMainBlock() {
    added.innerHTML = '';

    switch (activeList) {
        case lists.all:
            todoData.forEach(todo => {
                if(todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.inProgress:
            todoData.forEach(todo => {
                if(todo.isChecked == false && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.completed:
            todoData.forEach(todo => {
                if(todo.isChecked == true && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.favourite:
            todoData.forEach(todo => {
                if(todo.isFav == true && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.trash: 
            todoData.forEach(todo => {
                if (todo.isDel){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        default:
            break;
    }
}

all.addEventListener('click', function () {
    activeList = lists.all;
    updateMainBlock()
    // added.innerHTML = '';
    // todoData.forEach(todo => {
    //     if(todo.isDel == false){
    //         added.append(todoToHtml(todo))
    //     }
    // })
    // console.log(todoData)
    
    // let empty = document.querySelector('.empty')
    // let label = document.querySelector('label label')
    // added.style.display = "block"
    // adddedContent.style.display = 'flex'

    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"
    // }
    // del.innerHTML = 'Delete'
    // del.onclick = function () {
    //     adddedContent.classList.add("go-trash")
    // }
    // inner.onclick = function () {
    //      adddedContent.style.display = "flex" 
    //      adddedContent.classList.toggle("go-progress")
    //      adddedContent.classList.toggle("go-completed")
    //      empty.classList.toggle("disable")
    //      empty.classList.toggle("enable")
    //      label.classList.toggle('decoration') 
    //     //  todoData.forEach(singleTodo => {
    //     //      if (adddedContent.dataset.id == singleTodo.id) {
    //     //          singleTodo.isChecked = !singleTodo.isChecked;
    //     //         }
    //     //     })
    //         // console.log(todoData)
    //     }
    

})




inProgress.addEventListener('click', function () {
    activeList = lists.inProgress;
    updateMainBlock()
    // added.innerHTML = ''
    // todoData.forEach(todo => {
    //     if(todo.isChecked == false && todo.isDel == false){
    //         added.append(todoToHtml(todo))
    //     }
    // })


    // let empty = document.querySelector('.empty')
    // let label = document.querySelector('label label')
    // if (!adddedContent.classList.contains("go-progress")) {
    //     adddedContent.style.display = "none"
    // }
    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"
    //     adddedContent.classList.remove("go-progress")
    // }
    // if (adddedContent.classList.contains("go-progress")) {
    //     adddedContent.style.display = "flex"
    // }
    // del.innerHTML = 'Delete'
    // del.onclick = function () {
    //     adddedContent.classList.add("go-trash")
    //     counting()
    // }
    // inner.onclick = function () {
    //     todoData.forEach(singleTodo => {
    //         if (adddedContent.dataset.id == singleTodo.id) {
    //             singleTodo.isChecked = !singleTodo.isChecked;
    //            }
    //        })
    //        console.log(todoData)
    //     adddedContent.classList.toggle("go-progress")
    //     adddedContent.classList.toggle("go-completed")
    //     empty.classList.toggle("disable")
    //     empty.classList.toggle("enable")
    //     label.classList.toggle('decoration')  
    //  adddedContent.style.display = "none" }
})


completed.addEventListener('click', function () {
    activeList = lists.completed;
    updateMainBlock()
    // added.innerHTML = ''
    // todoData.forEach(todo => {
    //     if(todo.isChecked == true && todo.isDel == false){
    //         added.append(todoToHtml(todo))
    //     }
    // })


    // let empty = document.querySelector('.empty')
    // let label = document.querySelector('label label')


    // // todo.classList.toggle('active')

    // if (!adddedContent.classList.contains("go-completed")) {
    //     adddedContent.style.display = "none"
    // }
    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"
    //     adddedContent.classList.remove("go-completed")
    // }
    // if (adddedContent.classList.contains("go-completed")) {
    //     adddedContent.style.display = "flex"
    // }
    // del.innerHTML = 'Delete'
    // del.onclick = function () {
    //     adddedContent.classList.add("go-trash")
    //     counting()

    // }
    // inner.onclick = function () {
    //     this.closest(".added-content").style.display = "none"
    //     todoData.forEach(singleTodo => {
    //         if (adddedContent.dataset.id == singleTodo.id) {
    //             singleTodo.isChecked = !singleTodo.isChecked;
    //            }
    //        })
    //        console.log(todoData)
    //     adddedContent.classList.toggle("go-progress")
    //     adddedContent.classList.toggle("go-completed")
    //     empty.classList.toggle("disable")
    //     empty.classList.toggle("enable")
    //     label.classList.toggle('decoration')
    //  }



})


// let inProgressNum = document.querySelectorAll('.in-progress').length
// console.log(inProgressNum)



favourite.addEventListener('click', function () {
    activeList = lists.favourite;
    updateMainBlock()
    // added.innerHTML = ''
    // todoData.forEach(todo => {
    //     if(todo.isFav == true && todo.isDel == false){
    //         added.append(todoToHtml(todo))
    //     }
    // })

    // if (!adddedContent.classList.contains("go-favourite")) {
    //     adddedContent.style.display = "none"
    // }
    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"

    // }
    // if (adddedContent.classList.contains("go-favourite") && (!adddedContent.classList.contains("go-trash"))) {
    //     adddedContent.style.display = "flex"
    // }
    // del.innerHTML = 'Delete'
    // del.onclick = function () {
    //     adddedContent.classList.add("go-trash")
    //     counting()

    // }
    // inner.onclick = function () { adddedContent.style.display = "flex" }
})


trash.addEventListener('click', function () {
    activeList = lists.trash;
    updateMainBlock()
    // added.innerHTML = ''
    // todoData.forEach(todo => {
    //     if (todo.isDel){
    //         added.append(todoToHtml(todo))
    //     }
    // })
    // addTask.addEventListener('click' , function(){
    //     adddedContent.style.display = "none"
    // })
    // let empty= document.querySelector('.empty')

    // if (!adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"

    // }

    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "flex"
    //     if (del.innerHTML = 'Restore') {
    //         del.onclick = function () {
    //             adddedContent.classList.remove("go-trash")
    //             if (empty.classList.contains("enable")) {
    //                 adddedContent.classList.add('go-progress')
    //                 adddedContent.classList.remove('go-completed')
    //             }
    //             if (empty.classList.contains("disable")) {
    //                 adddedContent.classList.add('go-completed')
    //                 adddedContent.classList.remove('go-progress')
    //             }

    //             if (favo.innerHTML = "Favourite") {
    //                 adddedContent.classList.remove('go-favourite')
    //             }
    //             if (favo.innerHTML = "Unfavourite") {
    //                 adddedContent.classList.add('go-favourite')
    //             }
    //             // if(myFav.classList.contains('exist')){
    //             //     adddedContent.classList.add('go-favourite')
    //             // }
    //             counting()

    //         }
    //         favo.addEventListener('click', function () {
    //             !adddedContent.classList.add('go-favourite')
    //             !adddedContent.classList.remove('go-favourite')
    //         })
    //     }


    // }
    // inner.onclick = function () {
    //     adddedContent.style.display = "flex"
    //     adddedContent.className = "added-content go-trash"

    // }
})

function counting() {
    let allSpan =   document.querySelector('.all-span')
    let progSpan = document.querySelector('.progress-span')
    let compSpan = document.querySelector('.completed-span')
    let favouriteSpan = document.querySelector('.favourite-span')
    let trashSpan = document.querySelector('.trash-span')
    
    console.log(document.querySelectorAll('.go-progress').length)

    let all = todoData.filter(todo => !todo.isDel)
    let comp = todoData.filter(todo => !todo.isDel && todo.isChecked)
    let prog = todoData.filter(todo => !todo.isDel && !todo.isChecked)
    let favv = todoData.filter(todo => !todo.isDel && todo.isFav)
    let removed = todoData.filter(todo => todo.isDel)

    allSpan.innerHTML = all.length
    progSpan.innerHTML = prog.length
    compSpan.innerHTML = comp.length
    favouriteSpan.innerHTML = favv.length
    trashSpan.innerHTML = removed.length
    // allSpan.innerHTML = Math.max(0, document.getElementsByClassName('added-content').length - document.getElementsByClassName('go-trash').length) 
    // progSpan.innerHTML = Math.max(0, document.getElementsByClassName('go-progress').length - document.getElementsByClassName('go-trash').length) 
    // compSpan.innerHTML = Math.max(0, document.getElementsByClassName('go-completed').length - document.getElementsByClassName('go-trash').length)
    // favouriteSpan.innerHTML = Math.max(0, document.getElementsByClassName('go-favourite').length - document.getElementsByClassName('go-trash').length) 
    // trashSpan.innerHTML = document.getElementsByClassName('go-trash').length



    // if(allSpan.innerHTML < 0|| progSpan.innerHTML < 0|| compSpan.innerHTML < 0|| favouriteSpan.innerHTML < 0 || trashSpan.innerHTML < 0){
    //     allSpan.innerHTML = 0 
    //     progSpan.innerHTML = 0
    //     compSpan.innerHTML = 0
    //     favouriteSpan.innerHTML = 0
    // }
}

function changeLiBackground() {
    all.style.background = "none"
    inProgress.style.background = "none"
    completed.style.background = "none"
    favourite.style.background = "none"
    trash.style.background = "none"
    this.style.background = "black"
    all.style.color = "black"
    inProgress.style.color = "black"
    completed.style.color = "black"
    favourite.style.color = "black"
    trash.style.color = "black"
    if (this == all) {
        this.style.color = "var(--mainColor)"
    }
    else if (this == inProgress) {
        this.style.color = "white"
    }
    else if (this == completed) {
        this.style.color = "rgb(74 219 216)"
    } else if (this == favourite) {
        this.style.color = "rgb(255 217 1)"
    } else { this.style.color = "rgb(255 66 66)" }
}
all.click()

all.addEventListener('click', changeLiBackground)
inProgress.addEventListener('click', changeLiBackground)
completed.addEventListener('click', changeLiBackground)
favourite.addEventListener('click', changeLiBackground)
trash.addEventListener('click', changeLiBackground)





document.addEventListener('click', counting)



