var inp=document.getElementById('input');
var out=document.getElementById('output')

function valuetoset(btnvalue){
    if(btnvalue === 'ac'){
        inp.innerText= ""
        out.innerText= "0"
        return
    }
    if(btnvalue ==='del'){
        inp.innerText=inp.innerText.slice(0,-1)
        return
    }
    if(btnvalue === 'equ' ){
        var result =eval(inp.innerText)
        out.innerText=result 
        return
    }
    if(btnvalue ==='**'){
        var num =inp.innerText;
        if(!isNaN(num)){
            inp.innerText=Math.pow(num,2)
            out.innerText=inp.innerText
        }
        return
    }
       

    
inp.innerText+=btnvalue
    
}