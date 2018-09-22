import Trait from '@/assets/js/Trait';

export default new Trait()
  .mounted(async (vue) => {
    try {
      await vue.$store.dispatch('auth/authenticate')
    } catch(error) {
      
    }
    if(vue.$store.state.auth.user == null) {
      vue.$router.replace('/login')
    }
  });
