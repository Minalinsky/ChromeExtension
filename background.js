
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var userInputField = document.getElementById('userInputField'); //contém a entrada do usuario
var userInputSubmit = document.getElementById('userInputSubmit'); //botao da Pesquisar extensão


document.addEventListener("DOMContentLoaded", function () {
  userInputSubmit.addEventListener('click', function (){
    searchGoogle(userInputField.value);
    
    /*var node = document.createElement('input');
    node.type = "checkbox";
    node.innerHTML = "PAPAPAP";
    document.getElementById('chckBoxForm').appendChild(node);*/
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
