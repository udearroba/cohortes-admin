<!--

  @version 1.4.1 - Octubre de 2019
  @author Mario Alberto Sanchez Castro - Analista de desarrollo - Ude@ Educacion Virtual <desarrollo2ude@udea.edu.co>
 
-->

<template>
	<div>
		<div class="va-row">
			<div class="flex xs12 md12">
				
				<!--<vuestic-widget :headerText="'Curaduria'"> -->
					
					

					<vue-form-generator :schema="schema" :model="model" :options="formOptions" tag="vuestic-widget">

					</vue-form-generator>

					<vuestic-widget>
						<div class="row">
							<div class="col-md-6 text-center">				
								<input type="submit" class="btn btn-micro btn-primary" @click="agregar()" :hidden="onEdit == true"/>
							</div>

							<div class="col-md-6 text-center">				
								<input type="submit" class="btn btn-micro btn-primary" value="Agregar Seccion" @click="agregarSeccion()" :hidden="onAddSection == true"/>
							</div>
							<!--</vuestic-widget>-->
						</div>

					</vuestic-widget>
				</div>
			</div>



		</div>
	</template>


	<script>
	
	import Vue from 'vue'
		import ModelTable from '../self-components/model-table/ModelTableResponse'
		import ModelForm from '../self-components/model-form/ModelForm'
		import axios from "axios"
		import DBModels from '../../models/index'
		import apiRoutes from '../../services/apiRoutes'

		export default {
			name: 'Table',
			components: {
				ModelForm,
				ModelTable,
			},
			data() {
				return {
					modeloRespuesta: DBModels.RespuestaModel,
					tableFields: [],
					response: {},
					respuestasAux: {},
					onEdit: false,
					onAddSection: false,
					indexDato: '',
					id: 1,
					model: {},
					body: {
						id: 0,
						formularioId: this.$route.params.formularioId,					 
						//fechaHora: new Date()
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

				if(this.$route.params.respuestaId != null){

					axios.all([
						axios.get(apiRoutes.getRespuestasFromId(this.$route.params.respuestaId)),
						])
					.then(axios.spread(res => {
						
						this.schema =  JSON.parse(res.data.formularioRespuestas);
						this.model =  JSON.parse(res.data.respuestas)
					}))
					.catch(error => {
						console.log(error)
						this.errored = true
					})

					this.onEdit = true;
					this.onAddSection = true;

				}else{
					let idFormulario = this.body.formularioId


					axios.all([
						axios.get(apiRoutes.getFormulariosFromId(idFormulario)),
						])
					.then(axios.spread(res => {
						var info = JSON.parse(res.data.json);
						this.schema = info
					}))
					.catch(error => {
						console.log(error)
						this.errored = true
					})
				}
			},
			methods: {
				agregar() {

					this.body.respuestas = JSON.stringify(this.model);
					if(this.body.respuestas != "{}"){

						this.body.formularioRespuestas = JSON.stringify(this.schema);

						axios.post(apiRoutes.respuestasRoute, this.body)
						.then(res => {
						this.verRegistros(this.body.formularioId, res.data)		

							this.model = {}
						})
						.catch(e => {
							this.error.push(e)
						})

					}

				},
				agregarSeccion(){

					var new_section = new Object;

					for(var i=0; i<this.schema.groups.length; i++){

						if(this.schema.groups[i].id == "0" && !this.schema.groups[i].is_child){

							this.id++;
							Object.assign(new_section, this.schema.groups[i]);
							new_section.id = this.id;
							new_section.is_child = 1;
							new_section.legend = new_section.legend  + " " + new_section.id;

							break;
						}
					}


					var new_fields = new Object;

/**var new_delete_button = new Object;
new_delete_button.type = "submit";
new_delete_button.label = "";
new_delete_button.buttonText = "Eliminar Seccion";
new_delete_button.model = "eliminarSeccion";
new_delete_button.onSubmit = function(data){console.log(this.schema)};
**/
new_fields = JSON.parse(JSON.stringify(new_section.fields));

//new_fields.push(new_delete_button);

for(var i=0; i< new_fields.length; i++){
	new_fields[i].model = new_fields[i].model + "_" + new_section.id;
	new_fields[i].label = new_fields[i].label + " (" + new_section.id + ")";

if(new_fields[i].questions){

for(var j=0; j< new_fields[i].questions.length; j++){

	new_fields[i].questions[j].name = new_fields[i].questions[j].name + " (" + new_section.id + ")";
	new_fields[i].questions[j].id = new_fields[i].questions[j].id + "_" + new_section.id;
}

}


}

new_section.fields = new_fields;

this.schema.groups.push(new_section);


},verRegistros(id, data) {
	this.$router.push({ name: 'table_respuestas', params: { formularioId: id, new_response: data }})
}



},
};


</script>

<style lang="scss">

.field-select .field-wrap select{

	padding: 0;
	
}

</style>