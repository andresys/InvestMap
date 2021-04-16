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
                  Вход в систему
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon @click="clear">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-app-bar>

          <v-card-text>
            <v-text-field
              label="E-mail адрес:"
              type="email"
              v-model="email"
              v-if="dialog"
              autofocus
              required
            ></v-text-field>
          
            <v-text-field
              label="Пароль:"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              v-model="password"
              v-if="dialog"
              required
            ></v-text-field>
      
            <small>
              <router-link :to="{name: 'LostPassword', hash: $route.hash}">Забыли пароль?</router-link>
              <br/>
              <router-link :to="{name: 'Registration', hash: $route.hash}">Пройти регистрацию</router-link>
            </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
            >
              Войти в систему
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    dialog: false,
    email: null,
    password: null,
    show: false,
  }),
  computed: {},
  methods: {
    submit: function() {
      this.dialog = false
      this.email = null
      this.password = null
      this.$router.push('/')
    },
    clear: function () {
      this.dialog = false
      this.email = null
      this.password = null
      this.$router.push({name: 'Home', hash: this.$route.hash})
    },
  },
  mounted() {
    this.dialog = true;
  }
}
</script>
