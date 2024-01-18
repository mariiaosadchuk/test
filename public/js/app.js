console.log('hi from js file')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const errorMessage = document.querySelector('#errorMessage')
const weatherMessage = document.querySelector('#weatherMessage')

weatherForm.addEventListener('submit', (e) => {
  errorMessage.textContent = ''
  weatherMessage.textContent = ''
  e.preventDefault()
  const location = searchInput.value

  fetch(`http://localhost:3300/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = data.error
      } else {
        weatherMessage.textContent = data.weather
      }
    })
  })
})
