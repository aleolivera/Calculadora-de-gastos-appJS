const agregarGasto = (gastos) => {
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
    if(gastos!=null){
        gastos.add(gasto);
    }
    else{
        gastos = new Array(gasto);
    }
    alert("amigo: " + gasto.amigo + ", item: " + gasto.item +
     ", cantidad: " + gasto.cantidad + ", importe: $" + gasto.importe);
}

