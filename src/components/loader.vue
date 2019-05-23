<template>
    <svg :viewBox="`0 0 50 50`">
        <circle :stroke-width="thickness" :stroke="color" cx="25" cy="25" r="20"></circle>
    </svg>
</template>

<script>
export default {
    props: {
        thickness: {
            type: Number,
            default: 2,
        },
        color: {
            type: String,
            default: null
        }
    },
}
</script>

<style scoped>
svg {
    transform-origin: center;
    animation: rotate 2s linear infinite;
}

circle {
    fill: none;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dashoffset: -125px;
    }
}
</style>