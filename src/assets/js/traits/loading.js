import Trait from '@/assets/js/Trait';
import { SyncLoader } from '@saeris/vue-spinners';

SyncLoader.name = 'SyncLoader';

export default new Trait()
  .data(() => ({
    loading: false,
  }))
  .with(SyncLoader)
  .methods({
    load(func) {
      this.loading = true;
      const prms = Promise.resolve(func());
      prms.then(() => this.loading = false);
      prms.catch(() => this.loading = false);
      return prms;
    },
  });
