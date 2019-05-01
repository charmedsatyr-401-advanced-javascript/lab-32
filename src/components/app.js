import React from 'react';
import { connect } from 'react-redux';

import Player from './player.js';

import * as actions from '../store/players-actions.js';

const App = props => {
  // handleDelete: id => dispatch(actions.destroy(id)),
  // handleGet: id => dispatch(actions.get(id)),
  // handlePost: id => dispatch(actions.post(id)),
  // handlePatch: id => dispatch(actions.patch(id)),
  // handlePut: id => dispatch(actions.put(id)),

  // const getPlayer = id => props.handleGet(id);
  const deletePlayer = id => props.handleDelete(id);

  const content = props.players.list.map((player, index) => (
    <li key={player._id}>
      {player.name}
      <button onClick={() => deletePlayer(player._id)}>Delete</button>
    </li>
  ));

  return (
    <div>
      <h2>Players</h2>
      <ul>{content}</ul>
      <Player />
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleDelete: id => dispatch(actions.destroy(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
