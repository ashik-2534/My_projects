let countEl = document.getElementById("count-el") // pass in arguments

let count = 0

function increment() {
    count = count + 1
    countEl.innerText = count
}
