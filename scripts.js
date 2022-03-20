const sitename = document.getElementById('sitename');
const siteurl = document.getElementById('url');
const ele2 = document.getElementById('bookmarks-container')
const sub = document.getElementById('button')
//const clearButton = document.getElementsById('clear')
//const visit = document.getElementById('visit')

let names = localStorage.getItem('bookmarksList') ? 
         JSON.parse(localStorage.getItem('bookmarksList')):[]

localStorage.setItem('bookmarksList',JSON.stringify(names))
const data = JSON.parse(localStorage.getItem('bookmarksList'))



sub.addEventListener('click',()=>{
    
    if(!validateForm()) return
    const obj = {
        "sitename":sitename.value,
        "siteurl":siteurl.value
    }
    names.push(obj)
    storeData()
    ele2.appendChild(createDiv(sitename.value));
    reload()
})

function visit(e){
    console.log(e.target)
}

const validateForm = () => {

    if(sitename.value === ""){
        alert("Bookmark Name is mandatory")
        return false;
    }
    else if(siteurl.value === ""){
        alert("URL is mandatory")
        return false;
    }else{
        if(names.includes(sitename.value)){
            alert("Bookmark name already exists!")
            return false
        }
    }
    return true
}

//function to store data into local storage
const storeData = () =>{
    localStorage.setItem('bookmarksList',JSON.stringify(names))

}

//visit handler function
function visitHandler (e){
    
    let len = names.length
    for(let i=0;i<len;i++){
        if(e.target.id === names[i].sitename){
            window.open(names[i].siteurl)
        }
    }
}

//delete handler function
function deleteHandler(e){
    
    let len = names.length
    for(let i=0;i<len;i++){
        if(e.target.id === names[i].sitename){
            names.splice(i,1)
            localStorage.setItem('bookmarksList',JSON.stringify(names))
        }
    }
    document.getElementById(e.target.id).remove()
}

const createDiv = (name) =>{
    //creating elements
    let div = document.createElement('div')
    let textContainer = document.createElement('h3')
    let innerDiv = document.createElement('div')
    let visitButton = document.createElement('button')
    let deleteButton = document.createElement('button')

    //assigning classnames,ids and content
    div.className='bookmark'
    div.id = name
    textContainer.textContent=name
    innerDiv.className='buttons'
    visitButton.className='visit'
    visitButton.id=name
    visitButton.textContent='Visit'
    deleteButton.className='delete'
    deleteButton.id=name
    deleteButton.textContent='Delete'

    //adding eventListners to both buttons
    visitButton.addEventListener('click',visitHandler)
    deleteButton.addEventListener('click',deleteHandler)

    //appending elements
    innerDiv.append(visitButton,deleteButton)
    div.append(textContainer,innerDiv)

    return div
}

const reload = ()=>{
    siteurl.value=""
    sitename.value=""
}

data.forEach(element => {
    
    ele2.appendChild(createDiv(element.sitename));

});


/*clearButton.addEventListener('click',()=>{
    localStorage.clear()
    while(ele2.firstChild){
        ele2.removeChild(ele2.firstChild)
    }
})*/



// let div = document.createElement('div')
// div.className='bookmark'
// div.innerHTML='<h3>Google</h3><div class="buttons"><button class="visit" id="visit">Visit</button><button class="delete">Delete</button></div>'

// const ele2 = document.getElementById('bookmarks-container')

// ele.addEventListener('click',() => {

//     ele2.appendChild(div);

// })