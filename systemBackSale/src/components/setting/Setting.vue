<template>
  <div class="min-h-screen bg-slate-100 p-6">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800">
        Settings
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        Manage your account, store and application settings
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">

      <!-- Sidebar -->
      <div class="h-fit rounded-2xl bg-white p-3 shadow-sm">

        <button
          class="flex w-full items-center gap-3 rounded-xl
                 bg-green-50 px-4 py-3 text-left
                 font-medium text-green-700"
        >
          <font-awesome-icon icon="fa-solid fa-user" />
          <span>Profile</span>
        </button>

        <button
          class="mt-1 flex w-full items-center gap-3 rounded-xl
                 px-4 py-3 text-left text-slate-600
                 hover:bg-slate-50"
        >
          <font-awesome-icon icon="fa-solid fa-store" />
          <span>Store</span>
        </button>

        <button
          class="mt-1 flex w-full items-center gap-3 rounded-xl
                 px-4 py-3 text-left text-slate-600
                 hover:bg-slate-50"
        >
          <font-awesome-icon icon="fa-solid fa-bell" />
          <span>Notifications</span>
        </button>

        <button
          class="mt-1 flex w-full items-center gap-3 rounded-xl
                 px-4 py-3 text-left text-slate-600
                 hover:bg-slate-50"
        >
          <font-awesome-icon icon="fa-solid fa-shield-halved" />
          <span>Security</span>
        </button>

        <button
          class="mt-1 flex w-full items-center gap-3 rounded-xl
                 px-4 py-3 text-left text-slate-600
                 hover:bg-slate-50"
        >
          <font-awesome-icon icon="fa-solid fa-sliders" />
          <span>Preferences</span>
        </button>

      </div>

      <!-- Main -->
      <div class="space-y-6">

        <!-- Profile -->
        <section class="rounded-2xl bg-white p-6 shadow-sm">

          <div class="mb-6">
            <h2 class="text-lg font-semibold text-slate-800">
              Profile Information
            </h2>

            <p class="text-sm text-slate-500">
              Update your personal account information
            </p>
          </div>

          <div class="flex items-center gap-5 border-b border-slate-100 pb-6">

            <div
              class="flex h-20 w-20 items-center justify-center
                     rounded-2xl bg-green-100 text-3xl text-green-700"
            >
              <font-awesome-icon icon="fa-solid fa-user" />
            </div>

            <div>
              <h3 class="font-semibold text-slate-800">
                Administrator
              </h3>

              <p class="text-sm text-slate-500">
                admin@microcomputer.com
              </p>

              <button
                class="mt-2 text-sm font-medium text-green-700
                       hover:text-green-800"
              >
                Change photo
              </button>
            </div>

          </div>

          <!-- Form -->
          <div class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>

              <input
                type="text"
                value="Administrator"
                class="w-full rounded-xl border border-slate-200
                       px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-100"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value="admin@microcomputer.com"
                class="w-full rounded-xl border border-slate-200
                       px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-100"
              />
            </div>

          </div>

        </section>

        <!-- Store -->
        <section class="rounded-2xl bg-white p-6 shadow-sm">

          <div class="mb-6">
            <h2 class="text-lg font-semibold text-slate-800">
              Store Information
            </h2>

            <p class="text-sm text-slate-500">
              Configure your computer store information
            </p>
          </div>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Store Name
              </label>

              <input
                type="text"
                value="Micro Computer"
                class="w-full rounded-xl border border-slate-200
                       px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-100"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <input
                type="text"
                placeholder="+855 XX XXX XXX"
                class="w-full rounded-xl border border-slate-200
                       px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-100"
              />
            </div>

            <div class="md:col-span-2">
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>

              <textarea
                rows="3"
                placeholder="Store address..."
                class="w-full resize-none rounded-xl border
                       border-slate-200 px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-100"
              ></textarea>
            </div>

          </div>

        </section>

        <!-- Preferences -->
        <section class="rounded-2xl bg-white p-6 shadow-sm">

          <div class="mb-5">
            <h2 class="text-lg font-semibold text-slate-800">
              Preferences
            </h2>

            <p class="text-sm text-slate-500">
              Customize your dashboard experience
            </p>
          </div>

          <div class="space-y-4">

            <div
              class="flex items-center justify-between rounded-xl
                     border border-slate-100 p-4"
            >
              <div>
                <p class="font-medium text-slate-700">
                  Email Notifications
                </p>

                <p class="text-sm text-slate-500">
                  Receive notifications about your store
                </p>
              </div>

              <input
                type="checkbox"
                checked
                class="h-5 w-5 accent-green-700"
              />
            </div>

            <div
              class="flex items-center justify-between rounded-xl
                     border border-slate-100 p-4"
            >
              <div>
                <p class="font-medium text-slate-700">
                  Low Stock Alert
                </p>

                <p class="text-sm text-slate-500">
                  Notify when product stock is low
                </p>
              </div>

              <input
                type="checkbox"
                checked
                class="h-5 w-5 accent-green-700"
              />
            </div>

          </div>

        </section>

        <!-- Actions -->
        <div class="flex justify-end gap-3">

          <button
            class="rounded-xl border border-slate-200
                   bg-white px-5 py-3 font-medium
                   text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            class="rounded-xl bg-green-700 px-6 py-3
                   font-medium text-white shadow-sm
                   transition hover:bg-green-800
                   active:scale-95"
          >
            <font-awesome-icon
              icon="fa-solid fa-check"
              class="mr-2"
            />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  </div>
</template>