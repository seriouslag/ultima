<template>
<div class="loading">
  <h1>
    <div>
      <div>
        <svg viewBox="0 0 60 18">
          <defs>
            <linearGradient id="ultima"
              x1="0"
              x2="0"
              y1="0"
              y2="100%"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#f1d4f5"
                offset="0%" />
              <stop stop-color="#a25387"
                offset="100%" />
            </linearGradient>
          </defs>
          <text fill="url(#ultima)"
            style="font-family: 'Cyberpunk';"
            x="0"
            y="15"
            class="b"
          >
            ULTIMA
          </text>
        </svg>
      </div>
    </div>
  </h1>
</div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #151515;

  h1 {
    max-width: 75vw;

    > div {
      animation: moveIndeterminate 5s infinite;
      overflow: hidden;

      div {
        width: 75vw;
      }
    }
  }
}
@keyframes moveIndeterminate {
  0%, 100%{
    max-width: 1%;
  }

  50% {
    max-width: 100%;
  }
}
</style>
