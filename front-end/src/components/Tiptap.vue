<template>
<div class="container">
  <editor-content :editor="editor" />
  <div class="d-flex flex-row-reverse">
    <div class="p-2">
      <button class="btn btn-primary" @click="send()">Enviar</button>
    </div>
    <div class="p-2">
      <button class="btn btn-primary" @click="recover()">Recuperar</button>
    </div>
  </div>
  
</div>
</template>


<script>

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

function get_tiptap_data() {
  console.log("Enviando")
  console.log(this.editor)
}

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },


  methods: {
    recover() {
      alert("Comando ainda não disponível")
    },
    send() {
      // inicio para envio dos dados
      const content_to_send = this.editor.getJSON()
      const content_to_send_as_string = JSON.stringify(content_to_send)
      console.log("Conteudo em json")
      console.log(content_to_send)
      let myHeaders = new Headers();
      myHeaders.set("content-type", "application/json");
      myHeaders.set("Content-Length", content_to_send_as_string.length.toString());
      myHeaders.set("X-Custom-Header", "ProcessThisImmediately");
      const token = localStorage.getItem('token')
      myHeaders.set("token", token);
      let myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors', // no-cors não funcina bem.
        body: content_to_send_as_string,
        cache: 'default' 
      };
      let myRequest = new Request('http://localhost:3003/api/send_notebook', myInit);
      // mock_fetch(myRequest)
      fetch(myRequest)
        .then((response) => {
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((json) => {
              console.log({json})
              // https://router.vuejs.org/guide/#javascript
            });
          } else {
          }
      });
      // fim do envio dos dados
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '', // <p>I’m running Tiptap with Vue.js. 🎉</p>
      extensions: [
        StarterKit,
      ],
      editorProps : {
        attributes : {
          class: 'tiptap-component'
        }
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>


<style>
.tiptap-component {
  border-width: thin;
  border: 0px;
  min-height: 300px;
  background-color: rgb(224, 220, 220);
  padding: 15px 10px;
  /* line-height: 20px; */
  /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
  font-family: cursive;
}

.tiptap-component ul li {
  margin-bottom: 0px;
  padding: 0px;
}

.tiptap-component > p {
  margin-bottom: 10px;
  text-align: justify;
}

.tiptap-component:focus {
  outline: 10px;
}
</style>