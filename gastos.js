const buscarAmigos = ()=>{
    const listaAmigos=JSON.parse(sessionStorage.getItem("listaAmigos"));
    if(listaAmigos)
        return listaAmigos;
    else
        return null;

}
const buscarGastos = ()=>{
    const listaGastos=JSON.parse(sessionStorage.getItem("listaGastos"));
    if(listaGastos)
        return listaGastos;
    else
        return null;
}
const updateGastos = ()=>{
    sessionStorage.setItem("listaGastos",JSON.stringify(listaGastos));
}

const buscarMensajes = ()=>{
    const mensajes=JSON.parse(sessionStorage.getItem("mensajes"));
    if(mensajes)
        return mensajes;
    else
        return null;
}
const updateMensajes=()=>{
    sessionStorage.setItem("mensajes",JSON.stringify(mensajes));
}

var amigoActual="";
var amigoSiguiente="";
var amigoAnterior="";
var listaGastos=buscarGastos();
var mensajes=buscarMensajes();
var listaAmigos=buscarAmigos();

const cargarPagina = ()=>{
    if(!listaAmigos){
        alert("No ha ingresado ningun amigo");
        location.assign("index.html");
    }
    iniciarAmigoActual();
    iniciarAmigoSiguiente();
    iniciarAmigoAnterior();
    imprimirNombreAmigo();
    imprimirTablaGastos();
    imprimirTablaPonen();
    imprimirTotalGastos();
    imprimirCadaUnoPone();
    imprimirBotonSiguiente();
    imprimirBotonAnterior();
    imprimirMensajes();
    
    console.log("Amigo:" +amigoActual);
    console.log("Amigo siguiente:" +amigoSiguiente);
    console.log("Amigo anterior:" +amigoAnterior);
}
const iniciarAmigoActual=()=>{
    amigo=getQueryString("amigo");
    if(amigo==""){
        amigoActual=listaAmigos[0];
    }
    else if(existeAmigo(amigo)){
        amigoActual=amigo;
    }
    else{
        alert("El amigo: "+amigo+" no fue ingresado");
        location.assign("gastos.html");
    }
}

