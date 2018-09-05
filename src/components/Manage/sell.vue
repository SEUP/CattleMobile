<template>
	<Page class="page">
		<ActionBar title="การจำหน่าย">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
			<ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" />
		</ActionBar> 
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			<Label text="ชื่อ " />
			<TextField v-model="textFieldName " hint="ชื่อ...  " />
			<Label text="เบอร์หู " />
			<TextField v-model="textFieldNumber " hint="เบอร์หู...  " />
			<Label text="วัน/เดือน/ปี " />
			<TextField v-model="textFieldValue " hint="วัน/เดือน/ปี... " />
			<Label text="หมายเหตุการจำหน่าย " />
			<ListPicker :items="listPickerNote " v-model="selectedListPickerIndex " />
		</StackLayout>
	</Page>
</template>

<script>
export default {
    data() {
        return {
            listPickerNote: ["ขาย ", "ทำลาย "],
            selectedListPickerIndex: 0,

            textFieldValue: " "
        };
    }
};
</script>

<style>
</style>
