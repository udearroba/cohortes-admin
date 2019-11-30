<template>
  <div class="element-content">
    <div class="content-title">
      {{data.title}}
    </div>
    <div class="content-info">
      <template v-if="dataType == 'link'">
        <a :href="data.info" target="_blank">{{data.info}}</a>
      </template>
      <template v-else>
        {{data.info}}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-element-content',
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    dataType() {
      if (!this.data.extra) {
        return null
      }
      return this.data.extra.format
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
    align-items: center;
    padding: 5px;
  }

  .content-title {
    color: $content-title-color;
    font-weight: bold;
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
