<!--

  @version 1.4.1 - Octubre de 2019
  @author Mario Alberto Sanchez Castro - Analista de desarrollo - Ude@ Educacion Virtual <desarrollo2ude@udea.edu.co>
 
-->

<template>
	<div>
  
  <div class="va-row">
  	<div class="flex xs12 md12">
  		<vuestic-widget :headerText="'Formulario'">
  			<model-table
  			:tableFields="tableFields"
  			:tableData="formdata"
  			@showClicked="onShowClicked"
  			@detailsClicked="onDetailsClicked"
  			></model-table>
  		</vuestic-widget>
  	</div>
  </div>  

</div>
</template>


<script>

	import Vue from 'vue'
	import ModelTable from '../self-components/model-table/ModelTableForm'
	import ModelForm from '../self-components/model-form/ModelForm'
	import apiRoutes from '../../services/apiRoutes'

	import axios from "axios"
	import DBModels from '../../models/index'




	export default {
		name: 'Table',
		components: {
			ModelForm,
			ModelTable,
		},
		data() {
			return {
				modeloFormulario: DBModels.FormularioModel,
				tableFields: [],
				formdata: {},
				respuestasAux: {},
				onEdit: false,
				model: {},

				body: {
				},

				schema: {},

				formOptions: {
					validateAfterLoad: true,
					validateAfterChanged: true,
					validateBeforeSave: true
				}
			};
		},
		created(){

			for (let modelAttr in this.modeloFormulario) {
				let valor = this.modeloFormulario[modelAttr]

				if(valor.isTableField){	  
					this.tableFields.push(modelAttr)
				}
			}

		},
		methods: {
			onAgregar (validatedModel) {
				if (!validatedModel.isValid) {
					this.showErrorToast(validatedModel.message, null, true)
					return false;
				}
				validatedModel.model.id = 0;

				axios.post(apiRoutes.formulariosRoute, validatedModel.model)
				.then(res => {
					this.$refs.modelFormComponent.clearForm()
					this.formdata.push(res.data)
				}).catch(error => {
					console.log(error);
					this.showErrorToast()
				})
			},
			onAddClicked(data, index) {
				this.onEdit = false;
				this.model = {}
			},
			onDetailsClicked(data, index) {
				this.navegarSiguienteNivel(data.id)		
			},
			navegarSiguienteNivel(id) {
				this.$router.push({ name: 'respuestas', params: { formularioId: id }})
			},onShowClicked(data, index) {
				this.verRegistros(data.id)		
			},verRegistros(id) {
				this.$router.push({ name: 'table_respuestas', params: { formularioId: id }})
			}
			

		}, beforeCreate () {
			axios.all([
				axios.get(apiRoutes.formulariosRoute),
				])
			.then(axios.spread(res => {

				this.formdata = res.data


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