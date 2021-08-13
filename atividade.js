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



if (params.get('ativ') == undefined) {
    console.log('M UNDEFINED: REDIRECT TO /')
    window.location.assign('https://lunaticos.github.io/');
} else { console.log(params.get('ativ')) }

// AsyncAwait para carregar coisas da api
const appInit = async () => {

    console.log('Fetching api...')
    const apiresponse = await fetch(domains.backend + '/atividade/' + params.get('ativ'));
    console.log('done.')


    const atividade = await apiresponse.json();
    console.log(atividade);

    // Fazer com que o botão da matéria da atividade aberta tenha a classe "selected"
    document.getElementsByClassName('_mat')[atividade.materiaID].className += " selected";

    var contents = `

        <h1 id="ativ_name"></h1>

        <p id="ativ_owner"></p>

        <p>Copio é gay!</p>

        <div class="division"></div>

        <ativtext>
        <span id="ativ_content"></span>
        </ativtext>
    `;


    // Muda o conteudo da pagina para a var contents;
    console.log(contents)
    document.getElementsByClassName('content')[0].innerHTML = contents;

    // Adiciona titulo para a pagina
    document.getElementById('ativ_name').innerText = atividade.name;

    // Adiciona dono e pontuação para a pagina 
    document.getElementById('ativ_owner').innerText = atividade.owner + ' - ' + atividade.points + ' Pontos ';

    // Adiciona conteudo da atividade para a pagina
    document.getElementById('ativ_content').innerText = atividade.content;

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
