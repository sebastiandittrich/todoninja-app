import merge from 'deepmerge';
import Trait from './Trait';

export default class Page extends Trait {
  constructor(...args) {
    super(...args);
    this.app.name = args[0] || undefined;
    this.methods({
      log(...args) {
        console.log(...args)
      }
    })
  }

  vue() {
    const self = this;
    this.app.data = () => merge.all(this.app.datas.map(func => func()));

    this.app.created = function () {
      self.app.createds.map(func => func(this));
    };

    this.app.mounted = function () {
      self.app.mounteds.map(func => func(this));
    };

    return this.app;
  }
}
