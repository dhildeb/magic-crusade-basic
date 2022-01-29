import { ProxyState } from "../AppState.js";

export class PlayersController {
  constructor() {
    ProxyState.on('players', _drawplayer)
    ProxyState.on('turn', _drawControls)
    ProxyState.on('players', _drawplayersMagic)
  }
}

function _drawplayer() {
  ProxyState.players.forEach(p => {
    document.getElementById('player' + p.id).innerHTML = ProxyState.players[p.id].hp
    let hand = ''
    let battleField = ''
    if (ProxyState.players[p.id].creatures.length > 0) {
      ProxyState.players[p.id].creatures.forEach(creature => {
        if (creature.inPlay) {
          battleField += creature.Template
        } else {
          hand += creature.Template
        }
      });
    }
    document.getElementById('battlefield' + p.id).innerHTML = battleField
    document.getElementById('hand' + p.id).innerHTML = hand
  })
}
function _drawControls() {
  document.getElementById('playerControls').innerHTML = ProxyState.players[ProxyState.turn].ControllerTemplate
}

function _drawplayersMagic() {
  document.getElementById('magic' + ProxyState.turn).innerHTML = ProxyState.players[ProxyState.turn].MagicTemplate
}