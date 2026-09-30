

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">

    <section class="max-w-7xl mx-auto px-6 py-14">

      <div
        class="grid grid-cols-1
               sm:grid-cols-2
               lg:grid-cols-4
               gap-5"
      >

        <!-- Phone -->

        <div
          class="group
                 bg-white
                 rounded-2xl
                 border border-slate-100
                 p-6
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl
                   group-hover:bg-green-600
                   transition"
          >
            📞
          </div>


          <p
            class="mt-5
                   text-sm
                   text-slate-400"
          >
            Call us
          </p>


          <h3
            class="mt-1
                   font-bold
                   text-lg
                   text-slate-900"
          >
            +855 12 345 678
          </h3>


          <p
            class="mt-2
                   text-sm
                   text-slate-500"
          >
            Mon - Sat, 8:00 AM - 6:00 PM
          </p>

        </div>


        <!-- Email -->

        <div
          class="group
                 bg-white
                 rounded-2xl
                 border border-slate-100
                 p-6
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl
                   group-hover:bg-green-600
                   transition"
          >
            ✉️
          </div>


          <p
            class="mt-5
                   text-sm
                   text-slate-400"
          >
            Email us
          </p>


          <h3
            class="mt-1
                   font-bold
                   text-lg
                   text-slate-900"
          >
            support@microcomputer.com
          </h3>


          <p
            class="mt-2
                   text-sm
                   text-slate-500"
          >
            We reply within 24 hours.
          </p>

        </div>


        <!-- Location -->

        <div
          class="group
                 bg-white
                 rounded-2xl
                 border border-slate-100
                 p-6
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl
                   group-hover:bg-green-600
                   transition"
          >
            📍
          </div>


          <p
            class="mt-5
                   text-sm
                   text-slate-400"
          >
            Visit our store
          </p>


          <h3
            class="mt-1
                   font-bold
                   text-lg
                   text-slate-900"
          >
            Phnom Penh
          </h3>


          <p
            class="mt-2
                   text-sm
                   text-slate-500"
          >
            Cambodia
          </p>

        </div>


        <!-- Opening -->

        <div
          class="group
                 bg-white
                 rounded-2xl
                 border border-slate-100
                 p-6
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl
                   group-hover:bg-green-600
                   transition"
          >
            🕐
          </div>


          <p
            class="mt-5
                   text-sm
                   text-slate-400"
          >
            Opening hours
          </p>


          <h3
            class="mt-1
                   font-bold
                   text-lg
                   text-slate-900"
          >
            8:00 AM - 6:00 PM
          </h3>


          <p
            class="mt-2
                   text-sm
                   text-slate-500"
          >
            Monday - Saturday
          </p>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- CONTACT FORM + INFORMATION -->
    <!-- ================================================= -->

    <section class="max-w-7xl mx-auto px-6 pb-16">

      <div
        class="grid grid-cols-1
               lg:grid-cols-[1fr_0.75fr]
               gap-8"
      >

        <!-- ================= FORM ================= -->

        <div
          class="bg-white
                 rounded-3xl
                 border border-slate-100
                 shadow-sm
                 p-6 md:p-8"
        >

          <div class="mb-8">

            <p
              class="text-sm
                     font-bold
                     text-green-600
                     uppercase
                     tracking-wider"
            >
              Send us a message
            </p>

            <h2
              class="mt-2
                     text-3xl
                     font-bold
                     text-slate-900"
            >
              How can we help?
            </h2>

            <p
              class="mt-3
                     text-sm
                     text-slate-500"
            >
              Fill out the form and our team
              will contact you as soon as possible.
            </p>

          </div>


          <form
            @submit.prevent="submitForm"
            class="space-y-5"
          >

            <!-- Name + Email -->

            <div
              class="grid grid-cols-1
                     md:grid-cols-2
                     gap-5"
            >

              <div>

                <label
                  class="block
                         text-sm
                         font-semibold
                         text-slate-700
                         mb-2"
                >
                  Full name
                </label>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter your name"
                  class="w-full
                         px-4 py-3
                         rounded-xl
                         border border-slate-200
                         outline-none
                         focus:border-green-500
                         focus:ring-4
                         focus:ring-green-500/10
                         transition"
                />

              </div>


              <div>

                <label
                  class="block
                         text-sm
                         font-semibold
                         text-slate-700
                         mb-2"
                >
                  Email address
                </label>

                <input
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  class="w-full
                         px-4 py-3
                         rounded-xl
                         border border-slate-200
                         outline-none
                         focus:border-green-500
                         focus:ring-4
                         focus:ring-green-500/10
                         transition"
                />

              </div>

            </div>


            <!-- Phone -->

            <div>

              <label
                class="block
                       text-sm
                       font-semibold
                       text-slate-700
                       mb-2"
              >
                Phone number
              </label>

              <input
                v-model="form.phone"
                type="tel"
                placeholder="+855 XX XXX XXX"
                class="w-full
                       px-4 py-3
                       rounded-xl
                       border border-slate-200
                       outline-none
                       focus:border-green-500
                       focus:ring-4
                       focus:ring-green-500/10
                       transition"
              />

            </div>


            <!-- Department -->

            <div>

              <label
                class="block
                       text-sm
                       font-semibold
                       text-slate-700
                       mb-2"
              >
                What do you need help with?
              </label>

              <select
                v-model="form.department"
                class="w-full
                       px-4 py-3
                       rounded-xl
                       border border-slate-200
                       bg-white
                       outline-none
                       focus:border-green-500
                       focus:ring-4
                       focus:ring-green-500/10
                       transition"
              >

                <option value="">
                  Select a department
                </option>

                <option value="sales">
                  Sales & Product Advice
                </option>

                <option value="order">
                  Orders & Delivery
                </option>

                <option value="technical">
                  Technical Support
                </option>

                <option value="warranty">
                  Warranty
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>


            <!-- Subject -->

            <div>

              <label
                class="block
                       text-sm
                       font-semibold
                       text-slate-700
                       mb-2"
              >
                Subject
              </label>

              <input
                v-model="form.subject"
                type="text"
                placeholder="What is your question about?"
                class="w-full
                       px-4 py-3
                       rounded-xl
                       border border-slate-200
                       outline-none
                       focus:border-green-500
                       focus:ring-4
                       focus:ring-green-500/10
                       transition"
              />

            </div>


            <!-- Message -->

            <div>

              <div
                class="flex
                       justify-between
                       items-center
                       mb-2"
              >

                <label
                  class="text-sm
                         font-semibold
                         text-slate-700"
                >
                  Message
                </label>

                <span
                  class="text-xs
                         text-slate-400"
                >
                  {{ form.message.length }}/500
                </span>

              </div>


              <textarea
                v-model="form.message"
                maxlength="500"
                rows="6"
                placeholder="Tell us how we can help..."
                class="w-full
                       px-4 py-3
                       rounded-xl
                       border border-slate-200
                       outline-none
                       resize-none
                       focus:border-green-500
                       focus:ring-4
                       focus:ring-green-500/10
                       transition"
              ></textarea>

            </div>


            <!-- Submit -->

            <button
              type="submit"
              class="w-full
                     py-3.5
                     rounded-xl
                     bg-green-600
                     text-white
                     font-bold
                     hover:bg-green-700
                     hover:shadow-lg
                     hover:shadow-green-600/20
                     active:scale-[0.99]
                     transition-all"
            >
              Send Message →
            </button>

          </form>

        </div>


        <!-- ================= RIGHT SIDE ================= -->

        <div class="space-y-5">

          <!-- Store Card -->

          <div
            class="rounded-3xl
                   bg-gradient-to-br
                   from-green-950
                   via-green-800
                   to-green-600
                   p-7
                   text-white
                   relative
                   overflow-hidden"
          >

            <div
              class="absolute
                     -right-20
                     -top-20
                     w-60 h-60
                     rounded-full
                     bg-white/10"
            ></div>


            <div class="relative">

              <div
                class="w-14 h-14
                       rounded-2xl
                       bg-white/10
                       flex items-center
                       justify-center
                       text-2xl"
              >
                🏪
              </div>


              <h3
                class="mt-6
                       text-2xl
                       font-bold"
              >
                Visit our store
              </h3>


              <p
                class="mt-3
                       text-green-100
                       text-sm
                       leading-6"
              >
                Come visit Micro Computer
                and explore our latest laptops,
                desktops, monitors, components,
                and accessories.
              </p>


              <div
                class="mt-6
                       space-y-4
                       text-sm"
              >

                <div class="flex gap-3">

                  <span>📍</span>

                  <span class="text-green-100">
                    Phnom Penh, Cambodia
                  </span>

                </div>


                <div class="flex gap-3">

                  <span>🕐</span>

                  <span class="text-green-100">
                    Monday - Saturday<br />
                    8:00 AM - 6:00 PM
                  </span>

                </div>


                <div class="flex gap-3">

                  <span>📞</span>

                  <span class="text-green-100">
                    +855 12 345 678
                  </span>

                </div>

              </div>


              <button
                class="mt-7
                       px-5 py-3
                       rounded-xl
                       bg-white
                       text-green-700
                       font-bold
                       hover:bg-green-50
                       transition"
              >
                Get Directions →
              </button>

            </div>

          </div>


          <!-- Social Card -->

          <div
            class="bg-white
                   rounded-3xl
                   border border-slate-100
                   p-7"
          >

            <h3
              class="text-xl
                     font-bold
                     text-slate-900"
            >
              Connect with us
            </h3>


            <p
              class="mt-2
                     text-sm
                     text-slate-500"
            >
              Follow Micro Computer for
              new products, promotions,
              and announcements.
            </p>


            <div
              class="mt-6
                     grid grid-cols-2
                     gap-3"
            >

              <button
                class="flex items-center
                       gap-3
                       p-4
                       rounded-xl
                       bg-slate-50
                       hover:bg-green-50
                       hover:text-green-600
                       transition"
              >
                <span>📘</span>
                <span class="font-semibold">
                  Facebook
                </span>
              </button>


              <button
                class="flex items-center
                       gap-3
                       p-4
                       rounded-xl
                       bg-slate-50
                       hover:bg-green-50
                       hover:text-green-600
                       transition"
              >
                <span>📷</span>
                <span class="font-semibold">
                  Instagram
                </span>
              </button>


              <button
                class="flex items-center
                       gap-3
                       p-4
                       rounded-xl
                       bg-slate-50
                       hover:bg-green-50
                       hover:text-green-600
                       transition"
              >
                <span>✈️</span>
                <span class="font-semibold">
                  Telegram
                </span>
              </button>


              <button
                class="flex items-center
                       gap-3
                       p-4
                       rounded-xl
                       bg-slate-50
                       hover:bg-green-50
                       hover:text-green-600
                       transition"
              >
                <span>💬</span>
                <span class="font-semibold">
                  Messenger
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>



  <Footer></Footer>



  </div>
