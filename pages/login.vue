<script setup lang="ts">
definePageMeta({
  middleware: "login"
})

//State variable to hold our form data
import { type CredentialResponse, decodeCredential } from "vue3-google-signin";
import { reloadNuxtApp } from "#app";

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
  const { credential } = response;
  const data = decodeCredential(credential)
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
    reloadNuxtApp()
  }
}


</script>


<template>
  <div class="flex justify-center items-center p-8 bg-gray-100">
    <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="w-1/2 bg-cover bg-center hidden md:block"
        style="background-image: url('/images/undraw_automobile_repair_ywci.webp');">
      </div>

      <div class="w-full md:w-1/2 p-8">
        <div class="text-2xl font-semibold mb-6">Login</div>
        <form>
          <div class="space-y-6">
            <div class="flex flex-col">
              <input v-model="authForm.username" placeholder="Username"
                class="bg-gray-50 border-b border-slate-300 focus:outline-none rounded-md focus:border-slate-600 py-2"
                type="text" />
            </div>
            <div class="flex flex-col">
              <input v-model="authForm.password" placeholder="Password"
                class="bg-gray-50 border-b border-slate-300 focus:outline-none rounded-md focus:border-slate-600 py-2"
                type="password" />
            </div>
            <div class="space-y-4">
              <button @click.prevent="login"
                class="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300">
                Log in
              </button>
              <GoogleSignInButton class="w-full" @success="handleLoginSuccess" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

