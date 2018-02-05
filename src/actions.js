export const SET_GAMES = "SET_GAMES"
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';

function handleResponse(response) {
   console.log('in handleresponse res ',response)
    if (response.ok) {
     return  response.json()
    } else {
        console.log('response ',response)
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

 
  export function addGame(game) {
      console.log('addGame game',game)
    return {
      type: ADD_GAME,
      game
    }
  }
export function setGames(games){
    return {
        type: SET_GAMES,
        games
    }
}

export function gameFetched(game) {
    console.log('gameFetched game',game)
  return {
    type: GAME_FETCHED,
    game
  }
}
export function gameUpdated(game) {
    console.log('gameupdated game',game)
  return {
    type: GAME_UPDATED,
    game
  }
}
export function saveGame(data) {
    return dispatch =>   {
      return fetch('/api/games', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleResponse).then(data => dispatch(addGame(data.game)));
    }
  }
  export function updateGame(data) {
    return dispatch =>   {
      return fetch(`/api/games/${data._id}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleResponse).then(data => dispatch(gameUpdated(data.game)));
    }
  }
  
export function fetchGames() {
    return dispatch => {
        fetch('/api/games')
            .then( res => res.json())
            .then(data => {
                console.log('in action games after returning from server ',data.games)
                dispatch(setGames(data.games))
            })
    }
}
export function fetchGame(id) {
    return dispatch => {
        fetch(`/api/games/${id}`)
            .then( res => res.json())
            .then(data => {
                console.log('fetchGame(id) game ',data.game)
                dispatch(gameFetched(data.game))
            })
    }
}