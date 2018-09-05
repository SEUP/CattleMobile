<template>
	<Page class="page">
		<ActionBar title="การหย่านม">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
			<ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" />
		</ActionBar> 
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			<Label text="ข้อมูลเเรกเกิด" />
				<Label text="วันที่เกิด" />
				<TextField v-model="textFieldStartMilk" hint="วัน/เดือน/ปี...เเรกเกิด" />
				<Label text="น้ำหนัก" />
				<TextField v-model="textFieldWeight" hint="น้ำหนักที่เเรกเกิด..." />
				<Label text="ความยาวลำตัว" />
				<TextField v-model="textFieldLong" hint="ความยาวลำตัว..." />
				<Label text="รอบอก" />
				<TextField v-model="textFieldChest" hint="รอบอก..." />
				<Label text="ความสูง" />
				<TextField v-model="textFieldHigh" hint="ความสูง..." />

				<Label text="ข้อมูลเมื่อหย่านม" />
				<Label text="วันที่สิ้นสุดการขุน" />
				<TextField v-model="textFieldEndMilk" hint="วัน/เดือน/ปี...ที่ข้อมูลเมื่อหย่านม" />
				<Label text="น้ำหนัก" />
				<TextField v-model="textFieldWeight" hint="น้ำหนักที่ข้อมูลเมื่อหย่านม..." />
				<Label text="ความยาวลำตัว" />
				<TextField v-model="textFieldLong" hint="ความยาวลำตัว..." />
				<Label text="รอบอก" />
				<TextField v-model="textFieldChest" hint="รอบอก..." />
				<Label text="ความสูง" />
				<TextField v-model="textFieldHigh" hint="ความสูง..." />

		</StackLayout>
	</Page>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style>
</style>
