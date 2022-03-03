<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import router from '../router'
import HelloWorld from "@/components/HelloWorld.vue";
</script>
<template>
  <main>
    <form class="frm-login">
      <div class="mb-3">
        <label for="input_email_01" class="form-label">Endereço de e-mail</label>
        <input type="email" class="form-control" id="input_email_01" aria-describedby="email_description" :value="input_email" @input="event => email_description = event.target.value">
        <div id="email_description" class="form-text">A senha não será compartilhada, não se preocupe.</div>
      </div>
      <div class="mb-3">
        <label for="input_password_01" class="form-label">Senha</label>
        <input type="password" class="form-control" id="input_password_01" :value="input_password" @input="event => password_description = event.target.value">
      </div>
      <button @click = "make_submition" type="submit" class="btn btn-primary">Realizar login</button>
    </form>
  </main>
</template>
<script>
export default {
  methods : {
    make_submition(event) {
      event.preventDefault()
      console.log({ this : this})
      const email = this.email_description
      const password = this.password_description
      var content_to_send = JSON.stringify({
        email, password
      });
      // inicio para envio dos dados
      let myHeaders = new Headers();
      myHeaders.set("content-type", "application/json");
      myHeaders.set("Content-Length", content_to_send.length.toString());
      myHeaders.set("X-Custom-Header", "ProcessThisImmediately");
      // Para um login, o token presente no servidor é desnecessário
      // const token = localStorage.getItem('token')
      const token = null
      // myHeaders.set("token", token);
      let myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors', // no-cors não funcina bem.
        body: content_to_send,
        cache: 'default' 
      };
      let myRequest = new Request('http://localhost:3003/login', myInit);
      // mock_fetch(myRequest)
      fetch(myRequest)
        .then((response) => {
          var contentType = response.headers.get("content-type");
          console.log({contentType})
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((json) => {
              localStorage.setItem('token',json.hash)
              if (response.status == 200) {
                this.$router.push("/")
              } else {
                alert("Errou a senha mi compadre")
              }
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
<style>
form.frm-login {
  padding: 0 10rem;
}
</style>