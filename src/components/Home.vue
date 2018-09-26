<template>
    <Page class="page" actionBarHidden="true" > 

            <StackLayout  class="bg" orientation="vertical"> 
            <WrapLayout  class="header" style="margin-top:4%; margin-left:4%;" orientation="horizontal" height="70">
		
                   	<WrapLayout style=" width:120px; height:120px; " orientation="horizontal">
					       <Avatar/>
				</WrapLayout>
				<WrapLayout @tap="profile" style=" padding-left:3%;width:80%; height:100%;" orientation="vertical">
					<Label style="margin-top:10%; color:white; font-size:20px;" :text="`${user.firstname} ${user.lastname}`" />
					<Label style="color:white;" :text="user.email" />
				</WrapLayout>
			</WrapLayout>
            <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:5%; height:100%;">
				<GridLayout rows="auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto">

					<WrapLayout @tap="listMaleBreed" row="0" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.live/images/2018/09/03/we.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="พ่อพันธ์ุ" />
								<Label style="color:white;" text="จัดการข้อมูลพ่อพันธุ์โคของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listFemaleBreed" row="1" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/89a1f4bca6a4e5185f942eaed214b90b.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="แม่พันธ์ุ" />
								<Label style="color:white;" text="จัดการข้อมูลแม่พันธ์ุโคของคุณ " />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listMeatBreed" row="2" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/578fe9ccdf5f8752c0be6ff4dd6f065a.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="โคขุน" />
								<Label style="color:white;" text="จัดการข้อมูลโคขุนของคุณ " />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listYoungBreed" row="3" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/4cbed897568f2144aa716d11c3d2a782.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="โคแรกเกิด" />
								<Label style="color:white;" text="จัดการข้อมูลโคแรกเกิดของคุณ " />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

						<WrapLayout @tap="listSellBreed" row="4" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="http://sg.heregotsale.com/sites/default/files/hgs/sale_icon.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="การจำหน่ายโค" />
								<Label style="color:white;" text="จัดการข้อมูลการจำหน่ายโคของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listProfile" row="5" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-128.png"
								/>
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="ข้อมูลผู้ใช้" />
								<Label style="color:white;" text="จัดการข้อมูลผู้ใช้ของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listFarm" row="6" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://cdn0.iconfinder.com/data/icons/free-skycons-mix-april-1/128/yumminky-skycons-mix-01-128.png"
								/>
							</WrapLayout> 
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="ข้อมูลฟาร์ม" />
								<Label style="color:white;" text="จัดการข้อมูลฟาร์มของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout> 

					<WrapLayout @tap="listNoti" row="7" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Mail-512.png"
								/>
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:20px;" text="การแจ้งเตือน" />
								<Label style="color:white;" text="ดูการแจ้งเตือนทั้งหมดของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>
				<WrapLayout row="8" style="padding-top:8%;" orientation="horizontal" height="100"></WrapLayout>
 


				</GridLayout>
			</ScrollView>

            </StackLayout>  

     
    </Page>
</template>

<script>

    import { mapGetters, mapState } from "vuex";
    import Avatar from "./Farmer/Avatar";
   	 import  * as LocalNotifications from "nativescript-local-notifications";
 

    export default {
        components: {Avatar},
        data() {
            return {}
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                userImage: state => state.user.userImage,
            })
        },
        async created() {
		
		 this.$store.dispatch('cattle/loadSell', this.user.id)
			 this.$store.dispatch("mobile/screenLock")
			 this.$store.dispatch("mobile/blockBack")
            await this.$store.dispatch("district/getProvinces")
			 
        },
        async mounted() {
          	 this.$store.dispatch("mobile/blockBack")
			await this.$store.dispatch("user/downloadAvatar")
	 
			this.checkState();
        },
        methods: {
			
			checkState :async function(){
				let notification = await this.$store.dispatch("cattle/getNotificationState");
				
			 	if(notification == "0"){  
					 let notificationChangeState = await this.$store.dispatch("cattle/setNotificationState");
					 let dataficationChangeState = await this.$store.dispatch("cattle/dataNotification",this.user.id);
					 let notiData = {};
					 for(let i=0; i < dataficationChangeState.length; i++ ){
						 	if(dataficationChangeState[i].title){
								   alert({
                            title: "การเเจ้งเตือนล่าสุด",
                            message: dataficationChangeState[i].title,
                            okButtonText: "ตกลง"
                            }); 
								 notiData.title = dataficationChangeState[i].title ;
								 notiData.start = dataficationChangeState[i].start;
								 break;
							 }
					 }
					notiData.start  =  this.$moment(notiData.start).format('dddd-DD-MM-YYYY');
					this.notification(notiData); 
				 }
			},

			startNotification(){
				 LocalNotifications.addOnMessageReceivedCallback(
				function (notification) {
					console.log("ID: " + notification.id);
					console.log("Title: " + notification.title);
					console.log("Body: " + notification.body);
					  alert({
                            title: "การเเจ้งเตือนล่าสุด",
                            message: $moment(notification.title).format('dddd-DD-MM-YYYY'),
                            okButtonText: "ตกลง"
                            });
				
				}
			).then(
				function () {
					console.log("Listener added");
				}
			)
			}, 
			notification(data){
				this.startNotification();
			LocalNotifications.schedule([{
					id: 1,
					title: data.title,
					body: data.start,
					ticker: "Cattle Farmer",
					at: new Date(new Date().getTime() + (5 * 1000))
				}]).then(() => {
					console.log("Notification scheduled");
				}, (error) => {
					console.log("ERROR", error);
				});  
			
			},
            listMaleBreed: function () {
                this.$router.push('/malebreed')
            },
            listFemaleBreed: function () {
                this.$router.push('/femalebreed')
            },
            listMeatBreed: function () {
                this.$router.push('/meatbreed')
			},
			 listSellBreed: function () {
				   
                this.$router.push('/Sellbreed')
            },
            listYoungBreed: function () {
                this.$router.push('/youngbreed')
            },
            listProfile: function () {
                this.$router.push('/profile')
            },
            listFarm: function () {
                this.$router.push('/farm')
			},
			listNoti: function () {
                this.$router.push('/Notificate')
            },
        }
    }
</script>

<style scoped>
   	.border {
		border-style: solid;
		border-width: 7px;
		border-color: white;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
        border-radius: 50%;  
	}
 	.bg {
 
			background: rgba(73, 155, 234, 1);
 
    } 
	.btns {

		background: rgba(0, 96, 186, 1); 
	}
</style>

