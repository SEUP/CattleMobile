<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />

		</ActionBar>
		<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
						<Label text="การถ่ายพยาธิ" class="f30 dark" />



						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'worming_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.worming_date ? $moment(form.worming_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ชนิดพยาธิ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(tmp,'tmp','ชนิดพยาธิ')" :text="`${getChoiceTextByID(tmp.tmp) || 'ไม่ระบุ'}`" />
						</StackLayout>

						<StackLayout class="txt-gr">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผู้ทำ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'maker','ผู้ทำ')" :text="`${getChoiceTextByID(form.maker) || 'ไม่ระบุ'}`" />
						</StackLayout>

						<StackLayout v-if="updates == true" style="padding:15%;">
							<Button class="circle bg-success dark" @tap="updated">ยืนการแก้ไข</Button>
							<Button style="margin-top:10%;" class="circle bg-red dark" @tap="deleted">ลบ</Button>
						</StackLayout>
						<StackLayout style="padding:15%;" v-else>
							<Button class="circle bg-success dark" @tap="create">บันทึก</Button>
						</StackLayout>
					</StackLayout>

					<ListView class="list-group" for="list in listData" style="height:1250px">
						<v-template>
							<FlexboxLayout @tap="update(list)" flexDirection="row" class="list-group-item">
								<Label :text="`${getChoiceTextByID(list.worming_type) || 'ไม่ระบุ'}`" class="list-group-item-heading" style="width: 60%" />
								<Label :text="$moment(list.worming_date).format('DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 60%" />
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
				tmp: {},
				form: {
					worming_type: []
				},
				data: {},
				updates: false,
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

			update: async function (parms) {
					this.updates = true;
					this.form = parms;
					this.tmp.tmp = parms.worming_type;

				},
				updated: async function () {
						this.updates = false;
						this.form.worming_type = this.tmp.tmp;

						let farmer = await this.$store.dispatch("worm/update", this.form);
						if (farmer == 1) {
							this.load();
							this.read();
							this.$router.go(-1);
						}
					},

					deleted: async function () {
							this.updates = false;

							let farmer = await this.$store.dispatch("worm/delete", this.form);
							if (farmer == 1) {
								this.load();
								this.read();
								this.$router.go(-1);
							}
						},

						create: async function () {

								this.form.worming_type[0] = {
									id: this.tmp.tmp,
									parent: '070000',
								}
								// alert(this.form.worming_type.length);
								let farmer = await this.$store.dispatch("worm/create", this.form);
								if (farmer == 1) {
									this.read();
									this.$router.go(-1);
								}

							},
							read: async function () {
									let preData = await this.$store.dispatch("worm/read", this.data.id);
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