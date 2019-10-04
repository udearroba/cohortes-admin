<!--

  @version 1.4.1 - Octubre de 2019
  @author Mario Alberto Sanchez Castro - Analista de desarrollo - Ude@ Educacion Virtual <desarrollo2ude@udea.edu.co>
 
-->

<template>
	<sidebar-link-group
	:minimized="false"
	:icon="['sidebar-menu-item-icon vuestic-icon vuestic-icon-tables']"
	title="Cohortes"
	><span slot="title">
		<span
		class="sidebar-menu-item-icon vuestic-icon vuestic-icon-tables"></span>
		<span>{{ $t('Curaduria') }}</span>
	</span>
	<sidebar-link v-for="(forms, index) in info" v-bind:key="index"
	:to="{ name: 'respuestas', params: { formularioId: forms.id } }">
	<span slot="title">
		<span
		class="sidebar-menu-item-icon vuestic-icon vuestic-icon-tables"></span>
		<span>{{ forms.nombre }}</span>
	</span>
</sidebar-link>
</sidebar-link-group>
</template>


<script>
	import SidebarLink from '../admin/app-sidebar/components/SidebarLink'
	import axios from "axios"
	import SidebarLinkGroup from '../admin/app-sidebar/components/SidebarLinkGroup'
	import apiRoutes from '../../services/apiRoutes'
	

	export default {
		name: 'curaduria-sidebar',
		components: {
			SidebarLink,
			SidebarLinkGroup,
		},
		data () {
			return {
				info: {},
			}
			
		},
		
		created() {
			axios.all([
				axios.get(apiRoutes.formulariosRoute),
				])
			.then(axios.spread(res => {

				this.info = res.data
				
			}))
			.catch(error => {
				this.errored = true
			}).finally(() => {
				this.loading = false
			})
		},
	}

</script>

