function end() {
    if (Data.Memory.gte('1e50000')) {
        let divs = document.querySelectorAll('div');
        let endScreen = document.getElementById('endScreen')

        divs.forEach(div => {
            div.style.display = 'none';
        });

        let body = document.querySelector('body');

        body.style.backgroundColor = 'black';
        endScreen.style.display = 'block';
    }
}

setInterval(end, 100)