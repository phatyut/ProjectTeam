```vue
<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-100 overflow-y-scroll">

    <div class="min-h-screen  bg-slate-100 flex items-center justify-center px-4">

      <!-- Signup Card -->
      <div
        class="w-full max-w-lg bg-white rounded-2xl
               shadow-xl shadow-slate-200/60
               border border-slate-200 overflow-hidden"
      >

        <!-- Header -->
        <div class="px-8 pt-7 pb-5 text-center">

          <!-- Logo -->
          <div
            class="mx-auto mb-4 w-[22%] flex items-center justify-center"
          >
            <img
              src="../../../public/imgs/microcomputer.png"
              alt="Micro Computer"
              class="w-full h-auto object-contain"
            />
          </div>

          <h1 class="text-2xl font-bold text-slate-800">
            Create Account
          </h1>

          <p class="text-sm text-slate-500 mt-2">
            Create your Micro Computer account
          </p>

        </div>


        <!-- Form -->
        <form
          class="px-8 pb-7"
          @submit.prevent="signup"
        >

          <!-- Full Name -->
          <div class="mb-4">

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Full Name
            </label>

            <div class="relative">

              <i
                class="fa-regular fa-user
                       absolute left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              ></i>

              <input
                v-model="form.name"
                type="text"
                placeholder="Enter your full name"
                class="w-full h-11 pl-11 pr-4
                       rounded-xl
                       border border-slate-200
                       bg-slate-50
                       text-slate-700
                       outline-none
                       transition
                       focus:bg-white
                       focus:border-green-600
                       focus:ring-4 focus:ring-green-600/10"
              />

            </div>

          </div>


          <!-- Email -->
          <div class="mb-4">

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email Address
            </label>

            <div class="relative">

              <i
                class="fa-regular fa-envelope
                       absolute left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              ></i>

              <input
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                class="w-full h-11 pl-11 pr-4
                       rounded-xl
                       border border-slate-200
                       bg-slate-50
                       text-slate-700
                       outline-none
                       transition
                       focus:bg-white
                       focus:border-green-600
                       focus:ring-4 focus:ring-green-600/10"
              />

            </div>

          </div>


          <!-- Password -->
          <div class="mb-4">

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>

            <div class="relative">

              <i
                class="fa-solid fa-lock
                       absolute left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              ></i>

              <input
                v-model="form.password"
                type="password"
                placeholder="Create a password"
                class="w-full h-11 pl-11 pr-4
                       rounded-xl
                       border border-slate-200
                       bg-slate-50
                       text-slate-700
                       outline-none
                       transition
                       focus:bg-white
                       focus:border-green-600
                       focus:ring-4 focus:ring-green-600/10"
              />

            </div>

          </div>


          <!-- Confirm Password -->
          <div class="mb-4">

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Confirm Password
            </label>

            <div class="relative">

              <i
                class="fa-solid fa-shield-halved
                       absolute left-4 top-1/2
                       -translate-y-1/2
                       text-slate-400"
              ></i>

              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm your password"
                class="w-full h-11 pl-11 pr-4
                       rounded-xl
                       border border-slate-200
                       bg-slate-50
                       text-slate-700
                       outline-none
                       transition
                       focus:bg-white
                       focus:border-green-600
                       focus:ring-4 focus:ring-green-600/10"
              />

            </div>

          </div>


          <!-- Terms -->
          <div class="flex items-start gap-2 mb-5">

            <input
              id="terms"
              v-model="form.terms"
              type="checkbox"
              class="w-4 h-4 mt-0.5 accent-green-700"
            />

            <label
              for="terms"
              class="text-xs text-slate-500 cursor-pointer leading-5"
            >
              I agree to the
              <a
                href="#"
                class="font-semibold text-green-700
                       hover:text-green-800"
              >
                Terms & Conditions
              </a>
              and
              <a
                href="#"
                class="font-semibold text-green-700
                       hover:text-green-800"
              >
                Privacy Policy
              </a>
            </label>

          </div>


          <!-- Create Account -->
          <button
            type="submit"
            class="w-full h-11
                   rounded-xl
                   bg-green-700
                   hover:bg-green-800
                   text-white
                   font-semibold
                   shadow-lg shadow-green-700/20
                   transition duration-200
                   active:scale-[0.98]"
          >
            <i class="fa-solid fa-user-plus mr-2"></i>
            Create Account
          </button>


          <!-- Divider -->
          <div class="flex items-center gap-4 my-5">

            <div class="h-px bg-slate-200 flex-1"></div>

            <span class="text-xs text-slate-400">
              OR
            </span>

            <div class="h-px bg-slate-200 flex-1"></div>

          </div>


          <!-- Google -->
          <button
            type="button"
            class="w-full h-11
                   rounded-xl
                   border border-slate-200
                   bg-white
                   text-slate-700
                   font-medium
                   hover:bg-slate-50
                   transition"
          >
            <i class="fa-brands fa-google mr-2"></i>
            Continue with Google
          </button>


          <!-- Login -->
          <p class="text-center text-sm text-slate-500 mt-5">

            Already have an account?

            <button
              type="button"
              @click="goToLogin"
              class="font-semibold
                     text-green-700
                     hover:text-green-800
                     ml-1"
            >
              Sign In
            </button>

          </p>

        </form>

      </div>

    </div>

  </div>
</template>


<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {

  setup() {

    const router = useRouter();

    const form = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });


    const signup = () => {

      if (!form.name || !form.email || !form.password) {
        alert("Please fill in all fields");
        return;
      }

      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (!form.terms) {
        alert("Please accept the Terms & Conditions");
        return;
      }

      alert("Account created successfully");

      // Go to login page
      router.push("/login");
    };


    const goToLogin = () => {
      router.push("/login");
    };


    return {
      form,
      signup,
      goToLogin,
    };

  },

};
</script>
```
