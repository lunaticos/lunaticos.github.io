const call = (fn) => { fn() }

const domains = {
    backend: 'https://lunaticos-backend.lgr.workers.dev',
    frontend: 'https://lunaticos.github.io',
}

// AsyncAwait para carregar coisas da api
const appInit = async () => {
    console.log('Fetching api...')
    const apiresponse = await fetch(domains.backend + '/logistica');
    console.log('done.')
    console.log(apiresponse)

    const materia = await apiresponse.json();
    console.log(materia);

    var contents = `

        <h1>Logística</h1>

        <div class="logisticaList">
        </div>

    `;


    // Muda o conteudo da pagina para a var contents;
    console.log(contents)
    document.getElementsByClassName('content')[0].innerHTML = contents;

    // Adiciona o texto para cada pessoa com pontos;
    materia.users.forEach(user => {
        let frag = document.createRange().createContextualFragment('<p class="logisticaListItem">' + user.name + '<b>:</b> ' + user.points + '</p>');

        document.getElementsByClassName('logisticaList')[0].appendChild(frag);

        console.log('Adicionado usuário: ' + user.name);
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