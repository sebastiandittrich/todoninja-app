import Trait from '@/assets/js/Trait';

export default new Trait()
  .with('error')
  .methods({
    showError(error) {
      console.log(error)
      if (error) {
        this.error = {
          header: 'Something went wrong.',
          message: error.message,
        };
      } else {
        this.error = false;
      }
    },
  })
  .data(() => ({
    error: false,
  }));

