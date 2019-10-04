<!--

  @version 1.4.1 - Octubre de 2019
  @author Mario Alberto Sanchez Castro - Analista de desarrollo - Ude@ Educacion Virtual <desarrollo2ude@udea.edu.co>
 
-->

<template>
	<div class="va-row">
		<div class="flex xs12 md12">
			<vuestic-widget :headerText="'Respuestas'">
				<model-table
				:tableFields="tableFields"
				:tableData="response"
				@detailsClicked="onDetailsClicked"
				></model-table>
			</vuestic-widget>
		</div>
	</div>  
	
	
</template>

<script>

	import Vue from 'vue'
	import ModelTable from '../self-components/model-table/ModelTableResponse'
	import axios from "axios"
	import DBModels from '../../models/index'
	import apiRoutes from '../../services/apiRoutes'




	export default {
		name: 'Table',
		components: {
			ModelTable,
		},
		data() {
			return {
				modeloRespuesta: DBModels.RespuestaModel,
				tableFields: [],
				response: [],
				body: {

				},
				formOptions: {
					validateAfterLoad: true,
					validateAfterChanged: true,
					validateBeforeSave: true
				}
			};
		},
		created(){

			for (let modelAttr in this.modeloRespuesta) {
				let valor = this.modeloRespuesta[modelAttr]

				if(valor.isTableField){	  
					this.tableFields.push(modelAttr)
				}
			}

			if(this.$route.params.new_response != null){

				this.response.push(this.$route.params.new_response)

			}


		},
		methods: {
			onDetailsClicked(data, index) {
				this.navegarSiguienteNivel(data.id)		
			},navegarSiguienteNivel(id) {
				this.$router.push({ name: 'respuestas', params: { respuestaId: id }})
			}
		}, beforeCreate () {

			let idFormulario = this.$route.params.formularioId

			axios.all([
				axios.get(apiRoutes.getRespuestasFromIdFormulario(idFormulario)),
				])
			.then(axios.spread(res => {
				this.response = res.data


			}))
			.catch(error => {
				console.log(error)
				this.errored = true
			}).finally(() => {
				this.loading = false
			})

		},
	};


</script>