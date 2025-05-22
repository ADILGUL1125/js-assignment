let todos = []
let inp1 = document.querySelector('#inp1')
let todobox = document.querySelector('.todobox')



function renderTodos() {
    todobox.innerHTML = ''


    if (todos.length < 1) {
        let todoDiv = document.createElement("div");
        todoDiv.innerText = 'no todo';
        todobox.appendChild(todoDiv);
        return
    }
    for (var i = 0; i < todos.length; i++) {
        let rend = document.createElement('div')
        let delbutt = document.createElement('button')
        delbutt.id = i

        delbutt.innerText = 'delete'
        delbutt.className = 'delbutt'
        rend.innerText = todos[i]
        rend.className = 'todorend'
        delbutt.addEventListener('click', function (e) {
            console.log(e.target.id)
            todos.splice(e.target.id, 1)
            console.log(todos)
            renderTodos()
        })


        inp1.appendChild(rend)
        rend.appendChild(delbutt)
    }
}
renderTodos()

function addtodo() {
    let inptodo = document.querySelector('#inp2').value

    todos.push(inptodo)
    console.log(todos)
    renderTodos()
} 