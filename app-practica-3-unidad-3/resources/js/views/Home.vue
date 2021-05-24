<template>
    <div>
        <v-btn v-if="$store.state.user == null" color="green" to="/login">Login</v-btn>
        <v-btn v-if="$store.state.user == null" color="blue" to="/register">Registrar</v-btn>
        <v-btn v-if="$store.state.user != null" color="red" @click="logout">Logout</v-btn>
    </div>
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
                });
            });
        }
    }
}
</script>

<style>

</style>