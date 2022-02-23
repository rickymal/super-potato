<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
</script>


<script>
export default {
  methods : {
    make_submition(event) {
      event.preventDefault()

      console.log('iniciando a submissão','oi')
      const email = this.email_description
      const password = this.password_description

      let myHeaders = new Headers();


      var content_to_send = JSON.stringify({
        email, password
      });
        

      myHeaders.set("content-type", "application/json");
      myHeaders.set("Content-Length", content_to_send.length.toString());
      myHeaders.set("X-Custom-Header", "ProcessThisImmediately");

      console.log()
      let myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors', // no-cors não funcina bem.
        body: content_to_send,
        cache: 'default' 
      };
      

      let myRequest = new Request('http://localhost:3003/login', myInit);
      fetch(myRequest)
        .then(function(response) {



          var contentType = response.headers.get("content-type");
          console.log({contentType})
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((json) => {
              localStorage.setItem('token',json.hash)
              this.$router.push("/")
              // https://router.vuejs.org/guide/#javascript
            });
          } else {

          }
        });
    }
  }
}

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
        <label for="input_password_01" class="form-label">Password</label>
        <input type="password" class="form-control" id="input_password_01" :value="input_password" @input="event => password_description = event.target.value">
      </div>
      <!-- <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="input_checkbox_01">
        <label class="form-check-label" for="input_checkbox_01">Login automático</label>
      </div> -->
      <button @click = "make_submition" type="submit" class="btn btn-primary">Realizar login</button>
    </form>
  </main>
</template>


<style>

form.frm-login {
  padding: 0 10rem;
}



</style>