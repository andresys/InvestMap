<template>
  <v-dialog
    v-model="dialog"
    @keydown.esc="close"
    persistent
    scrollable
    max-width="600px"
  >
      <v-card>
        <form @submit.prevent="close">
          <v-app-bar flat color="#17aee4">
              <v-toolbar-title class="title white--text pl-0">
                  О системе
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon @click="close">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
              <template v-slot:extension>
                <v-tabs
                  v-model="tabs"
                  center-active
                  dark
                >
                  <v-tab>Информация</v-tab>
                  <v-tab>Контакты</v-tab>
                </v-tabs>
              </template>
          </v-app-bar>

          <v-tabs-items v-model="tabs" style="max-height: 300px; overflow-y: auto">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.

Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.

Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.

Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.

Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.

Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.

Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            type="submit"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </form>
      </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'About',
  data: () => ({
    dialog: false,
    tabs: null,
  }),
  computed: {},
  methods: {
    close: function () {
      this.dialog = false
      this.$router.push({name: 'Home', hash: this.$route.hash})
    },
  },
  mounted() {
    this.dialog = true;
  }
}
</script>
