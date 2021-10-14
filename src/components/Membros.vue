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
            <v-toolbar class="d-flex justify-space-between" color="cyan" dark
              >Adicionar Membro</v-toolbar
            >

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="7" md="9">
                    <v-text-field v-model="nome" label="Nome*" required></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="email" label="Email*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="addMembro()">
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
            <v-icon>fas fa-search</v-icon>
            <v-img src="../assets/account.svg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ `${membro.name}` }}</v-list-item-title>
            <v-list-item-subtitle>{{
              `Email: ${membro.email}`
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import api from "../services/api";

export default {
  name: "Membros",

  data() {
    return {
      nome: '',
      email: '',
      pass: '',
      dialog: false,
      membros: [],
      pesquisar: "",
    };
  },

  created() {
    this.listarMembro();
  },
  methods: {
    listarMembro(){
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
      });
    },
    buscarMembro() {
      return this.membros.filter(
        (membro) => membro.name.toLowerCase().indexOf(this.pesquisar.toLowerCase()) > -1
      );
    },
    addMembro() {
      api
        .post("/members", {
          name: this.nome,
          email: this.email,
          password: this.pass,
        })
        .then((response) => {
          console.log(response);
          this.listarMembro();
        })
        .catch(function (error) {
          console.log(error);
        });
       this.dialog = false
       
        
    },
  },
};
</script>

<style>
.pes {
  
  width: 200px;
}
</style>