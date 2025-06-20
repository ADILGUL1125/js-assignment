let maindiv=document.querySelector('#main')
let myarray=[]
let close=document.querySelector('#modal')
let iner=document.querySelector('#cont')
function show(index){
    close.style.display='flex'
    let other=myarray[index]
    console.log(other)
    iner.innerHTML=''
    for (let key in other) {
        if (typeof other[key] !== 'object') {  
            iner.innerHTML += `<p><b>${key}:</b> ${other[key]}</p>`;
        }
    }
    maindiv.style.display='none'
}
function closem(){
    close.style.display='none'
    maindiv.style.display='flex'

}

function rendercard(){
    if (myarray.length < 1)
    {
        // maindiv.innerHTML=`<h1>there is no data</h1>`
        console.log('no data')
        return;
    }
    for(var i=0;i < myarray.length;i++){
        maindiv.innerHTML +=` <div class="card" style="width: 18rem; margin:20px; height:450px ;display:flex;flex-direction:column;align-items:center;justify-content: space-between" >
            <img src="${myarray[i].thumbnail    }" class="card-img-top" alt="..." style="width:100px ;margin:auto;" ;>
            <div class="card-body" style="text-align:center">
                <h5 class="card-title">${myarray[i].title}</h5>
                <p class="card-text">${myarray[i].description}.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${myarray[i].price  +" pkr  "}</li>
                <!-- <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li> -->
            </ul>
            <div class="card-body">
                <a href="#" class="card-link" onclick="show(${i})"}>more detail</a>
               
            </div>
        </div>`
    }
}





async function renderdata(){
     let data= await fetch("https://dummyjson.com/products")
      data = await data.json()
    myarray=data.products
    console.log(data)
    console.log(myarray)

}
renderdata().then(function(){
    rendercard()
})