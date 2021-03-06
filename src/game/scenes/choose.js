/*!
 * cncjs
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import Sprite from 'engine/sprite';
import Level from 'game/theater/level';
import GameScene from 'game/scene';
import {LEVELS} from 'game/globals';
import {collidePoint} from 'engine/physics';

export default class ChooseScene extends GameScene {

  constructor(engine, options) {
    super(...arguments);
    this.spriteIndex = 0;
    this.selected = false;
  }

  update() {
    super.update(...arguments);

    if ( this.selected ) {
      return;
    }

    const click = this.engine.mouse.buttonClicked('LEFT');
    if ( click ) {
      const {vw, vh} =  this.getViewport();
      const [width, height] = this.sprite ? this.sprite.getSize() : [vw, vh];
      const ratio = Math.min(vw / width, vh / height);
      const left = (vw - (width * ratio)) / 2;

      const gdiRect = {
        x1: left,
        x2: left  + (160 * ratio),
        y1: 0,
        y2: vh
      };

      const nodRect = {
        x1: (vw / 2),
        x2: (vw / 2) + (160 * ratio),
        y1: 0,
        y2: vh
      };

      if ( collidePoint(click, gdiRect) ) {
        this.selectTeam('gdi');
      } else if ( collidePoint(click, nodRect) ) {
        this.selectTeam('nod');
      }
    }

    if ( this.sprite ) {
      this.spriteIndex = (this.spriteIndex + .5) % this.sprite.count;
    }
  }

  render(target, delta) {
    if ( this.sprite ) {
      const {vw, vh} =  this.getViewport();
      this.sprite.renderFilled(target, vw, vh, Math.floor(this.spriteIndex));

      /*
      const left = (vw - (width * ratio)) / 2;
      target.strokeStyle = '#ff0000';
      target.strokeRect(left, 0, 160 * ratio, vh);
      target.strokeRect((vw / 2), 0, 160 * ratio, vh);
      */
    }
    super.render(...arguments);
  }

  async load() {
    await super.load([
      'sprite:TRANSIT.MIX/choose'
    ]);

    this.sprite = Sprite.instance('TRANSIT.MIX/choose');
    this.engine.sounds.playSong('TRANSIT.MIX/struggle', {loop: true});
  }

  selectTeam(teamName) {
    this.selected = true;
    const done = () => {
      this.destroy({team: teamName.toUpperCase()});
    };

    this.engine.sounds.playSong(`TRANSIT.MIX/${teamName}_slct`, {}, (el) => done());
  }

  ondestroy(options) {
    const mapName = LEVELS[options.team.toLowerCase()][0];
    Level.queue(this.engine, mapName, options);
  }

}
