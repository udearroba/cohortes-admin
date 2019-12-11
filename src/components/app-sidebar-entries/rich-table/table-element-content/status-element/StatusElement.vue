<template>
  <div class="element-content">
    <div class="content-title" @click="onClick()">
      {{title}}
      <i class="fa fa-exchange"></i>
    </div>
    <div class="content-info">
      {{contentInfo}}
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'table-element-content',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      contentInfo: this.data.info
    }
  },
  methods: {
    onClick() {
      const actualIndex = _.indexOf(this.data.extra.status, this.contentInfo)
      this.contentInfo = this.getNextElement(this.data.extra.status, actualIndex)
    },
    getNextElement(arr, actualIndex) {
      const len = arr.length
      if (actualIndex+1 >= len)
        return arr[0]
      return arr[actualIndex+1]
    }
  },
  computed: {
    dataType() {
      if (!this.data.extra) {
        return null
      }
      return this.data.extra.format
    },
    title() {
      if (this.data.extra) {
        return this.data.extra.alias ? this.data.extra.alias : this.data.title
      }
      return this.data.title
    }
  },
}
</script>

<style lang="scss" scoped>

$content-title-color: $vue-green;
$content-info-color: $lighter-gray;

.element-content {
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding: 5px;
  }

  .content-title {
    display: flex;
    justify-content: flex-start;
    color: $content-title-color;
    font-weight: bold;
    i {
      display: none;
      margin-left: auto;
      align-self: center;
    }
    &:hover {
      cursor: pointer;
      & i {
      display: initial;
      }
    }
  }

  .content-info {
    color: $content-info-color;
    align-self: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 94px;
  }
</style>
