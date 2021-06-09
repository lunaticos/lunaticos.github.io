const materias = {
    0: 'pt',
    1: 'mat',
    2: 'cien',
    3: 'hist',
    4: 'geo',
    5: 'ing',
    6: 'capo',
    7: 'edf',
    8: 'arte',
}
const params = new URLSearchParams(window.location.search)



if (params.get('m') == undefined) {
    console.log('M UNDEFINED: REDIRECT TO /')
    window.location.assign('https://lunaticos.github.io/');
} else { console.log(params.get('m')) }

// Fazer com que o botão da matéria selecionada tenha a classe = "navbar-item selected"
document.getElementsByClassName('_mat')[params.get('m')].className += " selected";

// Fazer com que o h1 no conteudo contenha o nome da matéria, que é descoberto olhando o navbar-item do mesmo index da matéria.
document.getElementById('mat_name').innerText = document.getElementsByClassName('_mat')[params.get('m')].innerText;