import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Electron + Vite Template</h1>
    <div class="card">
      <button id="counter" type="button">Count is 0</button>
    </div>
    <p class="read-the-docs">
      Click on the button to test the app
    </p>
  </div>
`

let counter = 0
document.querySelector<HTMLButtonElement>('#counter')!.addEventListener('click', () => {
  counter++
  document.querySelector<HTMLButtonElement>('#counter')!.innerHTML = `Count is ${counter}`
})