const iniciarAmigoSiguiente=()=>{
    i=listaAmigos.indexOf(amigoActual);
    if(listaAmigos[i+1]){
        amigoSiguiente=listaAmigos[i+1];
    }
    else{
        amigoSiguiente="";
    }
}
const iniciarAmigoAnterior=()=>{
    let i=listaAmigos.indexOf(amigoActual);
    if(i==0){
        amigoAnterior="";
    }
    else{
        amigoAnterior=listaAmigos[i-1];
    }
}
const agregarGasto = () => {
    console.log("agregar Gasto");
    const amigo= new String(amigoActual);
    const item = new String(document.getElementById("txtItem").value);
    const cantidad = new String(document.getElementById("txtCantidad").value);
    const importe = new String(document.getElementById("txtImporte").value);
    const gasto = {
        amigo:amigo,
        item:item,
        cantidad:cantidad,
        importe:importe,
    }
    mensajes={
        detalle:validarSoloLetras(item),
        cantidad:validarSoloNumeros(cantidad),
        importe:validarSoloNumeros(importe)
    }
    console.log("detalle: "+mensajes.detalle);
    console.log("cantidad: "+mensajes.importe);
    console.log("importe: "+mensajes.importe);

    if(mensajes.detalle==""&&mensajes.cantidad==""&&mensajes.importe==""){
        if(!listaGastos){
            listaGastos= new Array();
        }
        listaGastos.push(gasto);
        updateGastos();
    }
    updateMensajes();
    location.assign("gastos.html?amigo="+amigoActual);
}
const eliminarGasto = (index)=>{
    listaGastos.splice(index,1);
    updateGastos();
    location.assign("gastos.html?amigo="+amigoActual);
}
const setAmigoSiguiente =()=>{
    let i=listaAmigos[listaAmigos.indexOf(amigoActual)];
    amigoActual=amigoSiguiente;
    location.assign("gastos.html?amigo="+amigoActual);
}
const setAmigoAnterior =()=>{
    amigoActual=amigoAnterior;
    location.assign("gastos.html?amigo="+amigoActual);
}
const salir = ()=>{
    sessionStorage.clear();
    location.assign("index.html");
}
const imprimirNombreAmigo = ()=>{
    document.getElementById("colNombreAmigo").innerHTML+=
    "<h1 class='display-6' id='tituloAmigo'>"+amigoActual.toUpperCase()+"</h1>";
}
const imprimirTotalGastos = ()=>{
    document.getElementById("filaTotalGastos").innerHTML+=
        "<div class='col' style='text-align:end;'>"+
            "<h3>Total</h3>"+
        "</div>"+
        "<div class='col'><p class='fs-4'><strong>$"+
            calcularTotal().toFixed(2);
        "</strong></p></div>;"
}
const imprimirCadaUnoPone = ()=>{
    document.getElementById("filaCadaUnoPone").innerHTML+=
        "<div class='col' style='text-align:end;'>"+
            "<h3>C/U pone</h3>"+
        "</div>"+
        "<div class='col'><p class='fs-4'><strong>$"+
           (calcularTotal()/contarAmigos()).toFixed(2);
        "</strong></p></div>;"
}
const imprimirTablaGastos = ()=>{
    if(listaGastos && contarGastosAmigo(amigoActual)>0){
            document.getElementById("colTablaGastos").innerHTML+=
            "<table class='table' id='tablaGastos'></table>";
            imprimirHeadTablaGastos();
            imprimirBodyTablaGastos();
            imprimirFootTablaGastos();
    }
    else{
        document.getElementById("colTablaGastos").innerHTML+=
        "<h3>"+amigoActual.toUpperCase()+" no posee gastos ingresados</h3>";
    }
}
const imprimirHeadTablaGastos=()=>{
    document.getElementById("tablaGastos").innerHTML+=
    "<thead>"+
        "<tr>"+
            "<th scope='col'>#</th>"+
            "<th scope='col'>Item</th>"+
            "<th scope='col'>Cant</th>"+
            "<th scope='col'>Importe</th>"+
            "<th scope='col'>Total</th>"+
            "<th scope='col'>Accion</th>"+
        "</tr>"+
    "</thead>";
}
const imprimirBodyTablaGastos=()=>{
    document.getElementById("tablaGastos").innerHTML+=
    "<tbody id='bodyTablaGasto'></tbody>";

    let i=0;    
    listaGastos.forEach(gasto => {
        if(amigo.localeCompare(gasto.amigo)==0){
            document.getElementById("bodyTablaGasto").innerHTML+=
            "<tr>"+
            "<th scope='row'>"+(i+1)+"</th>"+
            "<td >"+gasto.item+"</td>"+
            "<td >"+gasto.cantidad+"</td>"+
            "<td >$"+gasto.importe+"</td>"+
            "<td >$"+(gasto.importe*gasto.cantidad)+"</td>"+
            "<td><button type='button' class='btn btn-danger' onclick='eliminarGasto("+ i +")'>Eliminar</button></td>"+
            "</tr>";
        }
        i++;
    });
}


const imprimirFootTablaGastos=()=>{
    document.getElementById("tablaGastos").innerHTML+=
    "<tfoot id='tablaGastosFoot'>"+
        "<tr id='filaFooterTablaGastos'>"+
            "<th scope='row'><h5>Total</h5></th>"+
            "<th scope='row'><p class='lead'>$"+ calcularAmigoTotal(amigoActual).toFixed(2)+"</p></th>"+
        "</tr>"+
    "</tfoot>";
}
const imprimirTablaPonen = ()=>{
    if(listaGastos){
        total=calcularTotal();
        cadaUno=total/contarAmigos();
        acuPersonal=Number.parseFloat(0);
        let detalle;
        let saldo=Number.parseFloat(0);
        
        listaAmigos.forEach(amigo=>{
            acuPersonal=calcularAmigoTotal(amigo);
            detalle=calcularPone(cadaUno,acuPersonal);
            saldo=cadaUno-acuPersonal;
            saldo=(saldo>0)?saldo:saldo*-1;
            document.getElementById("bodyTablaPonen").innerHTML+=
                   "<tr class='"+estiloFilaTablaPonen(cadaUno,acuPersonal)+"'>"+
                   "<th scope='row'>"+amigo.toUpperCase()+"</th>"+
                   "<td >$"+acuPersonal+"</td>"+
                   "<td >$"+saldo.toFixed(2)+"</td>"+
                   "<td >"+detalle+"</td>"+
                   "</tr>";
                   acuPersonal=0;
        }); 
    }
    else{
        listaAmigos.forEach(amigo=>{
            document.getElementById("bodyTablaPonen").innerHTML+=
                   "<tr >"+
                   "<th scope='row'>"+amigo.toUpperCase()+"</th>"+
                   "<td ></td>"+
                   "<td ></td>"+
                   "<td ></td>"+
                   "</tr>";
        }); 
    }
}
const imprimirBotonSiguiente= ()=>{
    let estado="";
    if(amigoSiguiente==""){
        estado="disabled";
    }
   document.getElementById("colBotonSiguiente").innerHTML+=
   "<button  type='button' class='btn btn-primary' id='btnSiguiente' onclick='setAmigoSiguiente()' "+
   estado+
   " >Siguiente</button>";
}

