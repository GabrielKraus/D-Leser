const btn = document.getElementById('logoutbtn')

btn.addEventListener('click',evt=>{
    fetch('/api/sessions/logout').then(result=>result.json()).then(json=>console.log(json));
    location.href = "http://localhost:8080/";
})

const form = document.getElementById('agregarProductoForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch('/api/productos',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
    location.href = "http://localhost:8080/api/productos";
})
