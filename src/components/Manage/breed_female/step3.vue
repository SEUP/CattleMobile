<template>
	<Page class="page">
		<ActionBar class="bg-violet" title="การผสมพันธุ์">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem @tap="gotoStep()" ios.position="right">
				<StackLayout>
					<Label class="dark" text="ถัดไป" row="0" col="0" />
				</StackLayout>
			</ActionItem>
		</ActionBar>
		<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'breeding_date')" hint="โปรดกรอกข้อมูล" :text="`${form.breeding_date ? $moment(form.breeding_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ประเภท" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'breed_type','ประเภทการผสมพันธุ์')" :text="`${getChoiceTextByID(form.breed_type) || 'ไม่ระบุ'}`" />
						</StackLayout>


						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="หมายเลขโค" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.male_number" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ชื่อโค" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.male_name" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'male_breed','พันธุ์โค')" :text="`${getChoiceTextByID(form.male_breed) || 'ไม่ระบุ'}`" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="เปอร์เซ็นต์เลือด" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.blood_percentage" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผลิตโดย" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.sperms_produced_by" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ราคา" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.charge" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
						</StackLayout>

						<StackLayout v-if="form.breed_type == '090200'" class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผู้ให้บริการ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'ivf_provider','ผู้ให้บริการผสมเทียม')" :text="`${getChoiceTextByID(form.ivf_provider) || 'ไม่ระบุ'}`" />
						</StackLayout>


					</StackLayout>
				</StackLayout>


			</StackLayout> 
		</ScrollView>
	 


	</Page>
</template>

<script>
	import DatePickerModal from "../../Modal/DatePickerModal";
	import Choice from "../../Modal/Choice";
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
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

				},
				read: async function () {

					},
					gotoStep: async function () {

							this.form.induction_date = this.$moment(this.form.induction_date).format('YYYY-MM-DD')
							let cattle = await this.$store.dispatch("breeder_female/step1", this.form);

							this.$router.push({
								name: 'step4',
								params: {
									cattle: this.data,
									form: cattle
								}
							})

						},
						load() {

							this.data = this.$route.params.cattle;
							this.form = this.$route.params.form;
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