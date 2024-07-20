<template>
  <div class="absolute -z-10">
    <div class="w-full h-3/6 absolute bottom-0 bg-[#020919] sm:hidden"></div>
    <svg class="hidden sm:block" width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" overflow="auto" shape-rendering="auto">
      <defs>
        <path id="wavepath" d="M 0 2000 0 500 Q 138 422 276 500 t 276 0 276 0 276 0 276 0 276 0  v1000 z" />
      </defs>
      <g>
        <use xlink:href="#wavepath" y="-400" fill="#020919">
        </use>
      </g>
    </svg>
  </div>
  <slot class="z-10"></slot>
</template>