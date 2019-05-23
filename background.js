
/*chrome.runtime.onStartup.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});*/

var userInputField = document.getElementById('userInputField'); //contém a entrada do usuario
var userInputSubmit = document.getElementById('userInputSubmit'); //botao da Pesquisar extensão
var checkedWords = new Array(); //Conterá a lista de palavras marcadas pelo usuario

document.addEventListener("DOMContentLoaded", function () {
   userInputSubmit.addEventListener('click', function (){
    searchGoogle(userInputField.value);

    //fazendo a pesquisa com os checkboxes
    var checkboxes = document.getElementsByClassName('chckBox'); //selecionando todos os elementos que foram marcados
    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){
        checkedWords.push(checkboxes[i].value);
      }
    }

    checkedWords.forEach(e =>{
      searchGoogle(userInputField.value + e);
    });
  });
});

function searchGoogle(string){
    window.open('http://google.com/search?q=' + string);
}

function readWords(){ //retorna uma Promise com todos os substativos já "splitados" em um array ---> readWords().then(arr => console.log("a palavra é: " + arr[i]));
  console.log("Fetch sendo carregado");
  return fetch('478palavras.txt').then(response => response.text().then(text => text.split(/\r?\n/)));
}

function randomNumbers(){ //retorna array com 10 numeros random entre 0 e 477
  var arr = new Array();
  for(let i = 0; i < 10; i++){
    let rdm = Math.floor(Math.random() * 476);
    arr.push(rdm);
  }
  return arr;
}

// mostrando as 10 palavras
window.onload = function init(){
      var numbers = randomNumbers(); //array com numeros sortidos
      var wordsPromise = readWords();
      var myform = document.getElementById('myform');

      numbers.forEach(function (number){ //para cada numero do array, criar os checkboxes com as respectivas labels
        wordsPromise.then(function (arr){
          //criando os checkboxes
          let myInput = document.createElement('input');
          myInput.id = arr[number]; //é a palavra sorteada
          myInput.value = arr[number]; //é a palavra sorteada
          myInput.className = "chckBox";
          myInput.type = "checkbox";
          myform.appendChild(myInput);

          //colocando label para cada checkbox
          let lbl = document.createElement('label');
          lbl.textContent = arr[number];
          lbl.htmlFor = arr[number];
          myform.appendChild(lbl);
        });
      });

}
