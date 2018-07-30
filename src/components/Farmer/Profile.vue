<template>
    <Page class="page">
        <ActionBar title="ข้อมูลส่วนตัว">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back"/>
        </ActionBar>
        <StackLayout>
            <StackLayout row="0" class="user-profile">
                <Avatar/>

                <GridLayout rows="auto" columns="*,*,*">
                    <Button row="0" col="0" class="change-image" @tap="selectImage">เลือกภาพ</Button>
                    <Button row="0" col="1" class="change-image" @tap="captureImage">ถ่ายภาพ</Button>
                    <Button row="0" col="2" class="change-image" @tap="editProfile">แก้ไขข้อมูล</Button>
                </GridLayout>

            </StackLayout>

            <StackLayout class="data-form">
                <StackLayout class="data-item">
                    <Label class="label">ชื่อ-นามสกุล</Label>
                    <Label class="text">{{user.firstname}} {{user.lastname}}</Label>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">อีเมล์</Label>
                    <Label class="text">{{user.email}}</Label>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">รหัสประจำตัว</Label>
                    <Label class="text">{{user.personal_id}}</Label>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">ที่อยู่</Label>
                    <Label class="text"
                           :text="getAddressText">
                    </Label>
                </StackLayout>

            </StackLayout>

            <Button class="logout-btn" @tap="logout">ออกจากระบบ</Button>

        </StackLayout>
    </Page>
</template>

<script>

    import {mapState} from 'vuex'
    import * as app from "tns-core-modules/application";
    import * as imagepicker from "nativescript-imagepicker";
    import * as camera from "nativescript-camera";
    import {Image} from "ui/image";
    import * as imageSource from "tns-core-modules/image-source";
    import * as permissions from "nativescript-permissions";

    const ImageCropper = require("nativescript-imagecropper").ImageCropper;

    import Avatar from "./Avatar"

    export default {
        name: "Profile",
        components: {
            Avatar,
        },
        data() {
            return {
                imageCropper: new ImageCropper(),
            }
        },
        computed: {
            getAddressText() {
                let user = this.user;
                let district_name = user.houseDistrict ? user.houseDistrict.district_name : ''
                let amphur_name = user.houseAmphur ? user.houseAmphur.amphur_name : ''
                let province_name = user.houseProvince ? user.houseProvince.province_name : ''
                let strAddress = `${user.house_address} ${district_name} ${amphur_name} ${province_name}`

                return strAddress
            },
            ...mapState({
                user: state => state.user.user,
            })
        },
        created() {
            console.log("Profile created")
        },
        methods: {
            editProfile: async function () {
                this.$router.push('/profile-edit')
            },

            back: async function () {

                this.$router.back()
            },
            logout: async function () {
                await this.$store.dispatch('user/logout');
                this.$router.replace('/login')
            },
            ValidURL: function (str) {
                let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (regexp.test(str)) {
                    return true;
                }
                return false;
            },
            selectImage: async function () {
                console.log('selectImage');
                let options = {width: 400, height: 400, lockSquare: true}


                let context = imagepicker.create({
                    mode: "single" // use "multiple" for multiple selection
                });

                await context.authorize();
                let selection = await context.present().then((selection) => {
                    return selection
                });

                console.log('selectImage', selection);
                let firstImage = selection[0];
                firstImage.getImageAsync(async (source) => {
                    console.log('source', source);
                    let selectedImgSource = imageSource.fromNativeSource(source);

                    let args = await this.imageCropper.show(selectedImgSource, options)
                        .then((args) => {
                            return args
                        }).catch((e) => {
                            console.log(e.stack);
                        })

                    if (args.image !== null) {
                        let img = new Image();
                        img.imageSource = args.image;
                        let base64 = img.imageSource.toBase64String('jpeg')
                        let url = `data:image/jpeg;base64,${base64}`
                        this.displayImage = url;
                        // next upload image here
                        await this.$store.dispatch('user/uploadAvatar', url)

                    }
                })

            },
            croppingImage: async function (source, options) {
                console.log('croppingImage');
                let args = await this.imageCropper
                    .show(source, options)
                    .then(args => {
                        return args
                    })
                    .catch(function (e) {
                        console.dir(e.stack);
                        return null;
                    });
                if (!args) return null;
                console.dir(args);
                if (args.image !== null) {
                    let img = new Image();
                    img.imageSource = args.image;
                    let base64 = img.imageSource.toBase64String('jpeg')
                    let url = `data:image/jpeg;base64,${base64}`
                    this.displayImage = url;
                    // next upload image here

                    await this.$store.dispatch('user/uploadAvatar', url)

                }
            },
            captureImage: async function () {
                console.log('captureImage');

                let options = {width: 400, height: 400, lockSquare: true}
                if (camera.isAvailable()) {
                    if (app.android) {
                        await permissions.requestPermission([
                            android.Manifest.permission.CAMERA,
                            android.Manifest.permission.WRITE_EXTERNAL_STORAGE
                        ]).then(() => {
                            return;

                        }).catch(function () {
                            // When user denies permission
                            console.log("User denied permissions");
                        });

                        this.takingImage(options);

                    } else {
                        this.cropImage(options);
                    }
                } else {
                    if (!app.android) {
                        // to make it work in iOS emulator
                        this.takingImage({lockSquare: true});
                    }
                }

            },
            takingImage: async function (options) {
                console.log('takingImage');

                let imageAsset = await camera.takePicture({keepAspectRatio: true})
                    .then(imageAsset => {
                        return imageAsset
                    }).catch(err => {
                        console.log("Error -> " + err.message);
                    });

                if (!imageAsset) return null;

                let source = new imageSource.ImageSource();
                source = await source.fromAsset(imageAsset)
                    .then(source => {
                        return source;
                    });
                this.croppingImage(source, options);
            }
        }
    }
</script>

<style scoped>

    .data-form {
        color: white;
        background-color: #4e4e4e;
    }

    .data-item {
        padding: 10rem;
        font-size: 18rem;

        border-bottom-style: solid;
        border-bottom-width: 1rem;
        border-bottom-color: #b6b6b6;

    }

    .data-item > .label {
        font-size: 14rem;
        color: #dfdfdf

    }

    .data-item > .text {
    }

    .user-profile {
        height: auto;
    }

    .logout-btn {
        background-color: #ff3f4e;
        color: white;
        font-weight: bold;
    }

    .avatar {
        border-radius: 50%;
        width: 100rem;
        height: 100rem;
        border-width: 4rem;
        border-color: #48b1ec;
    }

    .change-image {
        width: 50%;
        margin-top: 10rem;
        border-color: white;
        border-width: 5rem;
        border-style: solid;
        background-color: #3d5afe;
        color: white;

    }
</style>