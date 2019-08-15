<template>
  <vuestic-widget>
    <h1>Proyecto Cohortes</h1>
    <p>El proyecto cohortes actualmente se encuentra en proceso de desarrollo y mejora. Por favor, si tienes alguna sugerencia o encuentras algún problema, ¡no dudes en reportarlo! Además, si tienes alguna duda de cómo ingresar la información, puedes mirar la documentación básica.</p>
    <div class="icon-container">
      <div class="item-container item-container1">
        <a href="https://github.com/udearroba/cohortes-admin/issues" target="_blank">
          <github-icon/>
        </a>
        <p>Reportar error</p>
      </div>
      <div class="item-container item-container2">
        <a href="https://docs.google.com/document/d/1OfiWh-MMBoic2fqhf0pSRBxZnZ5xde7W625utGhPiGw/edit" target="_blank">
          <document-icon/>
        </a>
        <p>Leer documentación</p>
      </div>
    </div>
  </vuestic-widget>
</template>

<script>
import DashboardInfoWidgets from '../../dashboard/DashboardInfoWidgets'
import UsersMembersTab from '../../dashboard/users-and-members-tab/UsersMembersTab.vue'
import SetupProfileTab from '../../dashboard/setup-profile-tab/SetupProfileTab.vue'
import FeaturesTab from '../../dashboard/features-tab/FeaturesTab.vue'
import DataVisualisationTab
  from '../../dashboard/data-visualisation-tab/DataVisualisation.vue'
import DashboardBottomWidgets from '../../dashboard/DashboardBottomWidgets.vue'

import GithubIcon from '../ui/icons/GithubIcon'
import DocumentIcon from '../ui/icons/DocumentIcon'

export default {
  name: 'dashboard',
  components: {
    DataVisualisationTab,
    DashboardInfoWidgets,
    UsersMembersTab,
    SetupProfileTab,
    FeaturesTab,
    DashboardBottomWidgets,
    GithubIcon,
    DocumentIcon,
  },
}

</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
h1 {
  font-weight: bolder;
}
.icon-container {
  display: flex;
  width: fit-content;
  justify-content: space-between;
}
.item-container {
  padding: 5px 5px 0 5px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding: 0;
    margin-top: -10px;
    font-size: 1.4em;
    cursor: default;
  }
}
.item-container2 {
  margin-left: 30px;
}
</style>
