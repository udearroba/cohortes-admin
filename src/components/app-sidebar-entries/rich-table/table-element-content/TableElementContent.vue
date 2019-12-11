<template>
  <div class="element-content">

    <template v-if="dataType == 'link'">
      <link-element
      :data="this.data"/>
      <!-- <div class="content-title">
        {{title}}
      </div>
      <div class="content-info">
        <a :href="data.info" target="_blank">{{data.info}}</a>
      </div> -->
    </template>

    <template v-else-if="dataType == 'status'">
      <status-element
      :data="this.data"/>
    </template>

    <template v-else>
      <div class="content-title">
        {{title}}
      </div>
      <div class="content-info">
        {{data.info}}
      </div>
    </template>
  </div>
</template>

<script>
import StatusElement from '../table-element-content/status-element/StatusElement'
import LinkElement from '../table-element-content/link-element/LinkElement'

export default {
  name: 'table-element-content',
  components: {
    StatusElement,
    LinkElement,
  },
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
    padding: 5px;
  }

  .content-title {
    display: flex;
    justify-content: flex-start;
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
