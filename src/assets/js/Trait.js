import merge from 'deepmerge';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default class Trait {
  constructor() {
    this.app = {
      components: {},
      methods: {},
      computed: {},
      datas: [],
      props: {},
      watch: {},
      directives: {},
      createds: [],
      mounteds: [],
      traits: [],
    };
  }

  layout(name) {
    this.app.layout = name;
    return this;
  }

  use(...traitstoapply) {
    for (const trait of traitstoapply) {
      if (typeof trait === 'string') {
        // trait = await use('traits/' + trait)
      }
      this.applyTrait(trait);
    }
    return this;
  }

  with(...components) {
    for (const componentpath of components) {

      // Full Component is given
      if(typeof componentpath == 'object') {
        this.addComponent({ full: true, component: componentpath})
      } 

      // Component name is given
      else {
        const component = {}
        if(componentpath.includes(':')) {
          component.name = componentpath.split(':')[0]
          component.path = componentpath.split(':')[1]
        } else {
          component.path = componentpath
        }
        this.addComponent(component);
        }
    }

    return this;
  }

  methods(functions) {
    for (const func in functions) {
      this.app.methods[func] = functions[func];
    }
    return this;
  }

  computed(functions) {
    for (const func in functions) {
      this.app.computed[func] = functions[func];
    }
    return this;
  }

  method(name, func) {
    this.app.methods[name] = func;
    return this;
  }

  data(callback) {
    this.app.datas.push(callback);
    return this;
  }

  props(props = {}) {

    Object.assign(this.app.props, props)

    // if(typeof props[0] == 'string') {
    //   this.app.props = this.app.props.concat(props);
    // } else {
    //   if(Array.isArray(this.app.props)) {
    //     this.app.props = {}
    //   }
    //   Object.assign(this.app.props, { ...props[0] })
    // }
    return this
  }

  watch(name, callback) {
    if(!callback) {
      const watchers = name
      Object.assign(this.app.watch, watchers)
    } else {
      if(!Array.isArray(name)) {
        name = [name]
      }
      for(let watchername of name) {
        this.app.watch[watchername] = callback
      }
    }
    return this
  }

  created(callback) {
    this.app.createds.push(callback);
    return this;
  }

  mounted(callback) {
    this.app.mounteds.push(callback);
    return this;
  }

  filters(filters) {
    Object.assign(this.app.filters, {...filters})
    return this
  }

  actions(...actions) {
    if (typeof actions[0] === 'object') {
      actions = actions[0];
    }
    Object.assign(this.app.methods, mapActions(actions));
    return this;
  }

  mutations(...mutations) {
    if (typeof mutations[0] === 'object') {
      mutations = mutations[0];
    }
    Object.assign(this.app.methods, mapMutations(mutations));
    return this;
  }

  state(...states) {
    if (typeof states[0] === 'object') {
      states = states[0];
    }
    this.computed(mapState(states))
    // Object.assign(this.app.computed, mapState(states));
    return this;
  }

  getters(...getters) {
    if (typeof getters[0] === 'object') {
      getters = getters[0];
    }
    Object.assign(this.app.computed, mapGetters(getters));
    return this;
  }

  directive(name, callback) {
    return this.directives({[name]: callback})
  }

  directives(directives) {
    Object.assign(this.app.directives, directives)
    return this
  }

  addComponent(component) {

    // Full component is given
    if(component.full) {
      this.app.components[component.component.name] = component.component
    }

    // Component name is given
    else {
      const componentname = { from_path: component.path.toLowerCase().replace(/\//g, '-'), given: component.name }

      this.app.components[componentname.given || componentname.from_path] = this.loadComponent(component.path);
    }

    return this;
  }

  loadComponent(name) {
    return () => import(`@/components/${name}.vue`);
  }

  applyTrait(trait) {
    this.app = merge(this.app, trait.app);
    return this;
  }
}
