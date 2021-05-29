<template>
    <div>
        <v-container fluid>
            <v-row class="justify-center">
                <v-col cols="8">
                    <v-card>
                        <v-card-title >
                            Práctica 3 - Unidad 3 TPI
                        </v-card-title>
                        <v-card-text>
                            <v-row class="justify-center">
                                <v-col cols="4">
                                    <v-btn
                                    block
                                        v-if="$store.state.user == null"
                                        color="green"
                                        to="/login"
                                        >Iniciar sesión</v-btn
                                    >
                                </v-col>
                                <v-col cols="4">
                                    <v-btn
                                    block
                                        v-if="$store.state.user == null"
                                        color="blue"
                                        to="/register"
                                        >Registrar</v-btn
                                    >
                                    <!--<v-btn v-if="$store.state.user != null" color="red" @click="logout">Logout</v-btn>-->
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
    methods: {
        logout() {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios.post("/logout").then(async response => {
                    await this.$store.dispatch("getUser");
                });
            });
        }
    }
};
</script>

<style></style>
