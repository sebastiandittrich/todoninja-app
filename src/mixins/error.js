import Error from '@c/error'

export default {
  components: { Error },
  data: () => ({
    error: false,
  }),
  methods: {
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
  }
}