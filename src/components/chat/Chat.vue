<template>
  <div class="d-flex flex-column justify-content-between h-100">
    <b-container class="h-100 d-flex flex-column chat">
      <!-- messages -->
      <div v-for="mes in messagesTreat" :key="mes.id" class="w-100 d-flex mb-3" :class="mes.username !== username ? '' : 'flex-row-reverse'">
        <div class="rounded shadow-ghost p-4 chat-box" :class="mes.username !== username ? 'bg-light' : 'text-right bg-white'">
          <strong class="mr-2">{{ mes.username }}</strong>
          <span>{{ mes.message }}</span>
        </div>
      </div>
    </b-container>

    <!-- sender bar -->
    <div class="w-100 bg-white" style="height: 100px;">
      <b-container class="py-4 px-5">
        <form class="row">
          <b-col cols="8" class="p-0">
            <input
              placeholder="Digite sua mensagem..."
              class="w-100 h-100 border-light form-control"
              v-model="message"
            />
          </b-col>

          <b-col cols="4" class="d-flex p-0 flex-row-reverse">
            <b-button
              type="submit"
              class="rounded-0 btn-lg font-weight-bold"
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
import { mapState } from 'vuex'

export default {
  data: () => ({
    message: ''
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
    sendMessage () {
      if (this.username.length && this.message.length) {
        let messageObject = {
          username: this.username, 
          message: this.message
        }

        this.$socket.emit('sendMessage', messageObject)

        this.message = ''
      }

    }
  }, 
  computed: {
    messagesTreat () {
      return this.messages.slice().reverse()
    },
    ...mapState([
      'username'
    ])
  }
};
</script>
