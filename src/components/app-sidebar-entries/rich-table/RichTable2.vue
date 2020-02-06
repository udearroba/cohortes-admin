<template>
  <div class="element-row-container">
    <div class="reunion" v-for="reunion in tableData" :key="reunion.id">
      <div class="item">
      <span class="rtable-text">Reunión:</span>
      <div class="rtable-data">
        <p>{{reunion.data}}</p>
      </div>
      </div>
        <div class="ocurrencias" v-for="ocurrencia in reunion.ocurrencias" :key="ocurrencia.id">
          <div class="item">
            <span class="rtable-text">Ocurrencia:</span>
            <div class="rtable-data">
              <p>
                {{ocurrencia.data}}
              </p>
            </div>
          </div>
          <div class="grabaciones" v-for="grabacion in ocurrencia.grabaciones" :key="grabacion.id">
            <div class="item">
              <span class="rtable-text">Grabación:</span>
              <div class="rtable-data">
                <p>
                  {{grabacion.data}}
                </p>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TableElementRow from './rich-table-row/RichTableRow'
import _ from 'lodash'

export default {
  name: 'rich-table-2',
  components: {
    // TableElementRow,
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  computed: {
  },
  data () {
    return {
      // numberRows: 3
    }
  },
}
</script>

<style lang="scss" scoped>

  .table-element-row {
    margin-top: 8px;
  }

  .element-row-container {
    width: 100%;
  }


  .rtable-text {
    font-size: 2em;
  }

  .rtable-data {
    margin-left: 10px;
    background-color: white;
    width: 100%;
    height: 100%;
  }

  .ocurrencias {
    display: flex;
    flex-direction: column;
    margin: 3px 0 0 15px;
  }

  .grabaciones {
    display: flex;
    margin: 0 0 0 15px;
  }

  .ocurrencias .rtable-text {
    font-size: 1.7em;
  }
  .grabaciones .rtable-text {
    font-size: 1.5em;
  }

  .item {
    display: flex;
  }

</style>