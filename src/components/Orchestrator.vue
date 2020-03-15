<template>
  <b-container class="w-100 h-100" fluid>
    <loader
      :variantTheme="colorTheme[0]"
      :loaderControl="users.length"
    />
    <b-row class="h-100 p-0 p-md-4 p-lg-4 p-xl-4">
      <!-- users list -->
      <b-col class="h-100 shadow-lg p-0 bg-white" md="3">
        <navigation-bar :colorTheme="colorTheme[0]" :usersList="users" />
      </b-col>

      <!-- chat -->
      <b-col class="h-100 px-0 bg-light pt-3" md="9">
        <chat :colorTheme="colorTheme[0]" :messages="messages" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Loader from "@/components/Loader";

import { _ } from "vue-underscore";

import NavigationBar from "@/components/chat/NavigationBar";
import Chat from "@/components/chat/Chat";

export default {
  components: {
    NavigationBar,
    Chat, 
    Loader
  },
  data: () => ({
    messages: [],
    users: [],
    colorTheme: ["primary", "success", "info", "warning", "danger"]
  }),
  sockets: {
    receiveUsersList(data) {
      this.setUsers(data);
    },
    receiveData(data) {
      this.renderMessage(data);
    }
  },
  methods: {
    renderMessage(messageObject) {
      this.messages = messageObject;
    },
    setUsers(users) {
      this.users = users;
    },
    emitUserInfo(username) {
      this.$socket.emit("sendUserInfo", username);
    }
  },
  created() {
    this.colorTheme = _.shuffle(this.colorTheme);
    if (localStorage.getItem("username") !== null)
      this.emitUserInfo(localStorage.getItem("username"));
  }
};
</script>
