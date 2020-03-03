<template>
  <div>
    <!-- "logo" -->
    <div class="w-100 p-4" :class="`bg-${colorTheme}`">
      <h1 class="display-4 text-uppercase text-white font-weight-bolder" v-html="'chat do pedrão'" />
    </div>

    <!-- set name -->
    <div class="w-100 bg-white px-5 py-4">
      <div>
        <form class="row">
          <b-col cols="8" class="p-0">
            <input
              id="username"
              class="rounded-0 form-control border-light"
              placeholder="Insira seu nome de exibição"
              v-model="username"
            />
          </b-col>

          <b-col cols="4" class="p-0">
            <b-button
              type="submit"
              class="rounded-0 btn-block font-weight-bold"
              :class="usernameStore.length ? 'shadow' : `shadow-${colorTheme}`"
              v-html="usernameStore.length ? 'Mudar' : 'Ok'"
              :variant="usernameStore.length ? 'light' : colorTheme"
              @click.prevent="changeUsername()"
            />
          </b-col>
        </form>
      </div>
    </div>

    <!-- users list -->
    <!-- <div class="w-100 bg-dark p-5" :class="`text-${colorTheme}`">
      <h4 v-html="'Usuários conectados'" class="mb-4" />

      <div>
        <div v-for="u in usersList" :key="u.id" class="d-flex align-items-center mb-3">
          <div class="bg-success rounded-circle icon-on mr-2 shadow-success" />
          <p class="text-light mb-0" v-html="`${u}`" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : ''
  }),
  props: {
    colorTheme: {
      type: String
    }, 
    usersList: {
      type: Array
    }
  }, 
  methods: {
    observerUsername () {
      if (localStorage.getItem('username') !== null)
        this.$store.dispatch('commitUsername', this.username)
    },
    changeUsername () { 
      localStorage.setItem('username', this.username)
      this.$store.dispatch('commitUsername', this.username)
    },
    ...mapActions([
      'commitUsername'
    ])
  }, 
  computed: {
    ...mapState({
      usernameStore: 'username'
    })
  }, 
  mounted () {
    this.observerUsername()
  }
}
</script>
