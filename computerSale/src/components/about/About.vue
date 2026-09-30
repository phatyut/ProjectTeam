```vue
<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">

    <section
      class="max-w-7xl
             mx-auto
             px-6
             py-20"
    >

      <div
        class="grid
               grid-cols-1
               lg:grid-cols-2
               gap-14
               items-center"
      >

        <!-- Left -->

        <div>

          <p
            class="text-green-600
                   text-sm
                   font-bold
                   uppercase
                   tracking-wider"
          >
            Who we are
          </p>


          <h2
            class="mt-3
                   text-3xl
                   md:text-4xl
                   font-bold
                   text-slate-900
                   leading-tight"
          >
            More than a computer store.
            We're your technology partner.
          </h2>


          <p
            class="mt-6
                   text-slate-500
                   leading-8"
          >
            At Micro Computer, we believe choosing
            technology should be simple, transparent,
            and convenient.
          </p>


          <p
            class="mt-4
                   text-slate-500
                   leading-8"
          >
            Our goal is to connect customers with
            technology that matches their real needs,
            whether they are building a gaming PC,
            upgrading an office, starting university,
            or looking for reliable everyday computing.
          </p>


          <p
            class="mt-4
                   text-slate-500
                   leading-8"
          >
            From product selection to after-sales
            assistance, we aim to provide a complete
            customer experience built around quality,
            useful information, and dependable service.
          </p>


          <div
            class="mt-8
                   flex items-center
                   gap-4"
          >

            <div
              class="w-12 h-12
                     rounded-xl
                     bg-green-100
                     flex items-center
                     justify-center
                     text-green-700
                     font-bold"
            >
              MC
            </div>


            <div>

              <p
                class="font-bold
                       text-slate-900"
              >
                Micro Computer
              </p>

              <p
                class="text-sm
                       text-slate-400"
              >
                Technology made simple.
              </p>

            </div>

          </div>

        </div>


        <!-- Right visual -->

        <div class="relative">

          <div
            class="rounded-3xl
                   bg-gradient-to-br
                   from-green-900
                   to-green-600
                   p-8
                   min-h-[430px]
                   flex items-center
                   justify-center
                   overflow-hidden"
          >

            <!-- Decorative circles -->

            <div
              class="absolute
                     w-72 h-72
                     rounded-full
                     border
                     border-white/10"
            ></div>


            <div
              class="absolute
                     w-52 h-52
                     rounded-full
                     border
                     border-white/10"
            ></div>


            <!-- Computer illustration -->

            <div
              class="relative
                     z-10
                     text-center"
            >

              <div
                class="text-[120px]
                       md:text-[150px]"
              >
                💻
              </div>


              <div
                class="mt-3
                       text-white
                       font-bold
                       text-xl"
              >
                Smart Technology
              </div>


              <p
                class="mt-2
                       text-green-100
                       text-sm"
              >
                Built for your everyday needs
              </p>

            </div>

          </div>


          <!-- Floating card -->

          <div
            class="absolute
                   -bottom-6
                   -left-5
                   bg-white
                   rounded-2xl
                   shadow-xl
                   border
                   border-slate-100
                   px-5 py-4"
          >

            <div
              class="flex
                     items-center
                     gap-3"
            >

              <div
                class="w-10 h-10
                       rounded-xl
                       bg-green-100
                       flex items-center
                       justify-center"
              >
                ✓
              </div>


              <div>

                <p
                  class="text-sm
                         font-bold
                         text-slate-900"
                >
                  Trusted Service
                </p>

                <p
                  class="text-xs
                         text-slate-400"
                >
                  Customer focused
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- STATS -->
    <!-- ================================================= -->

    <section
      class="bg-white
             border-y
             border-slate-100"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-6
               py-14"
      >

        <div
          class="grid
                 grid-cols-2
                 lg:grid-cols-4
                 gap-8"
        >

          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >

            <div
              class="text-3xl
                     md:text-4xl
                     font-bold
                     text-green-600"
            >
              {{ stat.value }}
            </div>


            <p
              class="mt-2
                     text-sm
                     text-slate-500"
            >
              {{ stat.label }}
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- MISSION + VISION -->
    <!-- ================================================= -->

    <section
      class="max-w-7xl
             mx-auto
             px-6
             py-20"
    >

      <div
        class="text-center
               max-w-2xl
               mx-auto"
      >

        <p
          class="text-green-600
                 text-sm
                 font-bold
                 uppercase
                 tracking-wider"
        >
          What drives us
        </p>


        <h2
          class="mt-3
                 text-3xl
                 font-bold
                 text-slate-900"
        >
          Our Mission & Vision
        </h2>


        <p
          class="mt-4
                 text-slate-500"
        >
          Building a better technology shopping
          experience for every customer.
        </p>

      </div>


      <div
        class="mt-12
               grid
               grid-cols-1
               md:grid-cols-2
               gap-6"
      >

        <!-- Mission -->

        <div
          class="group
                 rounded-3xl
                 bg-green-950
                 p-8
                 text-white
                 hover:-translate-y-1
                 transition"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-white/10
                   flex items-center
                   justify-center
                   text-2xl"
          >
            🎯
          </div>


          <h3
            class="mt-7
                   text-2xl
                   font-bold"
          >
            Our Mission
          </h3>


          <p
            class="mt-4
                   text-green-100
                   leading-7"
          >
            To make quality computer technology
            accessible and easier to understand by
            providing dependable products, clear
            information, and helpful customer service.
          </p>

        </div>


        <!-- Vision -->

        <div
          class="group
                 rounded-3xl
                 bg-white
                 border
                 border-slate-200
                 p-8
                 hover:-translate-y-1
                 hover:shadow-xl
                 transition"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl"
          >
            🚀
          </div>


          <h3
            class="mt-7
                   text-2xl
                   font-bold
                   text-slate-900"
          >
            Our Vision
          </h3>


          <p
            class="mt-4
                   text-slate-500
                   leading-7"
          >
            To become a trusted technology destination
            where customers can confidently discover,
            purchase, and maintain the computers and
            technology they need.
          </p>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- WHAT WE PROVIDE -->
    <!-- ================================================= -->

    <section class="bg-white border-y border-slate-100">

      <div
        class="max-w-7xl
               mx-auto
               px-6
               py-20"
      >

        <div
          class="grid
                 grid-cols-1
                 lg:grid-cols-[0.7fr_1fr]
                 gap-12"
        >

          <!-- Heading -->

          <div>

            <p
              class="text-green-600
                     text-sm
                     font-bold
                     uppercase
                     tracking-wider"
            >
              What we provide
            </p>


            <h2
              class="mt-3
                     text-3xl
                     md:text-4xl
                     font-bold
                     text-slate-900"
            >
              Everything you need
              for your computer.
            </h2>


            <p
              class="mt-5
                     text-slate-500
                     leading-7"
            >
              We offer a broad range of technology
              products and services designed for
              different types of customers.
            </p>


            <router-link
              to="/shop"
              class="inline-flex
                     mt-7
                     items-center
                     gap-2
                     px-5 py-3
                     rounded-xl
                     bg-green-600
                     text-white
                     font-bold
                     hover:bg-green-700
                     transition"
            >
              Browse Products →
            </router-link>

          </div>


          <!-- Services -->

          <div
            class="grid
                   grid-cols-1
                   sm:grid-cols-2
                   gap-4"
          >

            <div
              v-for="service in services"
              :key="service.title"
              class="group
                     p-6
                     rounded-2xl
                     bg-slate-50
                     border
                     border-slate-100
                     hover:bg-green-50
                     hover:border-green-100
                     transition"
            >

              <div
                class="w-12 h-12
                       rounded-xl
                       bg-white
                       shadow-sm
                       flex items-center
                       justify-center
                       text-xl
                       group-hover:bg-green-600
                       transition"
              >
                {{ service.icon }}
              </div>


              <h3
                class="mt-5
                       font-bold
                       text-slate-900
                       group-hover:text-green-700"
              >
                {{ service.title }}
              </h3>


              <p
                class="mt-2
                       text-sm
                       leading-6
                       text-slate-500"
              >
                {{ service.description }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- WHY MICRO COMPUTER -->
    <!-- ================================================= -->

    <section
      class="max-w-7xl
             mx-auto
             px-6
             py-20"
    >

      <div class="text-center">

        <p
          class="text-green-600
                 text-sm
                 font-bold
                 uppercase
                 tracking-wider"
        >
          Why Micro Computer
        </p>


        <h2
          class="mt-3
                 text-3xl
                 font-bold
                 text-slate-900"
        >
          Built around our customers
        </h2>

      </div>


      <div
        class="mt-12
               grid
               grid-cols-1
               sm:grid-cols-2
               lg:grid-cols-4
               gap-5"
      >

        <div
          v-for="reason in reasons"
          :key="reason.title"
          class="bg-white
                 rounded-2xl
                 border
                 border-slate-100
                 p-6
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl"
          >
            {{ reason.icon }}
          </div>


          <h3
            class="mt-5
                   font-bold
                   text-lg
                   text-slate-900"
          >
            {{ reason.title }}
          </h3>


          <p
            class="mt-3
                   text-sm
                   text-slate-500
                   leading-6"
          >
            {{ reason.description }}
          </p>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- CUSTOMER EXPERIENCE -->
    <!-- ================================================= -->

    <section
      class="bg-slate-950
             text-white"
    >

      <div
        class="max-w-7xl
               mx-auto
               px-6
               py-20"
      >

        <div
          class="grid
                 grid-cols-1
                 lg:grid-cols-2
                 gap-14
                 items-center"
        >

          <div>

            <p
              class="text-green-400
                     text-sm
                     font-bold
                     uppercase
                     tracking-wider"
            >
              Our promise
            </p>


            <h2
              class="mt-3
                     text-3xl
                     md:text-4xl
                     font-bold"
            >
              Technology should be
              simple and reliable.
            </h2>


            <p
              class="mt-5
                     text-slate-400
                     leading-7"
            >
              We focus on making every step easier —
              from finding the right product to receiving
              support after your purchase.
            </p>


            <div class="mt-8 space-y-5">

              <div
                v-for="item in promises"
                :key="item.title"
                class="flex gap-4"
              >

                <div
                  class="w-10 h-10
                         rounded-xl
                         bg-green-600/20
                         text-green-400
                         flex items-center
                         justify-center
                         shrink-0"
                >
                  ✓
                </div>


                <div>

                  <h3
                    class="font-bold"
                  >
                    {{ item.title }}
                  </h3>


                  <p
                    class="mt-1
                           text-sm
                           text-slate-400
                           leading-6"
                  >
                    {{ item.description }}
                  </p>

                </div>

              </div>

            </div>

          </div>


          <!-- Right card -->

          <div
            class="rounded-3xl
                   border
                   border-white/10
                   bg-white/5
                   p-8"
          >

            <div
              class="flex
                     items-center
                     justify-between"
            >

              <div>

                <p
                  class="text-sm
                         text-slate-400"
                >
                  Customer care
                </p>

                <h3
                  class="mt-1
                         text-2xl
                         font-bold"
                >
                  We're here when you need us.
                </h3>

              </div>


              <div
                class="w-14 h-14
                       rounded-2xl
                       bg-green-600
                       flex items-center
                       justify-center
                       text-2xl"
              >
                💬
              </div>

            </div>


            <div
              class="mt-8
                     space-y-3"
            >

              <div
                class="flex items-center
                       justify-between
                       p-4
                       rounded-xl
                       bg-white/5"
              >

                <span class="text-slate-400">
                  Product advice
                </span>

                <span class="text-green-400">
                  ✓
                </span>

              </div>


              <div
                class="flex items-center
                       justify-between
                       p-4
                       rounded-xl
                       bg-white/5"
              >

                <span class="text-slate-400">
                  Order assistance
                </span>

                <span class="text-green-400">
                  ✓
                </span>

              </div>


              <div
                class="flex items-center
                       justify-between
                       p-4
                       rounded-xl
                       bg-white/5"
              >

                <span class="text-slate-400">
                  Technical support
                </span>

                <span class="text-green-400">
                  ✓
                </span>

              </div>


              <div
                class="flex items-center
                       justify-between
                       p-4
                       rounded-xl
                       bg-white/5"
              >

                <span class="text-slate-400">
                  Warranty assistance
                </span>

                <span class="text-green-400">
                  ✓
                </span>

              </div>

            </div>


            <router-link
              to="/contact"
              class="mt-7
                     w-full
                     flex
                     justify-center
                     py-3.5
                     rounded-xl
                     bg-green-600
                     text-white
                     font-bold
                     hover:bg-green-700
                     transition"
            >
              Contact Our Team
            </router-link>

          </div>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- CTA -->
    <!-- ================================================= -->

    <section
      class="max-w-7xl
             mx-auto
             px-6
             py-20"
    >

      <div
        class="rounded-3xl
               bg-gradient-to-r
               from-green-950
               to-green-700
               p-8 md:p-12
               text-center
               relative
               overflow-hidden"
      >

        <div
          class="absolute
                 -top-20
                 -right-20
                 w-64 h-64
                 rounded-full
                 bg-white/10"
        ></div>


        <div class="relative">

          <p
            class="text-green-300
                   text-sm
                   font-bold
                   uppercase
                   tracking-wider"
          >
            Start your journey
          </p>


          <h2
            class="mt-3
                   text-3xl
                   md:text-4xl
                   font-bold
                   text-white"
          >
            Find the right technology for you.
          </h2>


          <p
            class="mt-4
                   max-w-xl
                   mx-auto
                   text-green-100"
          >
            Explore our products or talk with our
            team if you need help choosing the right
            computer.
          </p>


          <div
            class="mt-8
                   flex
                   flex-col
                   sm:flex-row
                   justify-center
                   gap-3"
          >

            <router-link
              to="/shop"
              class="px-6 py-3.5
                     rounded-xl
                     bg-white
                     text-green-700
                     font-bold
                     hover:bg-green-50
                     transition"
            >
              Shop Now →
            </router-link>


            <router-link
              to="/contact"
              class="px-6 py-3.5
                     rounded-xl
                     border
                     border-white/30
                     text-white
                     font-bold
                     hover:bg-white/10
                     transition"
            >
              Contact Us
            </router-link>

          </div>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- FOOTER -->
    <!-- ================================================= -->
<Footer/>
  

  </div>
</template>


<script setup>
import Footer from '../footer/Footer.vue'

// =================================================
// COMPANY STATS
// =================================================

const stats = [

  {
    value: '1000+',
    label: 'Products Available'
  },

  {
    value: '24/7',
    label: 'Online Access'
  },

  {
    value: '100%',
    label: 'Customer Focused'
  },

  {
    value: '1',
    label: 'Technology Partner'
  }

]


// =================================================
// SERVICES
// =================================================

const services = [

  {
    icon: '💻',
    title: 'Laptops & Desktops',
    description:
      'Computers for students, professionals, businesses, creators, and gamers.'
  },

  {
    icon: '⚙️',
    title: 'Computer Components',
    description:
      'Processors, graphics cards, RAM, storage, power supplies, and other components.'
  },

  {
    icon: '🖥️',
    title: 'Monitors & Displays',
    description:
      'Displays for productivity, gaming, creative work, and everyday computing.'
  },

  {
    icon: '🎧',
    title: 'Accessories',
    description:
      'Keyboards, mice, headsets, webcams, cables, and useful computer accessories.'
  },

  {
    icon: '🔧',
    title: 'Technical Assistance',
    description:
      'Helpful guidance for setup, troubleshooting, upgrades, and computer questions.'
  },

  {
    icon: '🛡️',
    title: 'Warranty Support',
    description:
      'Assistance with warranty information and eligible product service requests.'
  }

]


// =================================================
// WHY MICRO COMPUTER
// =================================================

const reasons = [

  {
    icon: '✓',
    title: 'Reliable Products',
    description:
      'We focus on offering computer products from established manufacturers and suppliers.'
  },

  {
    icon: '💡',
    title: 'Helpful Advice',
    description:
      'Our goal is to help customers understand their options before making a purchase.'
  },

  {
    icon: '🚚',
    title: 'Convenient Shopping',
    description:
      'Browse products online and find the technology that fits your needs and budget.'
  },

  {
    icon: '🛡️',
    title: 'After-Sales Care',
    description:
      'Our relationship with customers continues after the purchase through support and assistance.'
  }

]


// =================================================
// CUSTOMER PROMISES
// =================================================

const promises = [

  {
    title: 'Clear product information',
    description:
      'We aim to provide useful specifications and product details so customers can make informed choices.'
  },

  {
    title: 'Customer-focused support',
    description:
      'Our support channels are designed to help with questions before and after a purchase.'
  },

  {
    title: 'Technology for different needs',
    description:
      'From everyday computers to gaming and professional systems, we serve a variety of use cases.'
  }

]

</script>
```


