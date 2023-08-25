// variavel global, para poder recuperar no range do passwordGenerator(global variable, to be able to recover in the passwordGenerator range)
let passwordRange = 8

// recuperando o valor do password (recovering password value)
const inputEL = document.querySelector("#password")

// recuperando os valores dos checkbox (recovering checkbox value)
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCaseCheckEl = document.querySelector("#number-check")
const symbolsCaseCheckEl = document.querySelector("#symbols-check")
const securityIndicatorBarEL = document.querySelector("#security-indicator-bar")


// função de criação de password (password creation function)
function generatePassword() {
    // caracteres que serão usados na senha (characters that will be used in the password)
    let chars = "abcdefghijklmnpqrstuvwxyz"
    const upperCaseChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ"
    const numberCaseChars = "0123456789"
    const symbolsCaseChars = "?!@#$%&*()[]"

    // variavel que vai receber o password (variable that will receive the password)
    let password = ""

    // criando as condições "IF" ("IF" conditions)
    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }
    if (numberCaseCheckEl.checked) {
        chars += numberCaseChars
    }
    if (symbolsCaseCheckEl.checked) {
        chars += symbolsCaseChars
    }

    // Gerando o password randomicamente (randomly generating password)
    for (let i = 0; i < passwordRange; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    // adicionando o password dentro do input text (adding the password inside the input text)
    inputEL.value = password

    calculateQuality()
    }


    // funão de ajuste da barra de acordo com o "nivel" de segurança da senha (bar adjustment function according to password security "level")
    function calculateQuality () {
        // nivel da barra de acordo com a porcentagem (bar level according to percentage)
        const percent = Math.round((passwordRange / 16)*30 
        + (upperCaseCheckEl.checked ? 10 : 0)
        + (numberCaseCheckEl.checked ? 25 : 0)
        + (symbolsCaseCheckEl.checked ? 35 : 0))
        securityIndicatorBarEL.style.width = `${percent}%`

        // selecionando o visual de acordo com o nivel de segurança "porcentagem" definida, incluindo e removendo classes css (selecting the visual according to the defined "percentage" security level, including and removing css classes)
        if (percent > 69) {
            securityIndicatorBarEL.classList.remove("critical")
            securityIndicatorBarEL.classList.remove("warning")
            securityIndicatorBarEL.classList.add("safe")
        } else if (percent > 49) {
            securityIndicatorBarEL.classList.remove("critical")
            securityIndicatorBarEL.classList.remove("safe")
            securityIndicatorBarEL.classList.add("warning")
        } else {
            securityIndicatorBarEL.classList.remove("warning")
            securityIndicatorBarEL.classList.remove("safe")
            securityIndicatorBarEL.classList.add("critical")
        }

        if (percent >= 100) {
            securityIndicatorBarEL.classList.add("completed")
        } else {
            securityIndicatorBarEL.classList.remove("completed")
        }

    }

// função de copiar o password (password copy function)
function copy () {
    navigator.clipboard.writeText(inputEL.value)
}


// função range e atualização dos valores dentro do input (range function and update of values ​​inside the input)
const passwordRangeEl = document.querySelector("#password-length")
passwordRangeEl.addEventListener("input", function() {
    passwordRange = passwordRangeEl.value
    document.querySelector("#password-length-text").innerText = passwordRange
    generatePassword()
})

// criando o evento "click" ("click" event)
upperCaseCheckEl.addEventListener("click", generatePassword)
numberCaseCheckEl.addEventListener("click", generatePassword)
symbolsCaseCheckEl.addEventListener("click", generatePassword)

// evento de copiar (copy event)
// const copyActionButton = document.querySelector("#copyButton")
// copyActionButton.addEventListener("click", copy)
document.querySelector("#copy2").addEventListener("click", copy)
document.querySelector("#copyButton").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

// chamando a função de gerar password (calling the generate function password)
generatePassword()