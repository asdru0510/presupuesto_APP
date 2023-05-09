let btnCalcular = document.getElementById("btnCalcular");
let inputPresupuesto = document.getElementById("txtPresupuesto");
let celdaPresupuesto = document.getElementById("celdaPresupuesto");
let btnGasto = document.getElementById("btnGasto");
let inputValGasto = document.getElementById("txtValGasto");
let bodyTabla = document.getElementById("bodyTabla");
let saldo = 0;
let totalGastos = 0;
let gastosArr = [];

//Funcion constructora Gasto
function Gasto(nombre, valor) {
  this.nombre = nombre;
  this.valor = valor;
}

//creamos funcion tabla
function tabla() {
  bodyTabla.innerHTML = "";
  gastosArr.forEach(function (item, index) {
    bodyTabla.innerHTML += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item.nombre}</td>
                    <td>${item.valor}</td>
                    <td><button id="trash${
                      index + 1
                    }" type="button" class="btn btn-danger"><i class="fa-solid fa-trash" onclick="eliminar(${index})"></i></button></td>
                  </tr>`;
  });
}

//desactivamos boton --añadir gasto-- si el presupuesto es 0
function desactivarBtnAgregarG() {
  parseInt(celdaPresupuesto.innerHTML) <= 0
    ? document.getElementById("btnGasto").setAttribute("disabled", true)
    : document.getElementById("btnGasto").removeAttribute("disabled");
}

//Calculamos saldo actual
function saldoActual() {
  saldo = parseInt(celdaPresupuesto.innerHTML) - totalGastos;
  return saldo;
}

//Funcion para eliminar gastos
function eliminar(id) {
  //filtramos para eliminar y asignamos el resultado al array gastosArr 
  gastosArr = gastosArr.filter((item, index) => index != id);
  tabla(gastosArr);
  console.log(gastosArr);
  sumGastos();
  //imprimimos el valor de los gastos en el html
  document.getElementById("celdaGasto").innerHTML = totalGastos;
  saldoActual();
  //Imprimimos saldo en html
  document.getElementById("celdaSaldo").innerHTML = saldo;
}

function agregarGasto() {
  // Creamos instancia de objeto Gasto
  let nombreGasto = document.getElementById("txtNombreGasto").value;
  let valorGasto = parseInt(document.getElementById("txtValGasto").value);
  let itemGasto = new Gasto(nombreGasto, valorGasto);
  //insertamos instancia de objeto en el array gastosArr
  gastosArr.push(itemGasto);
  sumGastos();
  //imprimimos el valor de los gastos en el html
  document.getElementById("celdaGasto").innerHTML = totalGastos;
  saldoActual();
  //Imprimimos saldo en html
  document.getElementById("celdaSaldo").innerHTML = saldo;
  //Imprimir tabla
  tabla();
}

//Con reduce sacamos la sumatoria de los gastos en el array gastosArr
function sumGastos() {
  totalGastos = gastosArr.reduce(function (acumulador, currentValue) {
    return acumulador + currentValue.valor;
  }, 0);
}

// colocamos listener al boton -calcular-
btnCalcular.addEventListener("click", function () {
  celdaPresupuesto.innerHTML = inputPresupuesto.value;
  desactivarBtnAgregarG();
  saldoActual();
  document.getElementById("celdaSaldo").innerHTML = saldo;
});

// Limitamos la entrada del inputPresupuesto e inputValGasto a solo numeros
inputPresupuesto.addEventListener("input", function () {
  let valorActual = inputPresupuesto.value;
  let valorModificado = valorActual.replace(/\D/gi, "");
  inputPresupuesto.value = valorModificado;
});
inputValGasto.addEventListener("input", function () {  
  let valorActual = inputValGasto.value;
  let valorModificado = valorActual.replace(/\D/gi, "");
  inputValGasto.value = valorModificado;
});

  // Listener del boton añadir gasto
btnGasto.addEventListener("click", function () {
  agregarGasto();
});
//Llamamos esta funcion para iniciar la app con el boton añadir desactivado
desactivarBtnAgregarG();
