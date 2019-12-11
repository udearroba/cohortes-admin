<template>
  <div class="link-element-content">
    <div class="content-title" @click="focusField()">
      {{title}}
      <i class="fa fa-edit"></i>
    </div>
    <div class="content-info">
      <a
        :href="contentInfo"
        target="_blank"
        v-show="!inputActive"
        >
      {{contentInfo}}
      </a>
      <input v-model="editField" v-show="inputActive" @blur="blurField" ref="input">
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-element-content',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      contentInfo: this.data.info,
      inputActive: false,
      editField : '',
    }
  },
  methods: {
    focusField(){
      this.editField = this.contentInfo
      this.inputActive = !this.inputActive
      console.log(this.$refs)
      console.log(this.$refs.input.focus())
      // this.$refs.input.$el.focus()
    },
    blurField(){
      this.contentInfo = this.editField
      this.inputActive = !this.inputActive
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
