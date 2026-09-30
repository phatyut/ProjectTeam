```vue
<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">

    <!-- ================= HEADER ================= -->



    <!-- ================= HERO ================= -->
   

    <!-- ================= SUPPORT CATEGORIES ================= -->
    <section class="max-w-7xl mx-auto px-6 py-16">

      <div class="text-center mb-10">

        <p
          class="text-green-600
                 text-sm font-bold uppercase
                 tracking-wider"
        >
          Support Center
        </p>

        <h2
          class="mt-2 text-3xl
                 font-bold text-slate-900"
        >
          What can we help you with?
        </h2>

        <p class="mt-3 text-slate-500">
          Choose a category to find the information you need.
        </p>

      </div>


      <div
        class="grid grid-cols-1
               sm:grid-cols-2
               lg:grid-cols-3
               gap-5"
      >

        <!-- Category -->
        <div
          v-for="category in categories"
          :key="category.title"
          class="group bg-white
                 rounded-2xl
                 border border-slate-100
                 p-6
                 hover:border-green-200
                 hover:shadow-xl
                 hover:-translate-y-1
                 transition-all duration-300
                 cursor-pointer"
        >

          <div
            class="w-14 h-14
                   rounded-2xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-2xl
                   group-hover:bg-green-600
                   group-hover:scale-110
                   transition-all duration-300"
          >
            {{ category.icon }}
          </div>


          <h3
            class="mt-5
                   font-bold
                   text-lg
                   text-slate-900
                   group-hover:text-green-600
                   transition"
          >
            {{ category.title }}
          </h3>


          <p
            class="mt-2
                   text-sm
                   leading-6
                   text-slate-500"
          >
            {{ category.description }}
          </p>


          <button
            class="mt-5
                   text-sm
                   font-semibold
                   text-green-600
                   flex items-center gap-2"
          >
            Learn more
            <span
              class="group-hover:translate-x-1
                     transition"
            >
              →
            </span>
          </button>

        </div>

      </div>

    </section>


    <!-- ================= FAQ ================= -->
    <section class="bg-white border-y border-slate-100">

      <div
        class="max-w-4xl mx-auto
               px-6 py-16"
      >

        <div class="text-center mb-10">

          <p
            class="text-green-600
                   text-sm font-bold uppercase
                   tracking-wider"
          >
            FAQ
          </p>

          <h2
            class="mt-2
                   text-3xl
                   font-bold
                   text-slate-900"
          >
            Frequently Asked Questions
          </h2>

        </div>


        <div class="space-y-3">

          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="border border-slate-200
                   rounded-2xl
                   overflow-hidden
                   bg-slate-50"
          >

            <button
              @click="toggleFaq(index)"
              class="w-full
                     flex items-center
                     justify-between
                     text-left
                     px-6 py-5
                     font-semibold
                     text-slate-800
                     hover:text-green-600
                     transition"
            >

              <span>
                {{ faq.question }}
              </span>

              <span
                class="w-8 h-8
                       rounded-full
                       bg-white
                       flex items-center
                       justify-center
                       text-green-600
                       shadow-sm
                       shrink-0
                       ml-4
                       transition-transform"
                :class="openFaq === index
                  ? 'rotate-45'
                  : ''"
              >
                +
              </span>

            </button>


            <div
              v-if="openFaq === index"
              class="px-6 pb-5
                     text-sm
                     leading-7
                     text-slate-500"
            >
              {{ faq.answer }}
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- ================= CONTACT ================= -->
    <section class="max-w-7xl mx-auto px-6 py-16">

      <div
        class="rounded-3xl
               bg-gradient-to-r
               from-green-950
               to-green-700
               p-8 md:p-12
               overflow-hidden
               relative"
      >

        <!-- Decoration -->
        <div
          class="absolute
                 -right-20
                 -top-20
                 w-64 h-64
                 rounded-full
                 bg-white/10"
        ></div>


        <div
          class="relative
                 flex flex-col
                 lg:flex-row
                 lg:items-center
                 lg:justify-between
                 gap-10"
        >

          <!-- Text -->
          <div>

            <div
              class="text-green-300
                     text-sm
                     font-semibold
                     uppercase
                     tracking-wider"
            >
              Need more help?
            </div>

            <h2
              class="mt-3
                     text-3xl
                     md:text-4xl
                     font-bold
                     text-white"
            >
              Our team is here for you.
            </h2>

            <p
              class="mt-4
                     text-green-100
                     max-w-xl"
            >
              Can't find what you're looking for?
              Contact our support team and we'll
              help you find the right solution.
            </p>

          </div>


          <!-- Contact buttons -->
          <div
            class="flex flex-col
                   sm:flex-row
                   gap-3"
          >

            <button
              class="px-6 py-3.5
                     rounded-xl
                     bg-white
                     text-green-700
                     font-bold
                     hover:bg-green-50
                     transition
                     shadow-lg"
            >
              💬 Live Chat
            </button>

            <button
              class="px-6 py-3.5
                     rounded-xl
                     border border-white/30
                     text-white
                     font-bold
                     hover:bg-white/10
                     transition"
            >
              ✉ Contact Us
            </button>

          </div>

        </div>

      </div>

    </section>


    <!-- ================= CONTACT INFORMATION ================= -->
    <section class="max-w-7xl mx-auto px-6 pb-16">

      <div
        class="grid grid-cols-1
               md:grid-cols-3
               gap-5"
      >

        <div
          class="bg-white
                 border border-slate-100
                 rounded-2xl
                 p-6
                 flex items-center gap-4"
        >

          <div
            class="w-12 h-12
                   rounded-xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-xl"
          >
            📞
          </div>

          <div>
            <p class="text-xs text-slate-400">
              Call us
            </p>

            <p class="font-bold text-slate-800">
              +855 12 345 678
            </p>
          </div>

        </div>


        <div
          class="bg-white
                 border border-slate-100
                 rounded-2xl
                 p-6
                 flex items-center gap-4"
        >

          <div
            class="w-12 h-12
                   rounded-xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-xl"
          >
            ✉️
          </div>

          <div>
            <p class="text-xs text-slate-400">
              Email us
            </p>

            <p class="font-bold text-slate-800">
              support@microcomputer.com
            </p>
          </div>

        </div>


        <div
          class="bg-white
                 border border-slate-100
                 rounded-2xl
                 p-6
                 flex items-center gap-4"
        >

          <div
            class="w-12 h-12
                   rounded-xl
                   bg-green-50
                   flex items-center
                   justify-center
                   text-xl"
          >
            🕐
          </div>

          <div>
            <p class="text-xs text-slate-400">
              Support hours
            </p>

            <p class="font-bold text-slate-800">
              Mon - Sat · 8AM - 6PM
            </p>
          </div>

        </div>

      </div>

    </section>


    <!-- ================= FOOTER ================= -->
        <Footer/>
  </div>
</template>


<script setup>
import Footer from '../footer/Footer.vue'
import { ref } from 'vue'


// ================= SEARCH =================

const search = ref('')


// ================= FAQ =================

const openFaq = ref(null)

const toggleFaq = (index) => {
  openFaq.value =
    openFaq.value === index
      ? null
      : index
}


// ================= SUPPORT CATEGORIES =================

const categories = [
  {
    icon: '🛒',
    title: 'Orders & Purchases',
    description:
      'Get help with placing orders, changing orders, and checking your purchase status.'
  },

  {
    icon: '📦',
    title: 'Shipping & Delivery',
    description:
      'Learn about delivery options, shipping times, and how to track your package.'
  },

  {
    icon: '🛡️',
    title: 'Warranty',
    description:
      'Find information about product warranties, warranty claims, and coverage.'
  },

  {
    icon: '💳',
    title: 'Payment',
    description:
      'Learn about available payment methods, payments, invoices, and refunds.'
  },

  {
    icon: '💻',
    title: 'Product Information',
    description:
      'Need help choosing a laptop, desktop, monitor, or computer component?'
  },

  {
    icon: '🔧',
    title: 'Technical Support',
    description:
      'Get assistance with computer setup, troubleshooting, and technical problems.'
  }
]


// ================= FAQ DATA =================

const faqs = [
  {
    question: 'How can I track my order?',
    answer:
      'After your order has been shipped, you can use the tracking information provided in your order confirmation to check the delivery status.'
  },

  {
    question: 'What payment methods do you accept?',
    answer:
      'We support several payment methods. Available payment options can be displayed during the checkout process.'
  },

  {
    question: 'How long does delivery take?',
    answer:
      'Delivery time depends on your location, product availability, and selected shipping method.'
  },

  {
    question: 'Do your computers have a warranty?',
    answer:
      'Warranty coverage depends on the product and manufacturer. Please check the warranty information on the individual product page.'
  },

  {
    question: 'Can I return a product?',
    answer:
      'Return eligibility depends on the product condition and your store return policy. Contact our support team for assistance.'
  },

  {
    question: 'Can you help me choose a computer?',
    answer:
      'Yes. Our support team can help you choose a computer based on your budget and requirements such as gaming, office work, programming, or design.'
  }
]
</script>
```
