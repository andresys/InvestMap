<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      width="350"
      color="#17aee4"
      dark
      absolute
      temporary
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="/assets/icon-map.png"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Инвестиционная карта</v-list-item-title>
          <v-list-item-subtitle>города Твери</v-list-item-subtitle>
        </v-list-item-content>

        <v-btn
          icon
          @click.stop="drawer = false"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <ProfileCard></ProfileCard>

      <v-list dense expand>
        <v-subheader>Объекты для инвестирования</v-subheader>
        <v-list-group v-model="items.types">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Типы объектов</v-list-item-title>
          </template>
          <v-list-item class="ml-4">
            <v-btn icon>
              <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
            <v-list-item-title>Здания и сооружения</v-list-item-title>
            <v-switch dense hide-details></v-switch>
          </v-list-item>
          <v-list-item class="ml-4">
            <v-btn icon>
              <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
            <v-list-item-title>Земельные участки</v-list-item-title>
            <v-switch dense hide-details ></v-switch>
          </v-list-item>
        </v-list-group>

        <v-subheader>Администрирование</v-subheader>
        <v-list-group v-model="items.users">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-account-group-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Пользователи системы</v-list-item-title>
          </template>
          <v-list-item class="ml-4">
            <v-text-field
              hide-details
              label="Фильтр пользователей"
              prepend-inner-icon="mdi-filter-outline"
              class="mt-1"
              outlined
              dense
              clearable
            ></v-text-field>
          </v-list-item>
          <v-list-item class="ml-4">
            <v-icon left>mdi-account</v-icon>
            <v-list-item-title>Иванов Иван</v-list-item-title>
            <v-btn icon>
              <v-icon dense>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item class="ml-4">
            <v-icon left>mdi-account</v-icon>
            <v-list-item-title>Петров Петр</v-list-item-title>
            <v-btn icon>
              <v-icon dense>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>
        <v-list-item :to="{name: 'News', hash: this.$route.hash}">
          <v-list-item-icon>
            <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Новости проекта</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'About', hash: $route.hash}">
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>О системе</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <invest-map @panel="drawer = !drawer"></invest-map>
      <div class="main-container">
        <router-view/>
      </div>
    </v-main>
  </v-app>  
</template>

<script>
import InvestMap from 'components/InvestMap'
import ProfileCard from 'components/ProfileCard'

export default {
  components: {
    InvestMap,
    ProfileCard,
  },
  data: () => ({
    drawer: false,
    sheet: false,
    items: {
      types: true,
      users: true,
    },
  }),
}
</script>