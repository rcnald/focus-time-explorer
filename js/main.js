import clock from "./clock.js";
import state from "./state.js"

clock.updateTimer()

const actionContainer = document.getElementsByClassName('actions')[0]

actionContainer.addEventListener('click', (e) => {
    const action = e.target.closest('button')?.dataset.action

    if(clock[action]){
      clock[action](2,0)
    }

})
