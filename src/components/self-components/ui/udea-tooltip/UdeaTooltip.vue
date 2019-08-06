<template>
  <vuestic-tooltip :options="tooltipOptions">
    <slot></slot>
  </vuestic-tooltip>
</template>

<script>

export default {
  name: 'udea-tooltip',
  computed: {
    tooltipOptions () {
      let options = {
        content: this.message
      }
      return Object.assign({}, this.defaultOptions, options)
    },
  },

  props: {
    message: {
      type: String,
      default: () => "I'm a tooltip!",
    },
  },

  data () {
    return {
      defaultOptions: {
        placement: 'top',
        delay: { show: 500, hide: 100 },
      },
    }
  },
}
</script>
