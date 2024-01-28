import clock from "./clock.js";
import state from "./state.js"

const actionContainer = document.getElementsByClassName('actions')[0]
const soundContainer = document.getElementsByClassName('sounds')[0]

const minutesSpan = document.querySelector('.minutes span')
const secondsSpan = document.querySelector('.seconds span')


clock.updateDOMTime()
clock.updateDOMToggle()

minutesSpan.addEventListener('input', handleInput);
secondsSpan.addEventListener('input', handleInput);

minutesSpan.addEventListener('blur', (e) => {
  let minutes = Number(e.target.textContent)
  minutes = state.verifyTimeIsGreater({minutes, seconds: undefined})
  clock.updateDOMTime()
})

secondsSpan.addEventListener('blur', (e) => {
  let seconds = Number(e.target.textContent)
  seconds = state.verifyTimeIsGreater({minutes: undefined, seconds})
  clock.updateDOMTime()
})

actionContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button')
  const action = button?.dataset.action
  const minutes = Number(button?.dataset.minutes ?? 2) 

  if(clock[action]){
    clock[action]({minutes})
    button.blur()
  }
})

soundContainer.addEventListener('click', (e) => {
  const input = e.target.closest('input')
  const path = input?.dataset.path
  const isChecked = input?.checked
  if(path) {
    state.toggleMusicPath({path, isChecked})

  }
})

function handleInput(e) {
  let inputValue = e.target.textContent;
  inputValue = inputValue.replace(/[a-zA-Z]/g, '');
  e.target.textContent = inputValue;
}
