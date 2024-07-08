<script setup lang="ts">


const state = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  repeatedPassword: '',
  isLoading: false,
})

const errorMessage = reactive({
  triggered: false,
  message: ''
})

async function signIn() {
  if (state.password !== state.repeatedPassword) {
    errorMessage.triggered = true
    errorMessage.message = 'Passwords must match'
    return;
  }
  try {
    errorMessage.triggered = false
    errorMessage.message = ''
    state.isLoading = true;
    const user = $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: state.name,
        email: state.email,
        phone: state.phone,
        password: state.password
      }
    })
    if ((await user)) {
      console.log(user)
      state.isLoading = false
      navigateTo('/login')
    }
  } catch (e: any) {
    console.error(e)
    errorMessage.triggered = true
    state.isLoading = false
    errorMessage.message = e.response._data.message
  }
}


</script>

<template>
  <div class="flex justify-center items-center pt-5">
    <div
      class="shadow-xl bg-gray-50 rounded-lg px-5 py-2.5 space-y-4 h-fit w-fit flex justify-center items-center flex-col">
      <div class=" font-semibold text-2xl">
        Sign in
      </div>
      <div class="text-xl text-red-500" v-if="errorMessage.triggered">
        {{ errorMessage.message }}
      </div>
      <form>
        <div class="space-y-6">
          <div class="flex flex-col h-full">
            <input v-model="state.name" placeholder="Name"
              class="bg-gray-50 px-2 shadow-sm border-2 rounded-md py-2 border-slate-300 focus:outline-none focus:border-red-300"
              type="text" />
          </div>
          <div class="flex flex-col">
            <input v-model="state.email" placeholder="Email"
              class="bg-gray-50 px-2 shadow-sm border-2 rounded-md py-2 border-slate-300 focus:outline-none focus:border-red-300"
              type="text" />
          </div>
          <div class="flex flex-col">
            <input v-model="state.phone" placeholder="Phone Number"
              class="bg-gray-50 px-2 shadow-sm border-2 rounded-md py-2 border-slate-300 focus:outline-none focus:border-red-300"
              type="text" />
          </div>
          <div class="flex gap-20">
            <input v-model="state.password" placeholder="Password"
              class="bg-gray-50 px-2 shadow-sm border-2 rounded-md py-2 border-slate-300 focus:outline-none focus:border-red-300"
              type="password" />
            <input v-model="state.repeatedPassword" placeholder="Repeat Password"
              class="bg-gray-50 px-2 shadow-sm border-2 rounded-md py-2 border-slate-300 focus:outline-none focus:border-red-300"
              type="password" />
          </div>
          <div class="space-y-2.5">
            <div class="flex justify-center items-center px-4 py-2  rounded-lg bg-red-500 hover:bg-red-600 text-white">
              <button class="flex justify-center items-center " @click.prevent="signIn">
                <svg v-if="state.isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <span>{{ state.isLoading ? "Please wait" : "Sign In" }}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>