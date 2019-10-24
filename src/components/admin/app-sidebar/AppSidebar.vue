<template>
  <vuestic-sidebar :hidden="isOpen">
    <template slot="menu">
      <sidebar-link
        :to="{ name: 'home' }">
        <span slot="title">
          <span
            class="sidebar-menu-item-icon vuestic-icon vuestic-icon-dashboard"></span>
          <span>{{ $t('menu.dashboard') }}</span>
        </span>
      </sidebar-link>
      <sidebar-link
        :to="{ name: 'reuniones' }">
        <span slot="title">
          <span
            class="sidebar-menu-item-icon va-icon fa fa-group "></span>
          <span>{{ $t('Reuniones') }}</span>
        </span>
      </sidebar-link>
      <sidebar-link
        :to="{ name: 'rich-table' }">
        <span slot="title">
          <span
            class="sidebar-menu-item-icon vuestic-icon vuestic-icon-tables"></span>
          <span>{{ $t('Rich table') }}</span>
        </span>
      </sidebar-link>
      <sidebar-link-group>
        <span slot="title">
          <span
            class="sidebar-menu-item-icon vuestic-icon vuestic-icon-forms"></span>
          <span>{{ $t('Curaduria') }}</span>
        </span>
      <sidebar-link
		:to="{ name: 'curaduria' }">
		<span slot="title">
			<span
			class="sidebar-menu-item-icon vuestic-icon vuestic-icon-forms"></span>
			<span>{{ $t('Formularios de Curadurias') }}</span>
		</span>
	</sidebar-link>
      </sidebar-link-group>
    </template>
  </vuestic-sidebar>
</template>

<script>

import VuesticSidebar
  from '../../../vuestic-theme/vuestic-components/vuestic-sidebar/VuesticSidebar'
import SidebarLink from './components/SidebarLink'
import SidebarLinkGroup from './components/SidebarLinkGroup'

export default {
  name: 'app-sidebar',
  components: {
    VuesticSidebar,
    SidebarLink,
    SidebarLinkGroup,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
}

</script>
