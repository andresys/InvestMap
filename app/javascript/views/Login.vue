<template>
<v-dialog v-model="dialog" @keydown.esc="cancel" persistent max-width="600px">
  <v-card :loading="loading">
    <v-form key="login" @submit.prevent="submit" ref="form" v-model="isFormValid">
      <v-app-bar flat color="#17aee4">
        <v-toolbar-title class="title white--text pl-0">
          Вход в систему
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <v-alert dense border="left" type="error" color="orange" dismissible v-if="error" v-model="alert">
          {{error}}
        </v-alert>

        <v-text-field key="login_email" label="E-mail адрес:" type="email" v-model="form.email" :rules="rules.email" autofocus required></v-text-field>

        <v-text-field key="login_password" label="Пароль:" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" v-model="form.password" :rules="rules.password" required></v-text-field>

        <small>
          <router-link :to="{name: 'LostPassword', hash: $route.hash}">Забыли пароль?</router-link>
          <br />
          <router-link :to="{name: 'Registration', hash: $route.hash}">Пройти регистрацию</router-link>
        </small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text type="submit" :disabled="!isFormValid" :loading="loading">
          Войти в систему
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    const defaultForm = Object.freeze({
      email: '',
      password: '',
    })

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        email: [
          val => !!val || 'требуется указать',
          val => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return (val || '').length > 3 && re.test(String(val).toLowerCase()) || 'должен быть правильным'
          },
          val => !(val == this.ajax_errors.email && this.error && this.error.email) || this.error.email.join(', '),
        ],
        password: [
          val => !!val || 'требуется указать',
          val => (val && val.length >= 6) || 'слишком короткий (минимальная длина пароля 6 символов)',
          val => !(val == this.ajax_errors.password && this.error && this.error.password) || this.error.password.join(', '),
        ],
      },
      dialog: false,
      show: false,
      ajax_errors: {},
      defaultForm,
      loading: false,
      isFormValid: false,
      alert: false,
    }
  },
  computed: {
    ...mapState('accountModule', {
      // currentAccount: state => state.account,
      error: state => state.error && state.error.error
    }),
  },
  methods: {
    ...mapActions('accountModule', {
      login: 'LOGIN',
    }),
    resetForm() {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    submit: function () {
      this.loading = true
      this.login({ user: this.form })
        .then(response => {
          this.loading = false
          this.resetForm()
          this.$router.push({ name: 'Home', hash: this.$route.hash })
        })
        .catch(error => {
          this.loading = false
          this.ajax_errors = Object.assign({}, this.form)
          this.alert = true
          this.$refs.form.validate()
        })
    },
    cancel: function () {
      this.loading = false
      this.resetForm()
      this.$router.push({ name: 'Home', hash: this.$route.hash })
    },
  },
  mounted() {
    this.dialog = true
  }
}
</script>
