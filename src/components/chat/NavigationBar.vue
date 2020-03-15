<template>
  <div class="h-100">
    <!-- "logo" -->
    <div class="w-100 p-4 logo d-flex align-items-center" :class="`bg-${colorTheme}`">
      <h1 class="display-4 text-uppercase text-white font-weight-bolder" v-html="'chat do pedrão'" />
    </div>

    <!-- set name -->
    <div class="w-100 set-name bg-white px-5 d-flex align-items-center">
      <form class="row">
        <b-col cols="8" class="p-0">
          <input
            id="username"
            class="form-control border-light"
            placeholder="Insira seu nome de exibição"
            v-model="username"
          />
        </b-col>

        <b-col cols="4" class="p-0 text-right">
          <b-button
            type="submit"
            class="font-weight-bold"
            v-html="usernameStore.length ? 'Mudar' : 'Ok'"
            :variant="usernameStore.length ? 'light' : colorTheme"
            @click.prevent="changeUsername()"
          />
        </b-col>
      </form>
    </div>

    <!-- users list -->
    <div class="w-100 bg-dark p-4 users-list" :class="`text-${colorTheme}`">
      <h4 v-html="'Usuários conectados'" class="mb-4" />
      <div v-if="usersList.length" class="w-100">
        <p
          v-for="users in usersList"
          :key="users.id"
          class="text-secondary mb-0 d-flex align-items-center mx-2"
          v-html="`<div class='icon-status bg-success mr-2 rounded-circle shadow'></div>${users.username}`"
        />
      </div>
      <div v-else-if="!usersList.length">
        <p
          v-show="!usersList.length"
          class="text-secondary mb-0 d-flex align-items-center"
          v-html="'Nenhum usuário conectado'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    username:
      localStorage.getItem("username") !== null
        ? localStorage.getItem("username")
        : ""
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
    observerUsername() {
      if (localStorage.getItem("username") !== null)
        this.$store.dispatch("commitUsername", this.username);
    },
    changeUsername() {
      localStorage.setItem("username", this.username);
      this.commitUsername(this.username);
    },
    ...mapActions(["commitUsername"])
  },
  computed: {
    ...mapState({
      usernameStore: "username"
    })
  },
  mounted() {
    this.observerUsername();
  }
};
</script>

<style lang="scss">
$logo-height: 30%;
$set-name-height: 15%;
$dimensions-icon-on: 12px;

.icon-status {
  width: #{$dimensions-icon-on};
  height: #{$dimensions-icon-on};
}

.logo {
  min-height: 200px;
  height: #{$logo-height};
}

.set-name {
  min-height: 100px;
  height: #{$set-name-height};
}

.users-list {
  min-height: 300px;
  height: calc(100% - (#{$logo-height} + #{$set-name-height}));
}
</style>
