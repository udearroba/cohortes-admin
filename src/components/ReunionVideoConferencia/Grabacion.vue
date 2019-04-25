<template>
  <div>

    <div class="va-row">
      <div class="flex md6">
        <vuestic-widget :headerText="'Agregar Grabación'">
          <form>

            <div class="va-row">

              <div class="flex md8">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" name="input-icon-left"
                             required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Id externo'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <!-- <div class="form-group with-icon-right">
                    <div class="input-group">
                      <input v-model="clearableText" id="clear-input"
                             name="clear-input" required/>
                      <i class="fa fa-times icon-right input-icon pointer"
                         @click="clear('clearableText')"></i>
                      <label class="control-label" for="clear-input"
                             role="button">{{'forms.inputs.inputWithClearButton'
                        | translate}}</label><i
                      class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="inputWithDescription" required title=""/>
                      <label class="control-label" for="simple-input">{{'forms.inputs.textInputWithDescription'
                        | translate}}</label><i
                      class="bar"></i>
                      <small class="help text-secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua.
                      </small>
                    </div>
                  </div> -->
                  <div class="btn btn-micro btn-primary">
                    {{'Agregar'}}
                  </div>
                </fieldset>
              </div>

            </div>

          </form>
        </vuestic-widget>
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Grabaciones'">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id externo'}}</td>
                <td></td>
              </tr>
              </thead>
              <!-- <tbody>
                <tr>
                  <td>Matthew McCormick</td>
                  <td>matthew30@mail.ol</td>
                  <td>Vancouver</td>
                  <td align="right">93</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Nancy Bo</td>
                  <td>nancy@boonweb.com</td>
                  <td>Washington</td>
                  <td align="right">280</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Frederiko Lopez</td>
                  <td>fr.lopez@webmail.sp</td>
                  <td>Barcelona</td>
                  <td align="right">16</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Stanley Hummer</td>
                  <td>mr_winner_2999@gmail.cb</td>
                  <td>Manchester</td>
                  <td align="right">57</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Lendley Wintz</td>
                  <td>9938198146@mailster.io</td>
                  <td>Wien</td>
                  <td align="right">113</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Barbara Noz</td>
                  <td>barbaranoz@mailster.io</td>
                  <td>Brussels</td>
                  <td align="right">68</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Matthew McCormick</td>
                  <td>matthew30@mail.ol</td>
                  <td>Vancouver</td>
                  <td align="right">93</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Nancy Bo</td>
                  <td>nancy@boonweb.com</td>
                  <td>Washington</td>
                  <td align="right">280</td>
                  <td></td>
                </tr>
              </tbody> -->
              <tbody>
                <tr>
                  <td>Matthew McCormick</td>
                  <td align="right" class="valid">
                    <i class="fa fa-plus success-icon icon-right input-icon"></i>
                  </td>
                </tr>
                <tr>
                  <td>Matthew McCormick</td>
                  <td align="right" class="valid">
                    <i class="fa fa-plus success-icon icon-right input-icon"></i>
                  </td>
                </tr>
                <tr>
                  <td>Matthew McCormick</td>
                  <td align="right" class="valid">
                    <i class="fa fa-plus success-icon icon-right input-icon"></i>
                  </td>
                </tr>
                <tr>
                  <td>Matthew McCormick</td>
                  <td align="right" class="valid">
                    <i class="fa fa-plus success-icon icon-right input-icon"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
      </div>
    </div>

    <!-- <div class="va-row">
      <div class="flex md12 xs12">
        <vuestic-widget :headerText="$t('tables.styled')">
          <div class="table-responsive">
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
              <tr>
                <td></td>
                <td>{{'tables.headings.name' | translate}}</td>
                <td>{{'tables.headings.email' | translate}}</td>
                <td>{{'tables.headings.city' | translate}}</td>
                <td align="right">{{'tables.headings.score' | translate}}</td>
                <td align="middle"></td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Nancy Bo</td>
                <td>nancy@boonweb.com</td>
                <td>Washington</td>
                <td align="right">280</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Frederiko Lopez</td>
                <td>fr.lopez@webmail.sp</td>
                <td>Barcelona</td>
                <td align="right">16</td>
                <td align="middle"></td>
              </tr>
              <tr class="table-danger">
                <td>
                  <span class="badge badge-pill badge-danger">DANGER</span>
                </td>
                <td>Stanley Hummer</td>
                <td>mr_winner_2999@gmail.cb</td>
                <td>Manchester</td>
                <td align="right">57</td>
                <td align="middle">
                  <i
                    class="fa fa-exclamation-triangle icon-right input-icon error-icon"></i>
                </td>
              </tr>
              <tr class="table-success">
                <td>
                  <span class="badge badge-pill badge-primary">SUCCESS</span>
                </td>
                <td>Lendley Wintz</td>
                <td>9938198146@mailster.io</td>
                <td>Wien</td>
                <td align="right">113</td>
                <td align="middle" class="valid">
                  <i class="fa fa-check success-icon icon-right input-icon"></i>
                </td>
              </tr>
              <tr class="table-warning">
                <td>
                  <span class="badge badge-pill badge-warning">WARNING</span>
                </td>
                <td>Barbara Noz</td>
                <td>barbaranoz@mailster.io</td>
                <td>Brussels</td>
                <td align="right">68</td>
                <td align="middle"></td>
              </tr>
              <tr>
                <td></td>
                <td>Matthew McCormick</td>
                <td>matthew30@mail.ol</td>
                <td>Vancouver</td>
                <td align="right">93</td>
                <td align="middle"></td>
              </tr>
              <tr class="table-info">
                <td>
                  <span class="badge badge-pill badge-info">INFO</span>
                </td>
                <td>Nancy Bo</td>
                <td>nancy@boonweb.com</td>
                <td>Washington</td>
                <td align="right">280</td>
                <td align="middle"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
      </div>
    </div> -->

    </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from '../tables/BadgeColumn.vue'
import FieldsDef
  from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/fields-definition'
import ItemsPerPageDef
  from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/items-per-page-definition'
import QueryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params'
import { SpringSpinner } from 'epic-spinners'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'Table',
  components: {
    SpringSpinner,
  },
  data () {
    return {
      apiUrl: 'https://vuetable.ratiw.net/api/users',
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: '',
      defaultTablePerPage: 6,
      queryParams: QueryParams,
    }
  },
}
</script>

<style lang="scss">

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}
</style>
