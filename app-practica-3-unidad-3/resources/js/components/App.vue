<template>
  <v-app>
    <v-app-bar app elevation="2" color="teal lighten-3">
      <v-app-bar-title>Práctica 3 - TPI</v-app-bar-title>
      <v-spacer></v-spacer>
       <v-btn v-if="$store.state.user != null" color="red" @click="logout">Logout</v-btn>
    </v-app-bar>
      <v-main>
          <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;
export default {
  
methods: {
        logout(){
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.post("/logout").then(async response => {
                    await this.$store.dispatch('getUser');
                    this.$router.replace('/');
                });
            });
        }
    }
}
</script>

<style>

</style>