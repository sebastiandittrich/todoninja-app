<template>
  <transition name="opacity">
    <div>
      <div class="h-screen md:bg-grey-lighter" style="display: grid; grid-template: 'content' 1fr 'footer' auto / auto">
        <div class="md:my-8 bg-white md:rounded-lg md:shadow-lg container mx-auto lg:max-w-2/3 md:self-center" style="grid-area: content">
          <div class="absolute pin-t pin-r z-0" style="z-index: -10">
            <img src="img/logo-bg.svg" class="w-1/3 opacity-50 m-8 float-right">
          </div>
          <div class="font-bold text-blue flex flex-row items-center justify-start p-8 pt-16 md:pt-10">
            <img src="img/logo.svg" class="h-6 mr-4">
            Todoninja
          </div>
          <div class="m-8 font-bold text-3xl">
            Hey! LOL
            <div class="text-grey-darker text-base font-normal mt-4">
              You can use your email and password to log in!
            </div>
          </div>
          <error class="mx-8" :error="error"></error>
          <inputt name="Email" classes="pb-2 mx-8" placeholder="john.doe@domain.com" type="email" v-model="email"></inputt>
          <inputt classes="mt-4 pb-2 mx-8" name="Password" placeholder="********" type="password" v-model="password"></inputt>

          <div class="button m-8" @click="submitForm">
            Login
          </div>

          <Loader color="#45547c" class="inline-block" :loading="loading"></Loader>

        </div>

        <div class="bg-grey-lighter py-16 flex flex-row items-center justify-center self-end" style="grid-area: footer">
          Still without account? <router-link class="ml-4 link" to="/register">Create one</router-link>
        </div>

      </div>
    </div>  
  </transition>
</template>

<script>
import Page from '@/assets/js/Page';
import form from '@/assets/js/traits/form';

const t = new Page()
  .use(form)
  .actions({
    authenticate: 'auth/authenticate',
  })
  .data(() => ({
    email: '',
    password: '',
  }))
  .methods({
    submitForm() {
      this.load(() => this.authenticate({ email: this.email, password: this.password, strategy: 'local' }))
        .then(() => this.$router.push('/'))
        .catch(this.showError);
    },
  })
  .vue();

console.log(t);
export default t;
</script>
