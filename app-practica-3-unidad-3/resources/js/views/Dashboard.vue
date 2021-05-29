<template>
    <div>
        <v-container fluid>
            <v-row class="justify-center">
                <v-col cols="8">
                    <v-card>
                        <v-card-title>
                            Registrar Venta
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-select
                                        label="Productos"
                                        :items="productos"
                                        item-text="nombre"
                                        return-object
                                        v-model="productosComprados"
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="Cantidad"
                                        v-model="cantidad"
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-select
                                        label="Método de Pago"
                                        :items="metodosDePago"
                                        v-model="pago"
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                        label="Método de Envío"
                                        :items="metodosDeEnvio"
                                        v-model="envio"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Dirección"
                                        v-model="direccion"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        label="Total"
                                        prefix="$"
                                        v-model="precio"
                                        disabled
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-row>
                                <v-col justify="end">
                                    <v-btn
                                        color="red"
                                        outlined
                                        @click="cancelar"
                                    >
                                        Cancelar
                                    </v-btn>
                                    <v-btn
                                        color="primary"
                                        outlined
                                        @click="guardar"
                                    >
                                        Guardar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" timeout="2000" color="green">
            Éxito

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="black"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data: () => ({
        productos: [],
        productosComprados: {},
        metodosDePago: [],
        metodosDeEnvio: [],
        pago: 0,
        envio: "",
        direccion: "",
        cantidad: 0,
        precio: 0.0,
        snackbar: false
    }),
    methods: {
        guardar() {
            let venta = {
                user_id: this.$store.state.user.id,
                producto_id: this.productosComprados.id,
                cantidad: this.cantidad,
                total: this.precio,
                metodo_de_pago: this.pago,
                metodo_de_envio: this.envio,
                direccion: this.direccion
            };
            console.log(venta);
            axios.post("/api/venta/", venta).then(() => {
                this.snackbar = true;
                this.productosComprados = {};
                this.metodosDePago = [];
                this.metodosDeEnvio = [];
                this.pago = 0;
                this.envio = "";
                this.direccion = "";
                this.cantidad = 0;
                this.precio = 0;
            });
        },
        cancelar() {
            this.productosComprados = {};
            this.metodosDePago = [];
            this.metodosDeEnvio = [];
            this.pago = 0;
            this.envio = "";
            this.direccion = "";
            this.cantidad = 0;
            this.precio = 0;
        },
        cargarProductos() {
            axios.get("../../../api/producto").then(res => {
                this.productos = res.data;
                console.log(this.productos);
            });
        },
    },
    mounted() {
        this.metodosDePago = [
            "Tarjeta de crédito",
            "Tarjeta de débito",
            "Efectivo"
        ];
        this.metodosDeEnvio = [
            "Retirar en tienda",
            "Uber Eats",
            "Pedidos Ya!",
            "Hugo"
        ];
        this.cargarProductos();
    },
    watch: {
        cantidad: function() {
            this.precio = this.productosComprados.precio * this.cantidad;
        }
    }
};
</script>

<style lang="scss" scoped></style>
