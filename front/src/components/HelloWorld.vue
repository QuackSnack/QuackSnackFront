<template>
  <v-container :class="colorClass">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 salut-caption">Salut</h1>
        <v-btn color="primary" @click="onClick"> Click here </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.salut-caption {
  color: grey;
}
.white {
  background-color: white;
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
}
.black {
  background-color: black;
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
}
</style>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    colorClass: "white",
  }),
  methods: {
    onClick() {
      if (this.colorClass == "white") {
        this.colorClass = "black";
      } else if (this.colorClass == "black") {
        this.colorClass = "white";
      }
      console.log(this.colorClass);
    },
  },
};
</script>
