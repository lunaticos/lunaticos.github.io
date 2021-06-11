const call = (fn) => { fn() }

const filterxss = (value) => {
    var lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    return value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
}

var domains = {
    backend: 'https://lunaticos-backend.lgr.workers.dev',
    frontend: 'https://lunaticos.github.io',
}

const loadingElement = `<div class="loading"> <img src='/img/loading.svg' class="loading-icon">
<h3 class="loading-text">Postando Lição...</h3>
</div>`

const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires;
}
const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const pagealert = () => {
    // Add loading
    document.getElementsByClassName('alertdiv')[0].innerHTML = loadingElement;

    // Make it visible
    document.getElementsByClassName('alertmask')[0].className = "alertmask";
}

const appInit = async () => {
    // Se tiver campos em branco, alertar e parar.
    if (document.getElementById('ativ_name').value == "" || document.getElementById('ativ_content').value == "") {
        alert('Todos os campos devem ser preenchidos!')
        return;
    }

    pagealert();

    // Monta o payload para mandar a api. Sanitizado com filterxss
    var postbody = {
        name: filterxss(document.getElementById('ativ_name').value),
        points: filterxss(document.getElementById('ativ_points').value),
        content: filterxss(document.getElementById('ativ_content').value),
        materiaID: filterxss(document.getElementById('ativ_materia').value),
        owner: filterxss(document.getElementById('ativ_owner').value),
    }
    console.log(postbody)

    // Manda o payload para o servidor
    const rawResponse = await fetch(domains.backend + '/postar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postbody)
    });
    const atividade = await rawResponse.json();

    // Muda o icone e texto do loading, e também redireciona para a atividade depois de 3s
    document.getElementsByClassName('loading-icon')[0].src = "/img/success.svg";
    document.getElementsByClassName('loading-text')[0].innerHTML = "Lição Postada.";
    setTimeout(() => { window.location.assign(domains.frontend + "/atividade.html?ativ=" + atividade.id); }, 2000)



}

const postarLicao = async () => {
    // Start an async crash handler for the web app
    call(async () => {
        try {
            await appInit()
        } catch (e) {
            console.error('Algo deu errado enquanto esta página carregava!!\n\n' + e.stack);

            document.getElementsByClassName('loading-icon')[0].src = "/img/error.svg";

            document.getElementsByClassName('loading-text')[0].innerHTML = "Algo deu errado.<br>Avise o longhirar IMEDIATAMENTE.";
        }
    })
}

