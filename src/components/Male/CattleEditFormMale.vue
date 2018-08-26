<template>
    <Page  class="page">
        <ActionBar title="แก้ไขพ่อพันธ์ุ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <ScrollView>
        <StackLayout class="form">
       
    
<TextField class="wh" v-model="form.id" hint="Enter text..." />
<TextField class="wh" v-model="form.farmer_id" hint="Enter text..." />
<TextField class="wh" v-model="form.ear_number" hint="Enter text..." />
<TextField class="wh" v-model="form.name" hint="Enter text..." />
<TextField class="wh" v-model="form.male_breed_id" hint="Enter text..." />
<TextField class="wh" v-model="form.female_breed_id" hint="Enter text..." />
<TextField class="wh" v-model="form.pregnancy_status" hint="Enter text..." />
<TextField class="wh" v-model="form.number_children" hint="Enter text..." />
<TextField class="wh" v-model="form.birth_date" hint="Enter text..." />
<TextField class="wh" v-model="form.buy_price" hint="Enter text..." />
<TextField class="wh" v-model="form.buy_date" hint="Enter text..." />
<TextField class="wh" v-model="form.weight" hint="Enter text..." />
<TextField class="wh" v-model="form.height" hint="Enter text..." />
<TextField class="wh" v-model="form.body_length" hint="Enter text..." />
<TextField class="wh" v-model="form.chest" hint="Enter text..." />
<TextField class="wh" v-model="form.image_url" hint="Enter text..." />
<TextField class="wh" v-model="form.options" hint="Enter text..." />
<TextField class="wh" v-model="form.cattle_status" hint="Enter text..." />
<TextField class="wh" v-model="form.cattle_breeding" hint="Enter text..." />
<TextField class="wh" v-model="form.cattle_type" hint="Enter text..." />
<TextField class="wh" v-model="form.cattle_sex" hint="Enter text..." />
<TextField class="wh" v-model="form.cattle_source" hint="Enter text..." />
<TextField class="wh" v-model="form.created_at" hint="Enter text..." />
<TextField class="wh" v-model="form.updated_at" hint="Enter text..." />
<TextField class="wh" v-model="form.khun" hint="Enter text..." />
<TextField class="wh" v-model="form.birth" hint="Enter text..." />


        </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        name: "CattleEditForm",
        props: {
            cattle: [Object],
        },
         data() {
            return {
                x:"Start",
                form: {}, 
            }
        },
         created() {
            this.breederMale();
        },
        methods: {
            breederMale: function () {
                this.form =  this.$route.params.cattle; 
            },
            cattleTap: function () {

            },
            update: async function(){
                  let farmer = await this.$store.dispatch("cattle/updateCattle", this.form);
                  if(farmer == 1){
                      this.$router.go(-1);
                  }
            }
        }
    }
</script>

<style scoped>
    .wh{color:white;}
</style>