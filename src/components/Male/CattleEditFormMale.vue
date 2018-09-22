<template>
    <Page class="page">
        <ActionBar title="แก้ไข">
            <NavigationButton text="Go Back"  android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
            <ActionItem ios.systemIcon="3"  @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
            <ActionItem @tap="deleteCattle"   color="red" ios.systemIcon="1" android.systemIcon="ic_menu_delete" ios.position="right" />
        </ActionBar>
        <StackLayout class="bg" orientation="vertical">

            <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:2%; height:100%;">
                <StackLayout>
                    <StackLayout class="card">
                    <AvatarCattle  :cattle="form"/> 
                       
                    <GridLayout rows="auto" columns="*,*,*">
                    <Button row="0" col="0" class="change-image" @tap="selectImage">เลือกภาพ</Button>
                    <Button row="0" col="1" class="change-image" @tap="captureImage">ถ่ายภาพ</Button>
                    
                </GridLayout> 
                        <StackLayout class="card-menu " style="background-color:#6A5ACD;" orientation="vertical">
                            <Label :text="$baseUrl+'/api/v1/farmer/cattles/'+form.id+'/avatar'" class=" dark" />
                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="ชื่อ" row="0" col="0" />
                                </StackLayout>
                          
                                <TextField v-model="form.name" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
                            </GridLayout>

                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="เบอร์หู" row="0" col="0" />
                                </StackLayout>
                                <TextField v-model="form.ear_number" class="gr-text" row="0" col="1" hint="โปรดกรอกข้อมูล" />
                            </GridLayout>

                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="วันเกิด" row="0" col="0" />
                                </StackLayout>
                                <TextField class="gr-text" row="0" col="1" @tap="setDate(form,'birth_date')" hint="โปรดกรอกข้อมูล"
                                    :text="`${ form.birth_date ? $moment(form.birth_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
                            </GridLayout>

                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="อายุ" row="0" col="0" />
                                </StackLayout>
                                <TextField :text="yearOld()+'ปี'+' '+monthOld()+'เดือน'" class="gr-text" row="0" col="1"
                                    hint="โปรดกรอกข้อมูล" />
                            </GridLayout>


                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="วันที่ซื้อ" row="0" col="0" />
                                </StackLayout>
                                <TextField class="gr-text" row="0" col="1" @tap="setDate(form,'buy_date')" hint="โปรดกรอกข้อมูล"
                                    :text="`${ form.buy_date ? $moment(form.buy_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
                            </GridLayout>

                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
                                </StackLayout>
                                <TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'cattle_breeding','พันธุ์โค')"
                                    :text="`${getChoiceTextByID(form.cattle_breeding) || 'ไม่ระบุ'}`" />
                            </GridLayout>

                            <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="แหล่งที่มา" row="0" col="0" />
                                </StackLayout>
                                <TextField class="gr-text" row="0" col="1" @tap="setChoice(form,'cattle_source','แหล่งที่มา')"
                                    :text="`${getChoiceTextByID(form.cattle_source) || 'ไม่ระบุ'}`" />
                            </GridLayout>
                            <Button text="การจัดการ" class="circle" style="background-color:white; color:#284677;" @tap="gotoManage" />

                        </StackLayout>
                    </StackLayout>

                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
    import DatePickerModal from "../Modal/DatePickerModal";
    import Choice from "../Modal/Choice";
    import { mapGetters,  mapState} from "vuex";
    import * as imagepicker from "nativescript-imagepicker";
    import * as camera from "nativescript-camera";
    import { Image } from "ui/image";
    import * as imageSource from "tns-core-modules/image-source";
    import * as permissions from "nativescript-permissions";
    import AvatarCattle from "./AvatarCattle"
