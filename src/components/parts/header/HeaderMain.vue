<template>
  <div class=" w-full max-w-7xl">
    <div x-data="{ open: false }"
      class="flex flex-col max-w-screen-xl p-5 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div class="flex flex-row items-center justify-between lg:justify-start">
        <a href="/"
          class="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8">
          🐧Penta Augmented Reality</a>
        <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" @click="open = !open">
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-8 h-8">
            <path x-show="!open" fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
            <path x-show="open" fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" style="display: none"></path>
          </svg>
        </button>
      </div>
      <nav :class="{ 'flex': open, 'hidden': !open }"
        class="flex-col flex-grow hidden md:flex md:justify-start md:flex-row">
        <ul class="space-y-2 list-none lg:space-y-0 lg:items-center lg:inline-flex">
          <li>
            <a href="/ar"
              class="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent hover:border-blue-600 leading-[22px] md:px-3 text-gray-500 hover:text-blue-500">
              AR
            </a>
          </li>
          <li>
            <a href="/apng"
              class="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent leading-[22px] md:px-3 text-gray-500 hover:text-blue-500 hover:border-blue-600">
              APNG
            </a>
          </li>
          <li>
            <a href="/camera_app"
              class="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent hover:border-blue-600 leading-[22px] md:px-3 text-gray-500 hover:text-blue-500">
              Camera App
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>