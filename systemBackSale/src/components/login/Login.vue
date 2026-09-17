<template>
    <div class=" fixed top-0 left-0 w-full h-full bg-slate-100  ">
          <div class="min-h-screen bg-slate-100 flex items-center justify-center px-4">

    <!-- Login Card -->
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60
             border border-slate-200 overflow-hidden"
    >

      <!-- Header -->
      <div class="px-8 pt-8 pb-6 text-center">

        <!-- Logo -->
        <div
          class="mx-auto mb-5 w-[25%] h-auto rounded-2xl
                  flex items-center justify-center
                 "
        >
          <img src="../../../public/imgs/microcomputer.png" alt="">
        </div>

        <h1 class="text-2xl font-bold text-slate-800">
          Welcome Back
        </h1>

        <p class="text-sm text-slate-500 mt-2">
          Sign in to your Micro Computer account
        </p>
      </div>

      <!-- Form -->
      <form class="px-8 pb-8" @submit="testsubmit">

        <!-- Email -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>

          <div class="relative">
            <i
              class="fa-regular fa-envelope absolute left-4 top-1/2
                     -translate-y-1/2 text-slate-400"
            ></i>

            <input
              type="email"
              placeholder="Enter your email"
              class="w-full h-12 pl-11 pr-4 rounded-xl
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
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-semibold text-slate-700">
              Password
            </label>

            <a
              href="#"
              class="text-xs font-semibold text-green-700
                     hover:text-green-800"
            >
              Forgot password?
            </a>
          </div>

          <div class="relative">
            <i
              class="fa-solid fa-lock absolute left-4 top-1/2
                     -translate-y-1/2 text-slate-400"
            ></i>

            <input
              type="password"
              placeholder="Enter your password"
              class="w-full h-12 pl-11 pr-4 rounded-xl
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

        <!-- Remember -->
        <div class="flex items-center gap-2 mb-6">
          <input
            id="remember"
            type="checkbox"
            class="w-4 h-4 accent-green-700"
          />

          <label
            for="remember"
            class="text-sm text-slate-500 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full h-12 rounded-xl
                 bg-green-700 hover:bg-green-800
                 text-white font-semibold
                 shadow-lg shadow-green-700/20
                 transition duration-200
                 active:scale-[0.98]"
        >
          <i class="fa-solid fa-right-to-bracket mr-2"></i>
          Sign In
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-4 my-7">
          <div class="h-px bg-slate-200 flex-1"></div>

          <span class="text-xs text-slate-400">
            OR
          </span>

          <div class="h-px bg-slate-200 flex-1"></div>
        </div>

        <!-- Google -->
        <button
          type="button"
          class="w-full h-12 rounded-xl
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

        <!-- Register -->
        <p class="text-center text-sm text-slate-500 mt-7">
          Don't have an account?

          <a
            @click="createAccount"
            href="#"
            class="font-semibold text-green-700 hover:text-green-800"
          >
            Create account
          </a>
        </p>

      </form>
    </div>

  </div>

    </div>
</template>
<script>
import { useRouter } from 'vue-router';
export default{
    setup(){
        const router = useRouter()
        const testsubmit =()=>{
            router.replace("/dashboard")
        }

        const createAccount =()=>{
          router.replace("/signup")
        }
        return {
            testsubmit,
            createAccount

        }
    }
}

</script>
