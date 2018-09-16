<template>
 <Page class="page">
        <ActionBar title="การจัดการ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>
   
        </ActionBar>
        <StackLayout  class="bg" orientation="vertical"> 
 			<WrapLayout orientation="vertical" style="background:white;">
				<Label style="margin-top:4%; margin-left:5%; color:black; font-size:30%;" text="เลือกเมนู" />
				<Label style="margin-top:1%; margin-left:5%; color:black;" text="สำหรับจัดการโคของคุณ" />
			</WrapLayout> 
        <ScrollView orientation="horizontal">
				<ListView class="list-group" for="country in countries" @itemTap="onItemTap" style="margin-top:5%; background:white; height:100%;">
					<v-template>
						<FlexboxLayout @tap="goLink(country.link)" v-if="country.type == 'nal' || country.type == data.type "  flexDirection="row" class="list-group-item">
							<Image :src="country.imageSrc" class="thumb img-circle" />
							<Label :text="country.name" class="list-group-item-heading" style="width: 100%;" />
						</FlexboxLayout>
					</v-template>
				</ListView>
			</ScrollView> 
        </StackLayout>
 </Page>
</template>

<script>
export default {
      props: {
            cattle: [Object],
        },
    data() {
	    return {
            countries: [
                {
                    name: "การเปลี่ยนประเภทโค",
                    imageSrc:  "https://freeiconshop.com/wp-content/uploads/edd/edit-flat.png",
                    type:"nal",
                    link:"change",
                },
                {
                    name: "การผสมพันธุ์",
                    imageSrc: "https://image.flaticon.com/icons/png/512/194/194627.png",
                         type:"020100",
                         link:"mbreed",
                },
                 {
                    name: "การผสมพันธุ์",
                    imageSrc: "https://image.flaticon.com/icons/png/512/194/194627.png",
                        type:"020200",
                        link:"fbreed",
                },
                {
                    name: "การขุน",
                    imageSrc:  "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png",
                        type:"020300",
                        link:"khun",
                },
                {
                    name: "การฉีดวัคซีน",
                    imageSrc: "https://www.mainstreetfamilycare.com/wp-content/uploads/2017/03/service-icon-vaccines.png",
                    type:"nal",
                    link:"vaccine",
                },
                {
                    name: "ถ่ายพยาธิ",
                    imageSrc: "http://cdn.onlinewebfonts.com/svg/img_52430.png",
                    type:"nal",
                    link:"worms",
                },
                {
                    name: "การรักษา",

                    imageSrc: "https://www.shareicon.net/download/2016/08/18/813848_people_512x512.png",
                    type:"nal",
                    link:"doctor",
                },
                {
                    name: "การหย่านม",
                    imageSrc: "https://www.smahcp.co.uk/content/media/1710/icon_03_1l.png",
                        type:"020400",
                        link:'milk'
                },
                {
                    name: "การจำหน่าย",
                    imageSrc: "https://www.amerinotexchange.com/wp-content/uploads/2015/06/valuable-sell-mort-icon6-1.png",
                    type:"nal",
                    link:"sell",
                }
            ],
            data:{},
	    };
    },created() {
        this.load();
    },methods:{
        goLink(link){
           this.$router.push({ name:link,params: {cattle: this.data} })
       
        },
        load(){
            
              this.data =  this.$route.params.cattle; 
        }
    }
}
</script>

<style>
.page,.bg{
    background-color:white;
}
</style>