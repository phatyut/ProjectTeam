
<template>
  <div
    class="h-screen w-full z-20 fixed top-0 left-0 bg-slate-100
           flex items-center justify-center
           px-4 py-8"
  >

    <!-- Signup Card -->
    <div
      class="w-full max-w-2xl
             bg-white
             rounded-3xl
             shadow-2xl shadow-slate-300/40
             p-6 sm:p-8 lg:p-10"
    >

      <!-- Header -->
      <div class="mb-8">

        <div class="flex items-center gap-3 mb-5">

          <div
            class="w-11 h-11
                   rounded-xl
                   bg-green-100
                   text-green-700
                   flex items-center justify-center
                   text-xl"
          >
            💻
          </div>

          <div>
            <h1 class="font-bold text-slate-800">
              Micro Computer
            </h1>

            <p class="text-xs text-slate-400">
              Computer & Technology Store
            </p>
          </div>

        </div>


        <h2
          class="text-3xl font-bold
                 text-slate-800"
        >
          Create an account
        </h2>

        <p class="mt-2 text-sm text-slate-500">
          Join us today and start shopping.
        </p>

      </div>


      <!-- ================= FORM ================= -->
      <form
        @submit.prevent="handleSignup"
        class="space-y-5"
      >

        <!-- ================= USERNAME ================= -->
        <div>

          <label
            for="username"
            class="block
                   text-sm font-semibold
                   text-slate-700
                   mb-2"
          >
            Username
          </label>

          <div class="relative">

            <span
              class="absolute
                     left-4 top-1/2
                     -translate-y-1/2
                     text-slate-400"
            >
              👤
            </span>

            <input
              id="username"
              v-model="form.userName"
              type="text"
              placeholder="Enter your username"
              required
              class="w-full h-12
                     pl-11 pr-4
                     rounded-xl
                     border border-slate-200
                     bg-slate-50
                     outline-none
                     text-sm
                     transition
                     focus:bg-white
                     focus:border-green-500
                     focus:ring-4
                     focus:ring-green-500/10"
            />

          </div>

        </div>


        <!-- ================= EMAIL ================= -->
        <div>

          <label
            for="email"
            class="block
                   text-sm font-semibold
                   text-slate-700
                   mb-2"
          >
            Email address
          </label>

          <div class="flex gap-3">

            <!-- Email -->
            <div class="relative flex-1">

              <span
                class="absolute
                       left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              >
                ✉️
              </span>

              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="example@email.com"
                required
                class="w-full h-12
                       pl-11 pr-4
                       rounded-xl
                       border border-slate-200
                       bg-slate-50
                       outline-none
                       text-sm
                       transition
                       focus:bg-white
                       focus:border-green-500
                       focus:ring-4
                       focus:ring-green-500/10"
              />

            </div>


            <!-- Verify -->
            <button
              type="button"
              @click="verifyEmail"
              :disabled="emailVerified || verifyingEmail"
              class="h-12 px-6
                     rounded-xl
                     font-semibold
                     text-sm
                     whitespace-nowrap
                     transition"
              :class="
                emailVerified
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-700 text-white hover:bg-green-800'
              "
            >
              {{
                emailVerified
                  ? '✓ Verified'
                  : verifyingEmail
                    ? 'Verifying...'
                    : 'Verify'
              }}
            </button>

          </div>

        </div>


        <!-- ================= PASSWORD ROW ================= -->
        <div
          class="grid
                 grid-cols-1
                 sm:grid-cols-2
                 gap-4"
        >

          <!-- Password -->
          <div>

            <label
              for="password"
              class="block
                     text-sm font-semibold
                     text-slate-700
                     mb-2"
            >
              Password
            </label>

            <div class="relative">

              <span
                class="absolute
                       left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              >
                🔒
              </span>

              <input
                id="password"
                v-model="form.password"
                :type="
                  showPassword
                    ? 'text'
                    : 'password'
                "
                placeholder="Password"
                required
                minlength="6"
                :disabled="!emailVerified"
                class="w-full h-12
                       pl-11 pr-11
                       rounded-xl
                       border
                       outline-none
                       text-sm
                       transition"
                :class="
                  !emailVerified
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                "
              />

              <button
                type="button"
                :disabled="!emailVerified"
                @click="
                  showPassword =
                    !showPassword
                "
                class="absolute
                       right-3 top-1/2
                       -translate-y-1/2
                       text-slate-400
                       disabled:opacity-40"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>

            </div>

          </div>


          <!-- Confirm Password -->
          <div>

            <label
              for="confirmPassword"
              class="block
                     text-sm font-semibold
                     text-slate-700
                     mb-2"
            >
              Confirm password
            </label>

            <div class="relative">

              <span
                class="absolute
                       left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              >
                🔐
              </span>

              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                "
                placeholder="Confirm password"
                required
                :disabled="!emailVerified"
                class="w-full h-12
                       pl-11 pr-11
                       rounded-xl
                       border
                       outline-none
                       text-sm
                       transition"
                :class="
                  !emailVerified
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                "
              />

              <button
                type="button"
                :disabled="!emailVerified"
                @click="
                  showConfirmPassword =
                    !showConfirmPassword
                "
                class="absolute
                       right-3 top-1/2
                       -translate-y-1/2
                       text-slate-400
                       disabled:opacity-40"
              >
                {{
                  showConfirmPassword
                    ? '🙈'
                    : '👁️'
                }}
              </button>

            </div>

          </div>

        </div>


        <!-- ================= TERMS ================= -->
        <div
          class="flex items-start gap-3
                 rounded-xl
                 bg-slate-50
                 border border-slate-100
                 p-4"
        >

          <input
            id="terms"
            v-model="form.terms"
            type="checkbox"
            required
            :disabled="!emailVerified"
            class="mt-1
                   w-4 h-4
                   accent-green-600
                   disabled:opacity-40"
          />

          <label
            for="terms"
            class="text-sm
                   text-slate-500
                   leading-5"
          >
            I agree to the

            <span
              class="font-semibold
                     text-green-600"
            >
              Terms & Conditions
            </span>

            and

            <span
              class="font-semibold
                     text-green-600"
            >
              Privacy Policy
            </span>.
          </label>

        </div>


        <!-- ================= ERROR ================= -->
        <div
          v-if="errorMessage"
          class="rounded-xl
                 bg-red-50
                 border border-red-100
                 px-4 py-3
                 text-sm text-red-600"
        >
          {{ errorMessage }}
        </div>


        <!-- ================= CREATE ACCOUNT ================= -->
        <button
          type="submit"
          :disabled="!emailVerified"
          class="w-full h-12
                 rounded-xl
                 font-semibold
                 text-sm
                 flex items-center
                 justify-center gap-2
                 transition-all"
          :class="
            emailVerified
              ? 'bg-gradient-to-r from-green-800 via-green-700 to-green-500 text-white shadow-lg shadow-green-700/20 hover:-translate-y-0.5'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          "
        >
          {{
            emailVerified
              ? 'Create Account'
              : 'Verify Email First'
          }}

          <span v-if="emailVerified">
            →
          </span>

        </button>


        <!-- ================= LOGIN ================= -->
        <div class="text-center pt-2">

          <span class="text-sm text-slate-500">
            Already have an account?
          </span>

          <router-link
            to="/login"
            class="ml-1
                   text-sm
                   font-semibold
                   text-green-600
                   hover:text-green-700"
          >
            Sign in
          </router-link>

        </div>

      </form>

    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const emailVerified = ref(false)
const verifyingEmail = ref(false)

const errorMessage = ref('')

const form = ref({
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})


/* ================= VERIFY EMAIL ================= */

const verifyEmail = () => {

  errorMessage.value = ''

  if (!form.value.email) {
    errorMessage.value =
      'Please enter your email address first.'
    return
  }

  verifyingEmail.value = true

  // Testing only
  setTimeout(() => {

    emailVerified.value = true

    verifyingEmail.value = false

  }, 1000)
}


/* ================= SIGNUP ================= */

const handleSignup = () => {

  errorMessage.value = ''

  if (!emailVerified.value) {
    errorMessage.value =
      'Please verify your email first.'
    return
  }

  if (form.value.password.length < 6) {
    errorMessage.value =
      'Password must be at least 6 characters.'
    return
  }

  if (
    form.value.password !==
    form.value.confirmPassword
  ) {
    errorMessage.value =
      'Passwords do not match.'
    return
  }

  if (!form.value.terms) {
    errorMessage.value =
      'Please accept the Terms & Conditions.'
    return
  }

  console.log({
    userName: form.value.userName,
    email: form.value.email,
    password: form.value.password
  })

  alert('Account created successfully!')
}
</script>
```
