<template>
<v-dialog v-model="dialog" @keydown.esc="cancel" persistent max-width="600px">
  <v-card :loading="loading">
    <v-form key="registration" @submit.prevent="submit" ref="form" v-model="isFormValid">
      <v-app-bar flat color="#17aee4">
        <v-toolbar-title class="title white--text pl-0">
          Регистрация в системе
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <v-text-field key="registration_email" label="E-mail адрес:" type="email" v-model="form.email" :rules="rules.email" autofocus required></v-text-field>

        <v-text-field key="registration_password" label="Пароль:" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" v-model="form.password" :rules="rules.password" required></v-text-field>

        <v-text-field key="registration_password_confirmation" label="Подтверждение пароля:" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" v-model="form.password_confirmation" :rules="rules.password_confirmation" required></v-text-field>

        <small>
          *все поля обязательны для заполнения
          <br />
          <router-link :to="{name: 'Login', hash: this.$route.hash}">Вход в систему</router-link>
        </small>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text type="submit" :disabled="!isFormValid" :loading="loading">
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Registration',
  data() {
    const defaultForm = Object.freeze({
      email: '',
      password: '',
      password_confirmation: '',
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
        password_confirmation: [
          val => !!val || 'требуется указать',
          val => val === this.form.password || 'не совпадают с паролем',
          val => !(val == this.ajax_errors.password_confirmation && this.error && this.error.password_confirmation) || this.error.password_confirmation.join(', '),
        ],
      },
      dialog: false,
      show1: false,
      show2: false,
      ajax_errors: {},
      defaultForm,
      loading: false,
      isFormValid: false,
    }
  },
  computed: {
    ...mapState('accountModule', {
      error: state => state.error && state.error.errors
    }),
  },
  methods: {
    ...mapActions('accountModule', {
      createAccount: 'REGISTER',
    }),
    resetForm() {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    submit: function () {
      this.loading = true
      this.createAccount({ user: this.form })
        .then(response => {
          this.loading = false
          this.resetForm()
          this.$router.push({ name: 'Home', hash: this.$route.hash })
        })
        .catch(error => {
          this.loading = false
          this.ajax_errors = Object.assign({}, this.form)
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
