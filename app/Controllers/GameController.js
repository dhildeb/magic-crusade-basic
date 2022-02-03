import { ProxyState } from "../AppState.js";
import { gameService } from "../Services/GameService.js";

export class GameController {
  constructor() {
    ProxyState.on('game', _endGame)
    ProxyState.on('creationPage', _creationPage)
  }
  startGame() {
    document.getElementById('startPage').classList.add('d-none')
    document.getElementById('game').classList.remove('d-none')
    gameService.startGame()
  }
  drawCard() {
    gameService.drawCard()
  }
  endTurn() {
    gameService.endTurn()
  }

  creationPage() {
    gameService.creationPage()
  }
}
function _endGame() {
  if (!ProxyState.game) {
    document.getElementById('game').innerHTML = `<h1>Player ${ProxyState.turn + 1} is the Victor!</h1>`
  }
}

function _creationPage() {
  document.getElementById('startPage').innerHTML = /*html*/
    `<form onsubmit="createCreature(event)" id="creatureForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" type="text" name="name">
      </div>
      <div class="form-group">
        <label for="toughness">Toughness</label>
        <input class="form-control" type="number" name="toughness">
      </div>
      <div class="form-group">
        <label for="power">Power</label>
        <input class="form-control" type="number" name="power">
      </div>
      <div class="form-group">
        <label for="cost">Magic Cost</label>
        <select  class="form-control" name="cost[]" id="magicTypes" rows="12" multiple>
          <option value="air">Air</option>
          <option value="air">Air</option>
          <option value="air">Air</option>
          <option value="mountain">Mountain</option>
          <option value="mountain">Mountain</option>
          <option value="mountain">Mountain</option>
          <option value="water">Water</option>
          <option value="water">Water</option>
          <option value="water">Water</option>
          <option value="fire">Fire</option>
          <option value="fire">Fire</option>
          <option value="fire">Fire</option>
        </select>
      </div>
      <div class="form-group">
        <label for="img">Image Url</label>
        <input class="form-control" type="url" name="img">
      </div>
      <div class="form-group">
        <label for="actions">Number of Actions</label>
        <input class="form-control" type="number" name="actions" value="1">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea  class="form-control" name="description" rows="3" cols="4"></textarea>
      </div>
      <button class="btn btn-primary">Create</button>
    </form>
    <div class="col-2 card creature-img-lg my-5 prototype" style="background-image: ''" title=""id="creaturePrototype">
    <div class="card-body">
      <span class="position-absolute creature-title">Name</span>
      <div class="creature-cost" id="cost"></div>
      <span class="creature-stats" id="stats"><i class="fas fa-khanda"></i> <span id="khanda">0</span> / <i class="fas fa-heart"></i> <span id="heart">0</span></span>
    </div>
  </div>
  <button class="btn btn-secondary back" type="button" onclick="location.reload()">back</button>
  `
}