</template>

<script setup>
import Footer from "../../components/footer/Footer.vue"

import { ref } from 'vue'


// =================================================
// FORM DATA
// =================================================

const form = ref({
  name: '',
  email: '',
  phone: '',
  department: '',
  subject: '',
  message: ''
})


// =================================================
// SUBMIT FORM
// =================================================

const submitForm = () => {

  console.log('Contact Form:', form.value)

  alert(
    'Thank you! Your message has been received.'
  )

  // Reset form

  form.value = {
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: ''
  }
}

</script>



<!-- <template>
  
<div className="tabs tabs-lift">
  <label className="tab">
    <input type="radio" name="my_tabs_4" />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
    Live
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

  <label className="tab">
    <input type="radio" name="my_tabs_4" defaultChecked />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg>
    Laugh
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

  <label className="tab">
    <input type="radio" name="my_tabs_4" />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    Love
  </label>
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
</div>







<div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" class="px-6 py-3 font-medium">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Color
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Category
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Price
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Stock
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-neutral-primary border-b border-default">
                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    231
                </td>
            </tr>
            <tr class="bg-neutral-primary border-b border-default">
                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    423
                </td>
            </tr>
            <tr class="bg-neutral-primary">
                <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    121
                </td>
            </tr>
        </tbody>
    </table>
</div>

<form class="max-w-md mx-auto">   
    <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="search" id="search" class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
        <button type="button" class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
    </div>
</form>

<form class="max-w-sm mx-auto">
    <label for="number-input" class="block mb-2.5 text-sm font-medium text-heading">Select a number:</label>
    <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="90210" required />
</form>


</template> -->



