<template>
    <Page class="page" actionBarHidden="true" > 

            <StackLayout  class="bg" orientation="vertical"> 
            <WrapLayout class="header" style="margin-top:4%; margin-left:4%;" orientation="horizontal" height="70">
		
                   	<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
					       <Avatar/>
				</WrapLayout>
				<WrapLayout @tap="profile" style=" padding-left:3%;width:80%; height:100%;" orientation="vertical">
					<Label style="margin-top:10%; color:white; font-size:25px;" :text="`${user.firstname} ${user.lastname}`" />
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
								<Label style="margin-top:10%; color:white; font-size:25px;" text="พ่อพันธ์ุ" />
								<Label style="color:white;" text="จัดการข้อมูลพ่อพันธุ์โคของคุณเช่น เพิ่ม ลบ แก้ไข" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listFemaleBreed" row="1" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/89a1f4bca6a4e5185f942eaed214b90b.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:25px;" text="แม่พันธ์ุ" />
								<Label style="color:white;" text="จัดการข้อมูลแม่พันธ์ุโคของคุณเช่น เพิ่ม ลบ แก้ไข" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listMeatBreed" row="2" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/578fe9ccdf5f8752c0be6ff4dd6f065a.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:25px;" text="โคขุน" />
								<Label style="color:white;" text="จัดการข้อมูลโคขุนของคุณเช่น เพิ่ม ลบ แก้ไข" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listYoungBreed" row="3" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://www.img.in.th/images/4cbed897568f2144aa716d11c3d2a782.png" />
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:25px;" text="โคแรกเกิด" />
								<Label style="color:white;" text="จัดการข้อมูลโคแรกเกิดของคุณเช่น เพิ่ม ลบ แก้ไข" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listProfile" row="4" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-128.png"
								/>
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:25px;" text="ข้อมูลผู้ใช้" />
								<Label style="color:white;" text="จัดการข้อมูลผู้ใช้ของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

					<WrapLayout @tap="listFarm" row="5" style="padding-top:8%;" orientation="horizontal" height="70">
						<WrapLayout class="btns" orientation="horizontal">
							<WrapLayout style="  width:20%; height:100%;" orientation="horizontal">
								<Image style="margin:10%; height:50;width:50;" src="https://cdn0.iconfinder.com/data/icons/free-skycons-mix-april-1/128/yumminky-skycons-mix-01-128.png"
								/>
							</WrapLayout>
							<WrapLayout style=" width:80%; height:100%;" orientation="vertical">
								<Label style="margin-top:10%; color:white; font-size:25px;" text="ข้อมูลฟาร์ม" />
								<Label style="color:white;" text="จัดการข้อมูลฟาร์มของคุณ" />
							</WrapLayout>
						</WrapLayout>
					</WrapLayout>

 


				</GridLayout>
			</ScrollView>

            </StackLayout>  

     
    </Page>
</template>

<script>

    import {mapState} from 'vuex'
    import Avatar from "./Farmer/Avatar";
   
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
            await this.$store.dispatch("district/getProvinces")

        },
        async mounted() {
            console.log("Home Mounted ")
            await this.$store.dispatch("user/downloadAvatar")
        },
        methods: {


            listMaleBreed: function () {
                this.$router.push('/malebreed')
            },
            listFemaleBreed: function () {
                this.$router.push('/femalebreed')
            },
            listMeatBreed: function () {
                this.$router.push('/meatbreed')
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

