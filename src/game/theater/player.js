/*!
 * cncjs
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

import {PLAYER_NAMES} from 'game/globals';

export default class Player {

  constructor(engine, playerName, opts, current) {
    this.engine = engine;
    this.team = PLAYER_NAMES.indexOf(playerName);
    this.playerName = playerName;
    this.teamName = playerName === 'BadGuy' ? 'NOD' : 'GDI'; // FIXME
    this.credits = (opts.Credits || 0) * 100;
    this.power = 0;
    this.current = current === true;
  }

  addPower(p) {
    this.power += parseInt(p, 10);
  }

  removePower(p) {
    this.power -= parseInt(p, 10);
  }

  setPower(p) {
    this.power = parseInt(p, 10);
  }

  addCredits(c) {
    this.credits += parseInt(c, 10);
  }

  removeCredits(c) {
    const drain = Math.min(this.credits, parseInt(c, 10));
    this.credits -= drain;
    return drain;
  }

  setCredits(c) {
    this.credits = parseInt(c, 10);
  }

  static createAll(engine, opts, current) {
    const players = PLAYER_NAMES.map((name) => {
      return new Player(engine, name, opts[name], name === current);
    });
    console.log('Players', players);
    return players;
  }

}