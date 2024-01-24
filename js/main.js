import clock from "./clock.js";
import state from "./state.js"

clock.updateDOMTime()
clock.updateDOMtoggle()

const actionContainer = document.getElementsByClassName('actions')[0]

actionContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button')
  const action = button?.dataset.action

  if(clock[action]){
    clock[action]()
    button.blur()
  }
})
