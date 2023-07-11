<template>
  <div
  id="e3"
  style="max-width: 400px; margin: auto;"
  class="grey lighten-3"
  >
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
            <v-card target="_blank" :color="color" class="white--text">
              <v-layout row>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{name}}</div>
                      <div>{{genre}}</div>
                      <div>{{authorName}}</div>
                      <div>{{authorAge}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                Rate this book
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ['name', 'genre','authorName', 'authorAge', 'color']
}
</script>