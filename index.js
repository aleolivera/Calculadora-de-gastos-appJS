
const agregarGasto = () => {
    let listaGastos;
    const amigo= new String(document.getElementById("amigo").value);
    const item = new String(document.getElementById("item").value);
    const cantidad = new String(document.getElementById("cantidad").value);
    const importe = new String(document.getElementById("importe").value);
    const gasto = {
        amigo:amigo,
        item:item,
        cantidad:cantidad,
        importe:importe,
    }
    if(sessionStorage.getItem("listaGastos")){
        listaGastos=JSON.parse(sessionStorage.getItem("listaGastos"));
    }
    else{
        listaGastos= new Array();
    }
    listaGastos.push(gasto);
    /*
    listaGastos.forEach(g => {
        document.getElementById("prueba").innerHTML+= "<h3>"+g.item+"</h3>";
        console.log("amigo: " + g.amigo + ", item: " + g.item + ", cantidad: " 
                        + g.cantidad + ", importe: $" + g.importe);
    });
    */
    sessionStorage.setItem("listaGastos",JSON.stringify(listaGastos));

    /*
    console.log("amigo: " + gasto.amigo + ", item: " + gasto.item +
    ", cantidad: " + gasto.cantidad + ", importe: $" + gasto.importe + ", session: "+sessionStorage.getItem("gasto"));
    //alert("amigo: " + gasto.amigo + ", item: " + gasto.item +
    //", cantidad: " + gasto.cantidad + ", importe: $" + gasto.importe + ", session: "+sessionStorage.getItem("gasto"));
    /*
    sessionStorage.setItem('user', JSON.stringify(user));
    var obj = JSON.parse(sessionStorage.user);
    */
}

const cargarGastos =()=>{
    console.log("cargarGastos");
    let listaGastos;
    if(sessionStorage.getItem("listaGastos")){
        listaGastos=JSON.parse(sessionStorage.getItem("listaGastos"));
        listaGastos.forEach(g => {
            document.getElementById("prueba").innerHTML+= "<h3>"+g.item+"</h3>";
            console.log("amigo: " + g.amigo + ", item: " + g.item + ", cantidad: " 
                            + g.cantidad + ", importe: $" + g.importe);
        });
    }
}
const eliminarGasto = ()=>{
    alert("eliminarGasto!");
}