<!-- <template>
  <div class="flex gap-5">
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': days }" aria-live="polite" aria-label="days"></span>
      </span>
      days
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': hours }" aria-live="polite" aria-label="hours"></span>
      </span>
      hours
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': minutes }" aria-live="polite" aria-label="minutes"></span>
      </span>
      min
    </div>
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': seconds }" aria-live="polite" aria-label="seconds"></span>
      </span>
      sec
    </div>
  </div>





  <figure className="diff aspect-16/9" tabIndex={0}>
  <div className="diff-item-1" role="img" tabIndex={0}>
    <img alt="daisy" src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" />
  </div>
  <div className="diff-item-2" role="img">
    <img
      alt="daisy"
      src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" />
  </div>
  <div className="diff-resizer"></div>
</figure>




<figure className="hover-gallery max-w-60">
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
  <img alt="Tailwind CSS image hover gallery" src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
</figure>



<div className="megamenu p-2 border border-base-300">
  <span className="megamenu-active"></span>

  <button className="after:content-none" popoverTarget="e1">One</button>
  <div id="e1" popover="auto">
    <div className="p-4">Content for the first item</div>
  </div>

  <button className="after:content-none" popoverTarget="e2">Two</button>
  <div id="e2" popover="auto">
    <div className="p-4">Content for the second item</div>
  </div>
</div>

<div className="tooltip tooltip-open" data-tip="Home">
  <button className="btn">home</button>
</div>


<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-down"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>
<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>




<button :aria-expanded="isOpen" @click="toggleMenu">
  Menu
</button>
<div v-show="isOpen" aria-hidden="!isOpen">
  Dropdown content
</div>





</template>

<script setup>
import { ref, onMounted } from 'vue'

const days = ref(15)
const hours = ref(10)
const minutes = ref(24)
const seconds = ref(59)

// Simple countdown logic
onMounted(() => {
  setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else {
      seconds.value = 59
      if (minutes.value > 0) {
        minutes.value--
      } else {
        minutes.value = 59
        if (hours.value > 0) {
          hours.value--
        } else {
          hours.value = 23
          if (days.value > 0) {
            days.value--
          }
        }
      }
    }
  }, 1000)
})
</script> -->
