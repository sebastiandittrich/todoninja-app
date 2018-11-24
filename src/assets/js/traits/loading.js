import Trait from '@/assets/js/Trait';
import Loader from 'vue-spinner/src/PulseLoader.vue';

Loader.name = 'Loader';

export default new Trait()
  .data(() => ({
    loading_running: 0,
  }))
  .computed({
    loading() {
      return this.loading_running !== 0
    }
  })
  .with(Loader)
  .methods({
    incrementLoading() {
      this.loading_running++
    },
    decrementloading() {
      this.loading_running = this.loading_running -1
    },
    load(func) {
      this.incrementLoading();
      const prms = Promise.resolve(func());
      prms.then(() => this.decrementLoading());
      prms.catch(() => decrementLoading());
      return prms;
    },
  });
