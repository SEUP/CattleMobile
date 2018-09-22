<template>
   <StackLayout>
        <Image v-if="!cattle.image_url" src="~/images/logo.png" class="avatar"/> 
        <Image v-else :src="$baseUrl+cattle.image_url" class="avatar"/>
   </StackLayout>
 
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "AvatarCattle",
         props: {
             cattle:[Object]
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                userImage: state => state.user.userImage,
            })
        },
        async mounted() {
            console.log("Home Mounted ")
            await this.$store.dispatch("user/downloadAvatar")
        },
        methods: {
            ValidURL: function (str) {
                let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (regexp.test(str)) {
                    return true;
                }
                return false;
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
</style>