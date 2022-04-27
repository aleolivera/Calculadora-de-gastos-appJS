const buscarAmigos = ()=>{
    const listaAmigos=JSON.parse(sessionStorage.getItem("listaAmigos"));
    if(listaAmigos)
        return listaAmigos;
    else
        return null;

}
const updateAmigos = ()=>{
    sessionStorage.setItem("listaAmigos",JSON.stringify(listaAmigos));
}
const buscarMensaje = ()=>{
    return sessionStorage.getItem("mensaje");
}
const guardarMensaje=()=>{
    sessionStorage.setItem("mensaje",mensaje);
}

let listaAmigos=buscarAmigos();
let mensaje=buscarMensaje();

const cargarPagina = ()=>{
    imprimirMensajes();
    imprimirBtnCalcular();
    imprimirAmigos();
}


const reiniciar = ()=>{
    sessionStorage.clear();
    location.reload();
}

const imprimirAmigos= ()=>{
    if(listaAmigos){
        for(i=0;i<listaAmigos.length;i++){
            document.getElementById("amigosIngresados").innerHTML+=
            "<table class='table table-striped table-hover'>"+
                "<tbody>"+
                    "<tr>"+
                        "<td><p class='fs-5'>"+
                            (i+1)+
                        "</p></td>"+
                        "<td>"+
                            "<p class='fs-5'>"+listaAmigos[i].toUpperCase()+"</p>"+
                        "</td>"+
                        "<td style='text-align:end;'>"+
                            "<button type='button' class='btn btn-danger' onclick='eliminarAmigo("+i+")'>Eliminar</button>"+
                        "<td>"+
                    "</tr>"+
                "</tbody>"+
            "</table>";
        }
    }
    else{
        document.getElementById("amigosIngresados").innerHTML+=
        "<div class='col'><p>Ningun Amigo Ingresado</p></div>";
    }
}
const imprimirMensajes =()=>{
    if(mensaje&&mensaje!=""){
        document.getElementById("colValidacionIngresoAmigo").innerHTML+=
        "<div class='alert alert-warning' role='alert'>"+
        mensaje+
      "</div>";
    }
    console.log(mensaje);
}
const agregarAmigo= () =>{
    const amigo = new String((document.getElementById("amigo").value).toLowerCase());
    mensaje=validarSoloLetras(amigo);
    mensaje=validarAmigoRepetido(amigo);
    guardarMensaje();
    if(mensaje==""){
        if(!listaAmigos)
            listaAmigos=new Array(amigo);
        else
            listaAmigos.push(amigo); 
       updateAmigos();
    }
    location.reload();
}
const eliminarAmigo = (index)=>{
    listaAmigos.splice(index,1);
    updateAmigos();
    location.assign("index.html");
}
const imprimirBtnCalcular=()=>{
    if(listaAmigos&&listaAmigos.length>0){
        document.getElementById("colCalcular").innerHTML+=
        "<button type='button' id='btnCalcular' class='btn btn-primary' onclick=\"location.assign('gastos.html');\">Siguiente</button>";
    }
}
const validarSoloLetras=(cadena)=>{
    if(isCadenaVacia(cadena)){
        return "Campo requerido";
    }
    if(cadena.match(/[^a-zA-Z]/)){
        return "Solo se admiten caracteres alfabeticos";
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
const validarAmigoRepetido=(nuevoAmigo)=>{
    if(listaAmigos&&listaAmigos.length>0){
        for(i=0;i<listaAmigos.length;i++){
            if(listaAmigos[i].localeCompare(nuevoAmigo)==0){
                return "Amigo repetido";
            }
        }
    }
    return "";
}
