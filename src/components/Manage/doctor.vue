<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="create" android.systemIcon="ic_menu_save" ios.position="right" />
		</ActionBar>
		<ScrollView width="100%" height="100%;" class="bg-wh">

			<StackLayout>

				<StackLayout class="card">

					<StackLayout class="card-menu bg-violet" orientation="vertical">
						<Label text="อาการ" class="f30 dark" />
						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่สังเกตอาการ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'observation_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.observation_date ? $moment(form.observation_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>
						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ลักษณะอาการ" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.initial_symptoms" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>


						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="กลุ่มอาการ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'symptom_group','กลุ่มอาการ')" :text="`${getChoiceTextByID(form.symptom_group) || 'ไม่ระบุ'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="โรค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'disease','โรค')" :text="`${getChoiceTextByID(form.disease) || 'ไม่ระบุ'}`" />
						</StackLayout>

					</StackLayout>
				</StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
						<Label text="การรักษา" class="f30 dark" />
						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่รักษา" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'therapy_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.therapy_date ? $moment(form.therapy_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผู้รักษา" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'therapist','ผู้รักษา')" :text="`${getChoiceTextByID(form.therapist) || 'ไม่ระบุ'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วิธีการรักษา" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.therapy_method" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ยาที่รักษา" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.medication" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

					</StackLayout>
				</StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
						<Label text="ผลการรักษา" class="f30 dark" />
						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่ตรวจอีกครั้ง" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'check_therapy_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.check_therapy_date ? $moment(form.check_therapy_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผลการรักษา" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'therapy_result','ผลการรักษา')" :text="`${getChoiceTextByID(form.therapy_result) || 'ไม่ระบุ'}`" />
						</StackLayout>

					</StackLayout>
				</StackLayout>

				<ListView class="list-group" for="list in listData" style="height:1250px">
					<v-template>
						<FlexboxLayout flexDirection="row" class="list-group-item">
							<Label :text="`${getChoiceTextByID(list.disease) || 'ไม่ระบุ'}`" class="list-group-item-heading" style="width: 60%" />
							<Label :text="$moment(list.check_therapy_date).format('DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 60%" />
						</FlexboxLayout>
					</v-template>
				</ListView>

			</StackLayout>

			</StackLayout>

		</ScrollView>


	</Page>
</template>

<script>
	import DatePickerModal from "../Modal/DatePickerModal";
	import Choice from "../Modal/Choice";
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				listData: [],
				form: {},
				data: {}
			};
		},
		created() {

			this.load();
		},
		computed: {
			...mapGetters({
				getChoiceTextByID: "choice/getChoiceTextByID"
			}),
			...mapState({
				user: state => state.user.user
			})
		},
		methods: {

			create: async function () {
					//	this.form.breeding_date = this.$moment(this.form.breeding_date ).format('YYYY-MM-DD')
					let farmer = await this.$store.dispatch("treat/create", this.form);
					if (farmer == 1) {
						let data = await this.$store.dispatch(
							"cattle/load",
							this.data.farmer_id
						);
						this.read();
					}

				},
				read: async function () {
						let preData = await this.$store.dispatch("treat/read", this.data.id);
						this.listData = preData.data;
					},
					load() {

						this.data = this.$route.params.cattle;
						this.form.cattle_id = this.data.id;
						this.read();
					},
					setChoice: async function (parent, key, to) {
							console.log("setChoice");
							let options = {
								fullscreen: true,
								animated: true,
								context: {
									propsData: {
										choice_id: parent[key] ? parent[key] : null,
										to: to,
										remark: parent.options ? parent.options[key] : null
									}
								}
							};
							console.log("setChoice", options);
							let result = await this.$showModal(Choice, options);
							this.$set(parent, key, result.id);
							if (result.remark) {
								if (!parent.options) {
									this.$set(parent, "options", {});
								}
								this.$set(parent.options, key, result.remark);
							} else {
								if (!parent.options) {
									this.$set(parent, "options", {});
								}
								delete parent.options[key];
							}
							console.log("setChoice", parent[key]);
						},
						setDate: async function (parent, key) {
							console.log("setDate");
							let result = await this.$showModal(DatePickerModal);
							this.$set(parent, key, result);
							console.log("setDate", parent[key]);
						}
		},

	};
</script>

<style>
</style>