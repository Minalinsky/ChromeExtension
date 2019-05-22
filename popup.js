var userInputField = document.getElementById('userInputField'); //contém a entrada do usuario
var userInputSubmit = document.getElementById('userInputSubmit'); //botao da Pesquisar extensão

userInputSubmit.addEventListener('click', function (){
  searchGoogle(userInputField.value);
});

function searchGoogle(string){
    window.open('http://google.com/search?q=' + string);
}

