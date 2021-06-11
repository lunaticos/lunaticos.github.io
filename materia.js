const call = (fn) => { fn() }
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
const domains = {
    backend: 'https://lunaticos-backend.lgr.workers.dev',
    frontend: 'https://lunaticos.github.io',
}
const params = new URLSearchParams(window.location.search)



if (params.get('m') == undefined) {
    console.log('M UNDEFINED: REDIRECT TO /')
    window.location.assign('https://lunaticos.github.io/');
} else { console.log(params.get('m')) }

// AsyncAwait para carregar coisas da api
const appInit = async () => {

    // Fazer com que o botão da matéria selecionada tenha a classe = "navbar-item selected"
    document.getElementsByClassName('_mat')[params.get('m')].className += " selected";

    console.log('Fetching api...')
    const apiresponse = await fetch(domains.backend + '/materia/' + params.get('m'));
    console.log('done.')

    const materia = await apiresponse.json();
    console.log(materia);

    var contents = `

        <h1 id="mat_name"></h1>

        <div class="ativList">
        </div>

    `;


    // Muda o conteudo da pagina para a var contents;
    console.log(contents)
    document.getElementsByClassName('content')[0].innerHTML = contents;

    // Adiciona titulo para a pagina com o nome da matéria
    document.getElementById('mat_name').innerText = materia.name;

    // Adiciona um link para cada atividade da matéria
    materia.ativs.forEach(ativ => {
        let frag = document.createRange().createContextualFragment('<p class="ativList-item" ><a class="ativList-item" href="/atividade.html?ativ=%id%">%name% </a> Feito por %owner% </p>'.replace('%id%', ativ.id).replace('%name%', ativ.name).replace('%owner%', ativ.owner));

        document.getElementsByClassName('ativList')[0].appendChild(frag);

        console.log('Adicionada atividade: ' + ativ.name);
    });

}

// Start an async crash handler for the web app
call(async () => {
    try {
        await appInit()
    } catch (e) {
        console.error('Algo deu errado enquanto esta página carregava!!\n\n' + e.stack);

        document.getElementsByClassName('loading-icon')[0].src = "/img/error.svg";

        document.getElementsByClassName('loading-text')[0].innerHTML = "Algo deu errado.";
    }
})

// Fazer com que o h1 no conteudo contenha o nome da matéria, que é descoberto olhando o navbar-item do mesmo index da matéria.
//document.getElementById('mat_name').innerText = document.getElementsByClassName('_mat')[params.get('m')].innerText;