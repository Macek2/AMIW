//1
function changeHeader() {
    const headers = document.querySelectorAll('h2');
    headers.forEach(el => {
        el.textContent = 'Hello world';
    });
}

//2
function changeClass() {
    const divs = document.querySelectorAll('.cl1');
    if (divs.length > 0) {
        const lastDiv = divs[divs.length - 1];
        lastDiv.classList.remove('cl1');
        lastDiv.classList.add('cl2');
    }
}

//3
function toggleClass() {
    const divs = document.querySelectorAll('.cl1, .cl2');
    if (divs.length > 0) {
        const lastDiv = divs[divs.length - 1];
        lastDiv.classList.toggle('cl1');
        lastDiv.classList.toggle('cl2');
    }
}

//4
function changeColor() {
    const h2 = document.querySelector('h2');
    if (h2) {
        h2.style.color = 'red';
    }
}

//5
function changeParagraphColor(paragraph) {
    paragraph.style.color = 'red';
}

function resetParagraphColor(paragraph) {
    paragraph.style.color = 'black';
}

//6
let timer;
let seconds = 0;
function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
        seconds++;
        document.getElementById('display').innerText = seconds;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('display').innerText = seconds;
}

//7
async function fetchUser () {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        document.getElementById('user').innerHTML = `
            <img src="${user.picture.large}" alt="User  Picture">
            <p>Imię: ${user.name.first}</p>
            <p>Nazwisko: ${user.name.last}</p>
        `;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
    }
}