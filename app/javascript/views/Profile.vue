<template>
<v-dialog v-model="dialog" @keydown.esc="close" persistent scrollable max-width="600px">
  <v-card>
    <form @submit.prevent="close">
      <v-app-bar flat color="#17aee4">
        <v-toolbar-title class="title white--text pl-0">
          Мой профиль
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <v-card class="pt-6 mx-auto" flat>
          <v-card-text>
            <v-avatar size="88">
              <v-img src="https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban" class="mb-6"></v-img>
            </v-avatar>
            <h3 class="headline mb-2">
              Leanne Graham
            </h3>
            <div class="blue--text mb-2">
              Sincere@april.biz
            </div>
            <div class="blue--text subheading font-weight-bold">
              Bret
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-row class="text-left" tag="v-card-text">
            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
              Company:
            </v-col>
            <v-col>Romaguera-Crona</v-col>
            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
              Website:
            </v-col>
            <v-col>
              <a href="//hildegard.org" target="_blank">hildegard.org</a>
            </v-col>
            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
              Phone:
            </v-col>
            <v-col>1-770-736-8031 x56442</v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text type="submit">
          Закрыть
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    dialog: false,
    tabs: null,
  }),
  computed: {},
  methods: {
    close: function () {
      this.dialog = false
      this.$router.push({ name: 'Home', hash: this.$route.hash })
    },
  },
  mounted() {
    this.dialog = true;
  }
}
</script>
