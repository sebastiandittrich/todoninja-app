import Loader from 'vue-spinner/src/PulseLoader.vue';

Loader.name = 'Loader';

export default {
  components: { Loader },
  data: () => ({
    loading_running: 0,
  }),
  computed: {
    loading() {
      return this.loading_running !== 0
    }
  },
  methods: {
    incrementLoading() {
      this.loading_running++
    },
    decrementLoading() {
      this.loading_running = this.loading_running -1
    },
    load(func) {
      this.incrementLoading();
      const prms = Promise.resolve(func());
      prms.then(() => this.decrementLoading());
      prms.catch(() => this.decrementLoading());
      return prms;
    },
  }
}