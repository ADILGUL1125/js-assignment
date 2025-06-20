import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCI9pjnHIiqm4ZO6ro6uC-AkU92nUXP9Q",
    authDomain: "my-first-pro-c9c35.firebaseapp.com",
    projectId: "my-first-pro-c9c35",
    storageBucket: "my-first-pro-c9c35.firebasestorage.app",
    messagingSenderId: "1060398658396",
    appId: "1:1060398658396:web:e6afdf23059110fef58799",
    measurementId: "G-HZCDJ5RNJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
console.log('app =>', db)
let todocollection = collection(db, 'todo')
let todo_inp = document.querySelector('#input');
let addtodo = document.querySelector('#add-btn')
let updtodo = document.querySelector('#upd-btn')

async function addtodoindb() {
    if (todo_inp.value === '') {
        alert("plese enter todos")
        return
    }
    try {
        let docref = await addDoc(todocollection, { todo: todo_inp.value })
        console.log('add todo => ', docref.id)
        todo_inp.value = ''

        render()


    } catch (e) {
        console.log(e)
    }
}


addtodo.addEventListener('click', addtodoindb)
//read data and render
async function render() {
    let todoele = document.querySelector('#content')
    todoele.innerHTML = ''
    try {
        let todos = []
        let read = await getDocs(todocollection)
        read.forEach((doc) => {
            todos.push({ id: doc.id, data: doc.data() })
            const div = document.createElement('div')
            const div2 = document.createElement('div')
            const edit = document.createElement('button')
            const delet = document.createElement('button')
            div.innerHTML = doc.data().todo
            div.classList.add('divsty')
            edit.innerText = 'edit'
            delet.innerText = 'delete'
            div.appendChild(div2)
            div2.classList.add('div2')
            delet.classList.add('delet')
            edit.classList.add('edit')

            div2.appendChild(edit)
            div2.appendChild(delet)
            todoele.appendChild(div)
            delet.addEventListener('click', () => deleteTodo(doc.id));
            edit.addEventListener('click', () => editTodo(doc.id, doc.data().todo));


        })
        console.log(todos)

    } catch (e) {
        console.log(e)
    }
}
render()
//deletetodo
let todoid = null
async function deleteTodo(id) {
    todoid = id
    try {
        await deleteDoc(doc(db, 'todo', todoid))
        console.log('delete', todoid)
        render()

    } catch (error) {
        console.log(e)
    }

}
//edit
function editTodo(id, text) {
    todo_inp.value = text
    todoid = id
    addtodo.style.display = 'none'
    updtodo.style.display = 'block'
    console.log('click', todoid)
}
//update

updtodo.addEventListener('click', updvalue)
function updvalue() {
    let upd = todo_inp.value
    // console.log(upd)
    async function update() {
        try {
            let updatedocref = doc(db, 'todo', todoid)
             let  updatedata =await updateDoc(updatedocref, {
                todo: upd
            })
            console.log(upd)
            todoid = null;
            todo_inp.value = '';
            addtodo.style.display = 'block';
            updtodo.style.display = 'none';
            console.log(updatedata)
            
            
        } catch (e) {
            console.log(e)
        }
    }
    update().then(render())
}
