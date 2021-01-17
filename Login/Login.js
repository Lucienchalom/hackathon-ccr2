document.querySelector('form.login').addEventListener('submit', event => {
    event.preventDefault()

    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#senha').value
    }
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const BASE_URL = 'https://shawee-api.herokuapp.com'

    fetch(`${BASE_URL}/auth`, requestInfo)
        .then(async response => {
            const jsonResponse = await response.json()

            if (response.ok) {
                localStorage.setItem('token', jsonResponse.token)
                alert('Login efetuado com sucesso')
            } else {
                console.log(jsonResponse)
                alert('Senha ou email incorretos')
            }
        })
})