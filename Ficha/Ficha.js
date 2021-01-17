const API_BASE_URL = 'https://shawee-api.herokuapp.com/'

const cadastroFicha = document.querySelector("form.cadastro");

cadastroFicha.addEventListener("submit", event => {
    event.preventDefault();

    if (validaCPF(cpf) && cpf.length === 11) {
        cadastrarFicha(data);
    } else {
        alert("O CPF não é válido");
    }
})
const data = {
    birth: document.querySelector('#idade').value,
    city: document.querySelector('#cidade').value,
    document: document.querySelector('#cpf').value,
    email: document.querySelector('#email').value,
    fullName: document.querySelector('#nome').value,
    password: document.querySelector('#senha').value,
    passwordConfirmation: document.querySelector('#reSenha').value,
   // state: document.querySelector('#uf').value,
    username: document.querySelector('#userName').value
}
const cadastrarFicha = (data) => {

    return fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
            autorization: 'token',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resposta => {
            return resposta.body
        })

}

function verificaCPFInvalidos(cpf) {
    const cpfsInvalidos = [
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
        "00000000000"
    ];

    return cpfsInvalidos.indexOf(cpf) === -1;
}

function verificaPrimeiroDigito(cpf) {
    const peso = 11;
    const totalDeDigitosPrimeiraParte = 9;
    const digitoDeVerificacao = (cpf.value.substring(9, 10));
    return verificaDigito(
        cpf,
        totalDeDigitosPrimeiraParte,
        peso,
        digitoDeVerificacao
    );
}

function verificaSegundoDigito(cpf) {
    const peso = 12;
    const totalDeDigitosSegundaParte = 10;
    const digitoDeVerificacao = parseInt(cpf.value.substring(10, 11));
    return verificaDigito(
        cpf,
        totalDeDigitosSegundaParte,
        peso,
        digitoDeVerificacao
    );
}

function verificaDigito(cpf, totalDeDigitos, peso, digitoDeVerificacao) {
    const soma = somaNumerosCPF(cpf, totalDeDigitos, peso);
    const resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === digitoDeVerificacao;
}

function somaNumerosCPF(cpf, totalDeDigitos, peso) {
    let soma = 0;
    for (let indice = 1; indice <= totalDeDigitos; indice++) {
        soma += parseInt(cpf.value.substring(indice - 1, indice)) * (peso - indice);
    }
    return soma;
}

function validaCPF(cpf) {
    return (
        verificaPrimeiroDigito(cpf) &&
        verificaSegundoDigito(cpf) &&
        verificaCPFInvalidos(cpf)
    );
}