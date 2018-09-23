<template>
	<Page class="page">
		<ActionBar title="การแจ้งเตือน">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
		</ActionBar> 
    	 	<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>
				 <ListView class="list-group" for="noti in data"  style="height:1250px">
            <v-template>
                <StackLayout v-if="noti.title" flexDirection="row" class="list-group-item"> 
                <Label :text="noti.title" class="list-group-item-heading" style="width: 100%" />
								<Label :text="$moment(noti.start).format('dddd-DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 100%" />
                </StackLayout>
            </v-template>
            </ListView>
			</StackLayout>
		</ScrollView>

    
	</Page> 
</template>

<script>
import DatePickerModal from "./Modal/DatePickerModal";
import Choice from "./Modal/Choice";
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return { 
			form:{},
			data:{}
		};
    },async created() {
			      this.$store.dispatch("mobile/allowBack",'home')
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
	methods:{

		load :async function(){ 
					 let dataficationChangeState = await this.$store.dispatch("cattle/dataNotification",this.user.id);
					 this.data = dataficationChangeState;
			},
	
		 
  },
    
};
</script>

<style>
</style>
