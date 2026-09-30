
<template>
  <div class="min-h-screen bg-slate-100 fixed left-0 top-0 w-full z-20 flex items-center justify-center px-4 py-8 " v-if="pagelogin.loginpage">

    <!-- Login Container -->
    <div
      class="w-[40%]  rounded-3xl justify-center items-center  bg-white
              grid lg:grid-cols-1 "
    >



      <!-- Right Side -->
      <div class="p-7 sm:p-10 lg:p-12 flex items-center">

        <div class="w-full max-w-md mx-auto">

          <!-- Mobile Logo -->
          <div class="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div
              class="w-11 h-11 rounded-xl bg-green-700 text-white
                     flex items-center justify-center"
            >
              <i class="fa-solid fa-computer text-xl"></i>
            </div>

            <div>
              <h1 class="text-lg font-bold text-slate-900">
                Micro Computer
              </h1>
              <p class="text-xs text-slate-500">
                Computer Store
              </p>
            </div>
          </div>

          <!-- Heading -->
          <div class="mb-8">
            <p class="text-sm font-semibold text-green-600 mb-2">
              Welcome back 👋
            </p>

            <h2 class="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p class="mt-2 text-sm text-slate-500">
              Enter your details below to continue.
            </p>
          </div>


          <!-- Form -->
          <form @submit.prevent="login" class="space-y-5">

            <!-- Email -->
            <div>
              <label
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email address
              </label>

              <div class="relative">
                <i
                  class="fa-regular fa-envelope absolute left-4 top-1/2
                         -translate-y-1/2 text-slate-400"
                ></i>

                <input
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  class="w-full h-12 pl-11 pr-4 rounded-xl
                         border border-slate-200 bg-slate-50
                         text-slate-800 placeholder:text-slate-400
                         outline-none transition
                         focus:bg-white focus:border-green-500
                         focus:ring-4 focus:ring-green-500/10"
                  
                />
              </div>
            </div>


            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label
                  class="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  class="text-sm font-medium text-green-600
                         hover:text-green-700"
                >
                  Forgot password?
                </button>
              </div>

              <div class="relative">
                <i
                  class="fa-solid fa-lock absolute left-4 top-1/2
                         -translate-y-1/2 text-slate-400"
                ></i>

                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full h-12 pl-11 pr-12 rounded-xl
                         border border-slate-200 bg-slate-50
                         text-slate-800 placeholder:text-slate-400
                         outline-none transition
                         focus:bg-white focus:border-green-500
                         focus:ring-4 focus:ring-green-500/10"
                  
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2
                         -translate-y-1/2 text-slate-400
                         hover:text-slate-600"
                >
                  <i
                    :class="
                      showPassword
                        ? 'fa-regular fa-eye-slash'
                        : 'fa-regular fa-eye'
                    "
                  ></i>
                </button>
              </div>
            </div>


            <!-- Remember -->
            <div class="flex items-center justify-between">

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-4 h-4 rounded border-slate-300
                         text-green-600 focus:ring-green-500"
                />

                <span class="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

            </div>


            <!-- Login Button -->
            <button
              type="submit"
              class="w-full h-12 rounded-xl
                     bg-green-700 hover:bg-green-800
                     text-white font-semibold
                     shadow-lg shadow-green-700/20
                     transition-all duration-200
                     hover:-translate-y-0.5
                     flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

          </form>


          <!-- Divider -->
        


          <!-- Social Login -->
          <!-- <div class="grid grid-cols-2 gap-3">

            <button
              type="button"
              class="h-11 rounded-xl border border-slate-200
                     hover:bg-slate-50 transition
                     flex items-center justify-center gap-2
                     text-sm font-medium text-slate-700"
            >
              <i class="fa-brands fa-google text-red-500"></i>
              Google
            </button>

            <button
              type="button"
              class="h-11 rounded-xl border border-slate-200
                     hover:bg-slate-50 transition
                     flex items-center justify-center gap-2
                     text-sm font-medium text-slate-700"
            >
              <i class="fa-brands fa-github text-slate-900"></i>
              GitHub
            </button>

          </div> -->


          <!-- Signup -->
          <p class="text-center text-sm text-slate-500 mt-8">
            Don't have an account?

            <router-link
              to="/signup"
              class="font-semibold text-green-600
                     hover:text-green-700"
            >
              Create account
            </router-link>
          </p>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
import { ref, reactive } from "vue";
import {pagelogin} from "../../sharing/Sharing"

export default {
  setup() {
    const showPassword = ref(false);
    const rememberMe = ref(false);

    const form = reactive({
      email: "",
      password: "",
    });

    const login = () => {
      console.log("Login data:");

      // Connect your API here later:
      // axios.post("http://localhost:9000/auth/login", form)
    };

    return {
      form,
      showPassword,
      rememberMe,
      pagelogin,


    //   functions
      login,
    };
  },
};
</script>

