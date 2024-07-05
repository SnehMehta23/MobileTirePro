<script setup lang="ts">


//State variable to hold our form data
import {type CredentialResponse, decodeCredential} from "vue3-google-signin";

const authForm = reactive({
  username: "",
  password: ""
})


/**
 * Sends a login request to the API server.
 * @returns {Promise} A promise that resolves to the user object upon successful login.
 */
async function login() {
  const user = $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      email: authForm.username,
      password: authForm.password
    }
  })
  if ((await user)) {
    console.log(user)
    navigateTo('/')
  }
}

const handleLoginSuccess = async (response: CredentialResponse) => {
  const {credential} = response;
  const data =  decodeCredential(credential)
  await sendCredentialsToBackend(data)
};

const sendCredentialsToBackend = async (credentials: any) => {
  const user = $fetch('/api/auth/googleAuth', {
    method: "POST",
    body: {
      credentials
    }
  })
  if ((await user)) {
    console.log(user)
    navigateTo('/')
  }
}


</script>


<template>
  <div class="flex justify-center items-center pt-5">
    <div
        class="shadow-xl bg-gray-50 rounded-lg px-5 py-2.5 space-y-4 h-[20rem] w-[20rem] flex justify-center items-center flex-col">
      <div class=" font-semibold text-2xl">
        Login
      </div>
      <form>
        <div class="space-y-6">
          <div class=" flex flex-col">
            <input v-model="authForm.username" placeholder="Username"
                   class=" bg-gray-50 border-b border-slate-300 focus:outline-none focus:border-slate-600" type="text"/>
          </div>
          <div class="flex flex-col">
            <input v-model="authForm.password" placeholder="Password"
                   class=" bg-gray-50 border-b border-slate-300 focus:outline-none focus:border-slate-600"
                   type="password"/>
          </div>
          <div class="space-y-2.5">
            <div class="flex justify-center items-center px-4 py-2  rounded-lg bg-red-500 hover:bg-red-600 text-white">
              <button @click.prevent="login">Log in</button>
            </div>
            <GoogleSignInButton class="w-full" @success="handleLoginSuccess"/>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>