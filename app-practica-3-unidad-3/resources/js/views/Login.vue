<template>
  <div>
      <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
              <v-card>
                  <v-card-title>Log in</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="user.email" label="email"></v-text-field>
                        <v-text-field v-model="user.password" label="password" type="password"></v-text-field>
                    </v-form>
                    <v-btn block color="green" @click="login">Log in</v-btn>
                    <v-divider></v-divider>
                    <span>create account</span> 
                    <v-btn small to="/register" color="blue">Sign up</v-btn>
                </v-card-text>
                </v-card>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

export default {
    data: () => ({
        user: {
            email: '',
            password: '',
        }
    }),
    methods: {
        login(){
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post('/login', this.user).then(async response => {
                    await this.$store.dispatch('auth/getUser');
                    this.$router.replace('/dashboard');
                });
            });
        }
    },
}
</script>

<style>

</style>