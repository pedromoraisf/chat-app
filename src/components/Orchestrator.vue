<template>
  <section class="w-100 h-100 bg-dark rounded shadow">
      <b-container class="h-100" fluid>
        <b-row class="h-100 p-4">
          <!-- users list -->
          <b-col class="rounded-left shadow-lg p-0 bg-white" md="3">
            <navigation-bar
              :colorTheme="colorTheme[0]"
              :usersList="users"
            />
          </b-col>

          <!-- chat -->
          <b-col class="px-0 bg-light rounded-right pt-5" md="9">
            <chat 
              :colorTheme="colorTheme[0]"
              :messages="messages"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
</template>

<script>
import { _ } from 'vue-underscore'

import NavigationBar from '@/components/chat/NavigationBar'
import Chat from '@/components/chat/Chat'

export default {
  components: {
    NavigationBar,
    Chat
  },
  data: () => ({
    messages: [],
    colorTheme: [
      'primary',
      'success',
      'info',
      'warning',
      'danger'
    ],
    users: [
      'Pedro',
      'João',
      'Thiago',
      'Isabela',
      'José'
    ]
  }),
  sockets: {
    receiveData (data) {
      this.renderMessage(data)
    }
  },
  methods: { 
    renderMessage (messageObject) {
      this.messages = messageObject
    }
  },
  created () {
    this.colorTheme = _.shuffle(this.colorTheme)
  }
}
</script>

<style lang="scss">  
  $dimensions-icon-on: 12px;

  .icon-on {
    width: #{$dimensions-icon-on};
    height: #{$dimensions-icon-on};
  }

  .chat {
    overflow-y: scroll;
    min-height: 71vh;
    max-height: 80vh;
  }

  .chat-box {
    max-width: 400px;
    width: 100%;
    margin: 0 1rem;
  }
</style>