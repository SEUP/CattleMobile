<template>
	<Page class="page">
		<ActionBar title="เปลี่ยนประเภทโค">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
		</ActionBar>
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			<Button @tap="preUpdate()" style="margin-top:5%; color:white;" class="circle bg-violet wh" text="เลือกประเภทที่ต้องการเปลี่ยน"/>
		</StackLayout>
	</Page>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      data: {}
    };
  },
  methods: {
    preData() {
      this.form.id = this.data.id;
    },
    preUpdate() {
      let type = "";
      let options = {
        title: "เลือกประเภทโคที่ต้องการเปลี่ยน",
        cancelButtonText: "ยกเลิก",
        actions: ["พ่อพันธ์ุ", "แม่พันธุ์", "โคขุน", "โคแรกเกิด"]
      };
      action(options).then(result => {
        if (result == "พ่อพันธ์ุ") {
          type = "020100";
        }
        if (result == "แม่พันธุ์") {
          type = "020200";
        }
        if (result == "โคขุน") {
          type = "020300";
        }
        if (result == "โคแรกเกิด") {
          type = "020400";
    }
       
      if(type != ''){
	  this.form.cattle_type = type;
      this.update();
    }

      });
   

    },
    update: async function() {
      this.preData();
      let farmer = await this.$store.dispatch("change_type/update", this.form);
      if (farmer == 1) {
        let data = await this.$store.dispatch(
          "cattle/load",
          this.data.farmer_id
        );
        this.$router.go(-1);
      }
    },
    load() {
      this.data = this.$route.params.cattle;
    }
  },
  created() {
    this.load();
  }
};
</script>

<style>
</style>
