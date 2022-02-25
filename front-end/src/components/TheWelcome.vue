<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>


<script>
export default {
  methods: {
    teste() {
      // inicio para envio dos dados
      let myHeaders = new Headers();
      // myHeaders.set("content-type", "application/json");
      // myHeaders.set("Content-Length", content_to_send.length.toString());
      myHeaders.set("X-Custom-Header", "ProcessThisImmediately");
      const token = localStorage.getItem('token')
      myHeaders.set("token", token);
      let myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors', // no-cors não funcina bem.
        // body: content_to_send,
        cache: 'default' 
      };
      let myRequest = new Request('http://localhost:3003/', myInit);
      // mock_fetch(myRequest)
      fetch(myRequest)
        .then((response) => {
          var contentType = response.headers.get("content-type");
          console.log({contentType})
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
  }
}
</script>

<template>
  <h1>oi</h1>
  <button @click="teste()">teste</button>
</template>