const ImageCropper = require("nativescript-imagecropper").ImageCropper;
    import { isAndroid, isIOS,device,screen} from "platform";

    export default {
        name: "CattleEditForm",
        components: {
            AvatarCattle,
        },
        props: {
            cattle: [Object],
        },
        data() {
            return {
                x: "Start",
                form: {},
                formTo: {},
                  imageCropper: new ImageCropper(),
            }
        },
        created() {
            this.breederMale();
            let link ='malebreed';
            if(this.form.cattle_type == '020100'){
                link ='malebreed';
            }else if(this.form.cattle_type == '020200'){
                link ='femalebreed';
            }else if(this.form.cattle_type == '020300'){
                link ='meatbreed';
            }else if(this.form.cattle_type == '020400'){
                link ='youngbreed';
            }else{
                link ='malebreed';
            }
            this.$store.dispatch("mobile/allowBack",link)

        },
        computed: {
            ...mapGetters({
                getChoiceTextByID: "choice/getChoiceTextByID"
            }),
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            clear(){
                const getFrameById = require("tns-core-modules/ui/frame").getFrameById;

                const navigationEntry = {
                    moduleName: "malebreed",
                    // Prevent user from going back using `clearHistory` property.
                    clearHistory: true
                };
                const frame = getFrameById("firstFrame");
                frame.navigate(navigationEntry)
            },
             
            gotoManage() {
                let data_cattle_send = {
                    id: this.form.id,
                    type: this.form.cattle_type,
                    farmer_id: this.form.farmer_id
                }
                this.$router.push({
                    name: 'manage_cattle',
                    params: {
                        cattle: data_cattle_send
                    }
                })

            },
            deleteCattle() {
                let de = 0;
                confirm({
                    title: "การลบข้อมูล",
                    message: "คุณแน่ใจใช่ไหมที่จะลบข้อมูล",
                    okButtonText: "ลบข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(result => {

                    if (result) {

                        this.deleteCattleOK();

                    }
                });


            },
            deleteCattleOK: async function () {

                    let farmer = await this.$store.dispatch("cattle/deleteCattle", this.form);
                    let data = await this.$store.dispatch("cattle/load", this.form.farmer_id);
                    this.$router.go(-2);
                },

                monthOld() {
                    return this.$moment().diff(this.form.birth_date, 'month') % 12;
                },

                yearOld() {
                    return this.$moment().diff(this.form.birth_date, 'years');;
                },
                breederMale: function () {
                    this.form = this.$route.params.cattle;
                },
                cattleTap: function () {

                },
                update: async function () {
                        this.deleteData();
                        let farmer = await this.$store.dispatch("cattle/updateCattle", this.form);

                        if (farmer == 1) {
                            let data = await this.$store.dispatch("cattle/load", this.form.farmer_id);
                            this.$router.push('/malebreed')
                        }
                    },
                    deleteData() {
                        delete this.form.updated_at;
                        delete this.form.created_at;
                        delete this.form.options;
                        delete this.form.fertilization;
                    },

                    setChoice: async function (parent, key, to) {
                            console.log("setChoice");
                            let options = {
                                fullscreen: true,
                                animated: true,
                                context: {
                                    propsData: {
                                        choice_id: parent[key] ? parent[key] : null,
                                        to: to,
                                        remark: parent.options ? parent.options[key] : null
                                    }
                                }
                            };
                            console.log("setChoice", options);
                            let result = await this.$showModal(Choice, options);
                            this.$set(parent, key, result.id);
                            if (result.remark) {
                                if (!parent.options) {
                                    this.$set(parent, "options", {});
                                }
                                this.$set(parent.options, key, result.remark);
                            } else {
                                if (!parent.options) {
                                    this.$set(parent, "options", {});
                                }
                                delete parent.options[key];
                            }
                            console.log("setChoice", parent[key]);
                        },
                        setDate: async function (parent, key) {
                            console.log("setDate");
                            let result = await this.$showModal(DatePickerModal);
                            this.$set(parent, key, result);
                            console.log("setDate", parent[key]);
                            console.log(this.form.birth_date);
                            console.log(this.form.buy_date);
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

                //console.log('selectImage', selection);
                 
                let firstImage = selection[0]; 
                console.log('image',firstImage);
                firstImage.getImageAsync(async (source) => {
                  //  console.log('source', source);
                  
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
                        let parm = {
                            id: this.$route.params.cattle.id,
                            img:url
                        }   
                      
             await this.$store.dispatch('cattle/uploadAvatar', parm);
             let temp_form = {id:this.form.farmer_id,param:this.form.id}
                     this.form = await this.$store.dispatch("cattle/getCattleById", temp_form);

                    }else{ 
                        alert('Error');
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
                    let parm = {
                            id:this.form.id,
                            img:url
                        }
                        this.form.image_url = url;
                        await this.$store.dispatch('cattle/uploadAvatar', parm) 
                     let data = await this.$store.dispatch("cattle/load", this.form.farmer_id);
                     let temp_form = {id:this.form.farmer_id,param:this.form.id}
                     this.form = await this.$store.dispatch("cattle/getCattleById", temp_form);
                }
            },
            captureImage: async function () {
                console.log('captureImage');

                let options = {width: 400, height: 400, lockSquare: true}
                if (camera.isAvailable()) {
                    if (isAndroid) {
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
                    if (!isAndroid) {
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
    .page {
        background-color: white;
    }

    .wh {
        color: white;
    }
</style>