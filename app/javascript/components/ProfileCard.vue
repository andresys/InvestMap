<template>
<div>
  <div v-if="!login">
    <v-divider></v-divider>
    <div class="ma-2 d-flex justify-space-around">
      <v-btn x-small tile text :to="{name: 'Login', hash: $route.hash}">Войти в систему</v-btn>
      <v-btn x-small tile text :to="{name: 'Registration', hash: $route.hash}">Регистрация</v-btn>
    </div>
    <v-divider></v-divider>
  </div>
  
  <v-card light tile class="ma-2" v-if="login">
    <v-list-item two-line class="px-2">
      <v-list-item-avatar color="primary">
        <!--v-img src="https://randomuser.me/api/portraits/men/85.jpg"></!--v-img-->
        <v-icon dark>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Кудрявцев Михаил</v-list-item-title>
        <v-list-item-subtitle>Администратор</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-list-item>
    <v-card-actions>
      <v-btn x-small tile text>Мой профиль</v-btn>
      <v-spacer></v-spacer>
      <v-btn x-small tile text>Выход</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      login: false,
    }
  },
}
</script>
