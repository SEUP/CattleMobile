<template>
	<Page class="page">
		<ActionBar title="การขุน">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
			<ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" />
		</ActionBar> 
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			<Label text="เริ่มขุน" />
				<Label text="เริ่มขุน" />
				<Label text="วันที่เริ่มขุน" />
				<TextField v-model="textFieldStartKhun" hint="วัน/เดือน/ปี...ที่เริ่มขุน" />
				<Label text="น้ำหนัก" />
				<TextField v-model="textFieldWeight" hint="น้ำหนักที่เริ่มขุน..." />
				<Label text="ความยาวลำตัว" />
				<TextField v-model="textFieldLong" hint="ความยาวลำตัว..." />
				<Label text="รอบอก" />
				<TextField v-model="textFieldChest" hint="รอบอก..." />
				<Label text="ความสูง" />
				<TextField v-model="textFieldHigh" hint="ความสูง..." />

				<Label text="สิ้นสุดการขุน" />
				<Label text="วันที่สิ้นสุดการขุน" />
				<TextField v-model="textFieldEndKhun" hint="วัน/เดือน/ปี...ที่สิ้นสุดการขุน" />
				<Label text="น้ำหนัก" />
				<TextField v-model="textFieldWeight" hint="น้ำหนักที่สิ้นสุดการขุน..." />
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
