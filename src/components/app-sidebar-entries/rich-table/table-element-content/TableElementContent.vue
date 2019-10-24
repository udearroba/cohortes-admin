<template>
  <div class="element-content">
    <div class="content-title">
      {{title}}
    </div>
    <div class="content-info">
      {{info}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-element-content',
  props: {
    title: {
      type: String,
    },
    info: {
      type: String,
    },
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
  }
</style>
