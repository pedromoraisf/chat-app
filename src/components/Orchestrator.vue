<template>
  <b-container class="w-100 h-100" fluid>
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
import { _ } from "vue-underscore";

import NavigationBar from "@/components/chat/NavigationBar";
import Chat from "@/components/chat/Chat";

export default {
  components: {
    NavigationBar,
    Chat
  },
  data: () => ({
    messages: [],
    colorTheme: ["primary", "success", "info", "warning", "danger"],
    users: ["Pedro", "João", "Thiago", "Isabela", "José"]
  }),
  sockets: {
    receiveData(data) {
      this.renderMessage(data);
    }
  },
  methods: {
    renderMessage(messageObject) {
      this.messages = messageObject;
    }
  },
  created() {
    this.colorTheme = _.shuffle(this.colorTheme);
  }
};
</script>
