<template>
  <v-card max-width="450" class="mx-auto">
    <v-toolbar color="cyan" dark dense class="d-flex justify-center">
      <v-toolbar-title class="pr-4">Membros</v-toolbar-title>

      <v-row class="pr-15" justify="center">
        <v-dialog v-model="dialog" persistent max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark small color="indigo" v-bind="attrs" v-on="on">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-toolbar class="d-flex justify-center" color="cyan" dark dense
              ><h3>Adicionar Membro</h3></v-toolbar
            >

            <v-card-text>
              <v-container>
                <v-snackbar
                  v-model="error"
                  timeout="1000"
                  color="red"
                  min-width="100"
                  absolute
                  bottom
                  rounded="pill"
                >
                  Preencha os campos!
                </v-snackbar>
                <v-row>
                  <v-col cols="12" sm="7" md="12">
                    <v-text-field
                      prepend-icon="mdi-account"
                      v-model="nome"
                      label="Nome*"
                      required
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="mdi-email"
                      v-model="email"
                      label="Email*"
                      required
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="mdi-key"
                      v-model="pass"
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="green darken-1" text @click="addMembro()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-text-field
        v-model="pesquisar"
        class="pes ml-5"
        hide-details
        label="Pesquisar"
        append-icon="mdi-magnify"
        single-line
      ></v-text-field>
    </v-toolbar>

    <v-list two-line>
      <template v-for="(membro, index) in buscarMembro()">
        <v-divider :key="index" :inset="true"></v-divider>

        <v-list-item :key="membro.name">
          <v-list-item-avatar size="50">
            <v-icon x-large> mdi-account </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ `${membro.name}` }}</v-list-item-title>
            <v-list-item-subtitle>{{
              `Email: ${membro.email}`
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            @click="excluirMembro(membro._id)"
            class="mx-2"
            fab
            dark
            small
            color="red"
          >
            <v-icon dark> mdi-minus </v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-list>

    <v-progress-linear
      v-if="loading"
      color="deep-purple accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>

    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="success"
      min-width="100"
      absolute
      centered
      rounded="pill"
    >
      Adicionado com sucesso!
    </v-snackbar>
  </v-card>
</template>

<script>
import api from "../services/api";

export default {
  name: "Membros",

  data() {
    return {
      error: false,
      snackbar: false,
      loading: true,
      nome: "",
      email: "",
      pass: "",
      dialog: false,
      membros: [],
      pesquisar: "",
    };
  },

  created() {
    this.listarMembro();
  },
  methods: {
    excluirMembro(index) {
      this.loading = true;
      api
        .delete("/members/" + index)
        .then((response) => {
          console.log(response);
          this.listarMembro();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listarMembro() {
      api
        .get("members", {
          params: {
            //   seed: "abc",
            //   page: 1,
          },
        })
        .then((resposta) => {
          console.log(resposta.data.result);
          this.membros = resposta.data.result;
          this.loading = false;
        });
    },
    buscarMembro() {
      return this.membros.filter(
        (membro) =>
          membro.name.toLowerCase().indexOf(this.pesquisar.toLowerCase()) > -1
      );
    },
    addMembro() {
      if (
        this.nome.trim() === "" ||
        this.email.trim() === "" ||
        this.pass.trim() === ""
      ) {
        this.error = true;
        return;
      }

      this.loading = true;
      api
        .post("/members", {
          name: this.nome,
          email: this.email,
          password: this.pass,
        })
        .then((response) => {
          console.log(response);
          this.listarMembro();
          this.dialog = false;
          this.snackbar = true;

          this.nome = "";
          this.email = "";
          this.pass = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.pes {
  width: 200px;
}
</style>