let list = []

let save = document.getElementById("save")
let tab = document.getElementById("tab")
let deleteEl = document.getElementById("delete")
let text = document.getElementById("text")
let unlist = document.getElementById("unlist")
let note = document.getElementById("note")


let result = JSON.parse( localStorage.getItem("data") )

if(result){
    list = result
    render()
}

save.addEventListener("click", function(){
    list.push(text.value)
    text.value = ""
    
    localStorage.setItem("data", JSON.stringify(list))
    
    
    render()
})

tab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        list.push(tabs[0].url)
        localStorage.setItem("data", JSON.stringify(list))
        
        render()
    })
})

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear()
    unlist.innerHTML = ""
    list = []
    
    note.style.display = "none"
})


function render(){
    let listItems = ""
    for(i = 0; i < list.length; i++){
        // listItems += "<li><a target='_blank' href='" + list[i] +"'>"+ list[i] +"</a></li>"
        listItems += 
                    `<li>
                        <a target='_blank' href='${list[i]}'>
                            ${list[i]}
                        </a>
                    </li>`
    }
    unlist.innerHTML = listItems
}
