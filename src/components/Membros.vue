<template>
<v-card
    max-width="450"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
      dense
    >
      

      <v-toolbar-title>Membros</v-toolbar-title>

      <v-spacer></v-spacer>

         <v-text-field
         
            hide-details
            label="Pesquisar"
            append-icon="mdi-magnify"
            single-line
        
          ></v-text-field>
    </v-toolbar>

    <v-list two-line>
      <template v-for="(membro, index) in membros">
        

        <v-divider
          
          :key="index"
          :inset="true"
        ></v-divider>

        <v-list-item
          :key="membro.name.first"
        >
          <v-list-item-avatar size="50">
            <v-img :src="membro.picture.thumbnail"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{`${membro.name.title}. ${membro.name.first} ${membro.name.last} `}}</v-list-item-title>
            <v-list-item-subtitle >{{`Email: ${membro.email} | Sexo: ${membro.gender}`}}</v-list-item-subtitle>
             <v-list-item-subtitle >{{`País: ${membro.location.country} | Cidade: ${membro.location.city}`}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>

import api from "../services/api"

export default {
    name: "Membros",
    
    data (){
        return {
            membros: [] 
        }
    },

    created() {
    api.get("api", {
      params: {
        seed: "abc",
        page: 1,
        results: 10
      }
    }).then(resposta => {
      console.log(resposta.data.results)
      this.membros = resposta.data.results
    
    })
  }
    
    
}
</script>

<style>

</style>