const imprimirBotonAnterior= ()=>{
    let estado="";
    if(amigoAnterior==""){
        estado="disabled";
    }
   document.getElementById("colBotonAtras").innerHTML+=
   "<button type='button' class='btn btn-primary' id='btnAnterior' onclick='setAmigoAnterior()' "+
   estado+
   " >Anterior</button>";
}
const imprimirMensajes= ()=>{
    if(mensajes){
        if(mensajes.detalle!==""){
            document.getElementById("colValidacionDetalle").innerHTML+=
            "<div class='alert alert-warning' role='alert'>"+
                mensajes.detalle+
            "</div>";
        }
        if(mensajes.cantidad!==""){
            document.getElementById("colValidacionCantidad").innerHTML+=
            "<div class='alert alert-warning' role='alert'>"+
                mensajes.cantidad+
            "</div>";
        }
        if(mensajes.importe!==""){
            document.getElementById("colValidacionImporte").innerHTML+=
            "<div class='alert alert-warning' role='alert'>"+
                mensajes.importe+
            "</div>";
        }

    }
    
    console.log(mensajes);
    
}

const existeAmigo=(amigo)=>{
    const listaAmigos=JSON.parse(sessionStorage.getItem("listaAmigos"));
    for(i=0;i<listaAmigos.length;i++){
        if(amigo.localeCompare(listaAmigos[i])==0){
            return true;
        }
    }
    return false;
}
const contarAmigos = ()=>{
    const listaAmigos=JSON.parse(sessionStorage.getItem("listaAmigos"));
    return listaAmigos.length;
}
const contarGastosAmigo = (amigo)=>{
    let cont=0;
    listaGastos.forEach(gasto=>{
        if(amigo.localeCompare(gasto.amigo)==0){
            cont++;
        }
    })
    return cont;
}
const estiloFilaTablaPonen = (cadaUno,acu)=>{
    if(cadaUno-acu==0){
        return "table-secondary";
    }
    else if(cadaUno-acu<0){
        return "table-success";
    }
    else{
        return "table-danger";
    }
}


const calcularPone = (cadaUno,acu)=>{
    if(cadaUno-acu==0){
        return "No pone";
    }
    else if(cadaUno-acu<0){
        return "Hay que darle";
    }
    else{
        return "Le falta poner";
    }
}

const calcularTotal = ()=>{
    if(!listaGastos){
        return 0;
    }
    else{
        acu=new Number(0);
        listaGastos.forEach(gasto=>{
            acu+=gasto.importe*gasto.cantidad;
        })
        return acu;
    }
}

const calcularAmigoTotal = (amigo)=>{
    if(!listaGastos){
        return 0;
    }
    else{
        acu=0;
        listaGastos.forEach(gasto=>{
            if(amigo.localeCompare(gasto.amigo)==0){
                acu+=(gasto.importe*gasto.cantidad);
            }
        })
        return acu;
    }
}

function getQueryString(key){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == key){return pair[1];}
       }
       return("");
}

const validarSoloLetras=(cadena)=>{
    if(isCadenaVacia(cadena)){
        return "Campo requerido";
    }
    if(cadena.match(/[^a-zA-Z]/)){
        return "Solo caracteres alfabeticos";
    }
    return "";
}
const validarSoloNumeros=(cadena)=>{
    if(isCadenaVacia(cadena)){
        return "Campo requerido";
    }
    if(cadena.match(/[^0-9]/)){
        return "Solo caracteres numericos";
    }
    return "";
}
const isCadenaVacia = (cadena)=>{
    if(cadena==""){
        return true;
    }
    else{
        return false;
    }
}