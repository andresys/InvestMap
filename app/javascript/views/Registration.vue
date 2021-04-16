<template>
  <v-dialog
    v-model="dialog"
    @keydown.esc="clear"
    persistent
    max-width="600px"
  >
    <v-card>
      <form @submit.prevent="submit">
        <v-app-bar flat color="#17aee4">
          <v-toolbar-title class="title white--text pl-0">
            Регистрация в системе
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" icon @click="clear">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-text>
          <v-text-field
            label="E-mail адрес:*"
            type="email"
            v-model="email"
            v-if="dialog"
            autofocus
            required
          ></v-text-field>
          
          <v-text-field
            label="Пароль:*"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="password"
            v-if="dialog"
            required
          ></v-text-field>
          
          <v-text-field
            label="Повторите пароль:*"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="password_repeat"
            v-if="dialog"
            required
          ></v-text-field>

          <small>
            *поля обязательные для заполнения
            <br/>
            <router-link :to="{name: 'Login', hash: this.$route.hash}">Вход в систему</router-link>
          </small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            type="submit"
          >
            Зарегистрироваться
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Registration',
  data: () => ({
    dialog: false,
    email: null,
    password: null,
    password_repeat: null,
    show1: false,
    show2: false,
  }),
  computed: {},
  methods: {
    ...mapActions('api/account', {
      createAccount: 'create', // ex. this.createAccount({title: 'Bad', body: 'Ass'})
    }),
    submit: function() {
      console.log(this.createAccount({
        email: this.email,
        password: this.password,
        password_repeat: this.password_repeat,
      }))

      this.dialog = false
      this.email = null
      this.password = null
      this.password_repeat = null
      this.$router.push({name: 'Home', hash: this.$route.hash})
    },
    clear: function () {
      this.dialog = false
      this.email = null
      this.password = null
      this.password_repeat = null
      this.$router.push({name: 'Home', hash: this.$route.hash})
    },
  },
  mounted() {
    this.dialog = true;
  }
}
</script>
