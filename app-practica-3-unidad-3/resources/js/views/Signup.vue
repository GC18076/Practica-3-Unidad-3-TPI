<template>
  <div>
      <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
              <v-card>
                  <v-card-title>Sign up</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="user.name" label="Name"></v-text-field>
                        <v-text-field v-model="user.email" label="email"></v-text-field>
                        <v-text-field v-model="user.password" label="password" type="password"></v-text-field>
                        <v-text-field v-model="user.password_confirmation" label="Confirm password" type="password"></v-text-field>
                    </v-form>
                    <v-btn block color="green" @click="signup">Sign up</v-btn>
                    <v-divider></v-divider>
                    <span>do you have account?</span> 
                    <v-btn small to="/login" color="blue">Log in</v-btn>
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
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    }),
    methods: {
        signup(){
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post('/register', this.user).then(async response => {
                    await this.$store.dispatch('getUser');
                    this.$router.replace('/dashboard');
                });
            });
        }
    },
}
</script>

<style>

</style>