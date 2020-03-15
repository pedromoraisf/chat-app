<template>
  <div class="h-100">
    <!-- messages -->
    <b-container class="d-flex flex-column align-items-center chat">
      <div
        v-for="mes in messagesTreat"
        :key="mes.id"
        class="rounded shadow-ghost p-4 chat-box mb-5 position-relative"
        :class="mes.username !== username ? 'bg-light n-right' : 'text-right bg-white n-left'"
      >
        <strong class="mr-2">{{ mes.username }}</strong>
        <span v-html="mes.message"/>
      </div>
    </b-container>

    <!-- sender bar -->
    <div class="w-100 bg-white sender-bar d-flex align-items-center">
      <b-container class="px-5">
        <form class="row">
          <b-col cols="10" class="p-0">
            <input
              placeholder="Digite sua mensagem..."
              class="w-100 h-100 border-light form-control"
              v-model="message"
            />
          </b-col>

          <b-col cols="2" class="d-flex p-0 flex-row-reverse">
            <b-button
              type="submit"
              class="btn-lg font-weight-bold"
              :class="`shadow-${colorTheme}`"
              :disabled="username.length ? false : true"
              v-html="'Enviar'"
              :variant="colorTheme"
              @click.prevent="sendMessage()"
            />
          </b-col>
        </form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    message: ""
  }),
  props: {
    colorTheme: {
      type: String
    },
    messages: {
      type: Array
    }
  },
  methods: {
    observerLink: message => {
      let msgTest = message.split(' ');
      let msgTreat = [];

      for (const el of msgTest) {
        msgTreat.push(/http:/g.test(el) || /https:/g.test(el) || /www/g.test(el) ? `<a href="${el}" target="_blank">${el}</a>` : el)
      }

      return msgTreat.join(' ')
    },
    sendMessage() {
      if (this.username.length && this.message.length) {
        const message = this.observerLink(this.message);
        const messageObject = {
          username: this.username,
          message
        };

        this.$socket.emit("sendMessage", messageObject);

        this.message = "";
      }
    }
  },
  computed: {
    messagesTreat() {
      return this.messages.slice().reverse();
    },
    ...mapState(["username"])
  }
};
</script>

<style lang="scss" scoped>
$chat-height: 80%;

.chat {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: #{$chat-height};
  padding-top: 5rem;
}

.sender-bar {
  height: calc(100% - #{$chat-height});
}

.chat-box {
  max-width: 400px;
  width: 100%;
  margin: 0 1rem;
  word-wrap: break-word;
}

$negative-positions: 15rem;
$negative-lg-positions: 10rem;
$negative-md-positions: 3rem;

.n-left {
  left: $negative-positions;
  @media screen and (max-width: 1250px) {
    left: $negative-lg-positions;
  }
  @media screen and (max-width: 1100px) {
    left: $negative-md-positions;
  }
  @media screen and (max-width: 720px) {
    left: 0;
    right: 1rem;
  }
  @media screen and (max-width: 400px) {
    right: 0;
  }
}

.n-right {
  right: $negative-positions;
  @media screen and (max-width: 1250px) {
    right: $negative-lg-positions;
  }
  @media screen and (max-width: 1100px) {
    right: $negative-md-positions;
  }
  @media screen and (max-width: 720px) {
    right: 0;
    left: 1rem;
  }
  @media screen and (max-width: 400px) {
    left: 0;
  }
}
</style>
