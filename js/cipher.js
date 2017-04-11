document.addEventListener("DOMContentLoaded", () => {
  let n = 0             //alphabetical keydown counter
  let n1 = 0            //first key box value
  let n2 = 0            //second key box value
  let n3 = 0            //third key box value
  let k = 0             //keydown event count
  let r_1               //First rotor
  let r_2               //Second rotor
  let r_3               //Third rotor
  let r_4               //Returned signal from reflector (reflector - third rotor)
  let r_5               //-*- (third rotor - second rotor)
  let r_6               //-*- (second rotor - first rotor)
  let refl              //The reflector returned the current, via an entirely different path
  let TxEncrypt = new Array()               //Input text value
  let Output = new Array()                  //Output encripted array
  let Encrypt = new Array()                 //Encripted index


  //You can customize this arrays however, but if letters count changing donn't forget chenge 26 coefficient
  //in line 46, 80, 82, 85, 88, 92 - 94, 96 - 103
  const arr_alp = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")               //regular aphabet array
  const rotor_3 = new Array("B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O")               //first rotor alphabet array
  const rotor_2 = new Array("A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E")               //second rotor alphabet array
  const rotor_1 = new Array("E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J")               //third rotor alphabet array
  const reflector = new Array("Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T")             //reflector alphabet array

  let answear = document.getElementsByClassName("answear")[0]
  let buttClean = document.getElementById('buttClean')
  let TxArea = document.getElementById('shiprograms')
  let TxKey1 = document.getElementById('Key1')
  let TxKey2 = document.getElementById('Key2')
  let TxKey3 = document.getElementById('Key3')
  let KeyCode = document.getElementById('keyCode')

  //search function retuting index of value
  const find = (array, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) return i
    }
    return -1
  }

  //calculating module difference between array indexes
  const Module = (index1, index2) => {
  	let difference = index1 - index2
  	return difference < 0 ? difference + 26 : difference
  }

  //fuction to clear textarea
  buttClean.addEventListener('click', () => {
    location.reload()
  })

  const colorSVG = () => {
    let svgF = document.getElementById(Encrypt)
    let svgB = document.getElementById(`c${Encrypt}`)
    svgF.style.fill = "#BFBFBF"
    svgB.style.fill = "#121214"
  }

  //getting the value of the select box to generate a key to an encryption
  answear.addEventListener("change", () => {
    KeyCode.innerHTML = `Key: ${TxKey1.value} ${TxKey2.value} ${TxKey3.value}`
  })

  document.body.addEventListener("keyup", () => {
    let svgF = document.getElementById(Encrypt)
    let svgB = document.getElementById(`c${Encrypt}`)
    svgF.style.fill = "#BFBFBF"
    svgB.style.fill = "#121214"
  })

  document.body.addEventListener("keydown", (event) => {
    if(event.keyCode >= 65 && event.keyCode <= 90) {          //selectiong of values more than 65 and less thsn 90
                                                              //These values correspond to the letters on keyboard

      TxEncrypt = arr_alp[(event.keyCode % 65)]               //selecting value from alphabet array by keyCode

      if(KeyboardEvent) {                                     //changing key box values
        n = (n + 1) % 26
        k++
        TxKey3.value = arr_alp[(find(arr_alp, TxKey3.value) + 1) % 26]

        if(n === 3 || n === 7 || n === 13 || n === 17 || n === 21 || n === 23) {
          TxKey2.value = arr_alp[(find(arr_alp, TxKey2.value) + 1) % 26]
        }
        if(n === 5 || n === 10 || n === 15 || n === 20 || n === 25) {
          TxKey1.value = arr_alp[(find(arr_alp, TxKey1.value) + 1) % 26]
        }
      }

      TxKey3.value = arr_alp[(find(arr_alp, TxKey3.value) + n1) % 26]
      TxKey2.value = arr_alp[(find(arr_alp, TxKey2.value) + n2) % 26]
      TxKey1.value = arr_alp[(find(arr_alp, TxKey1.value) + n3) % 26]

      r_1 = (find(arr_alp, TxEncrypt) + find(arr_alp, TxKey3.value)) % 26
      r_2 = (find(arr_alp, rotor_1[r_1]) + Module(find(arr_alp, TxKey2.value), find(arr_alp, TxKey3.value))) % 26
      r_3 = (find(arr_alp, rotor_2[r_2]) + Module(find(arr_alp, TxKey1.value), find(arr_alp, TxKey2.value))) % 26
      refl = (Module(find(arr_alp, rotor_3[r_3]), find(arr_alp, TxKey1.value))) % 26
      r_4 = (find(arr_alp, reflector[refl]) + find(arr_alp, TxKey1.value)) % 26
      r_5 = (Module(find(rotor_3, arr_alp[r_4]), Module(find(arr_alp, TxKey1.value), find(arr_alp, TxKey2.value)))) % 26
      r_6 = (Module(find(rotor_2, arr_alp[r_5]), Module(find(arr_alp, TxKey2.value), find(arr_alp, TxKey3.value)))) % 26
      Encrypt = (Module(find(rotor_1, arr_alp[r_6]), find(arr_alp, TxKey3.value))) % 26

      Output[k] = arr_alp[Encrypt]
      TxArea.innerHTML = `Shirograms: ${Output.join('')}`

      let svgF = document.getElementById(Encrypt)
      let svgB = document.getElementById(`c${Encrypt}`)
      svgF.style.fill = "yellow"
      svgB.style.fill = "#3F3F3F"
    }
  })
}, false)
