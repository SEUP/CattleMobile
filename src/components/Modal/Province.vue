<template>
    <Page class="page">
        <ScrollView>
            <StackLayout class="list">
                <GridLayout v-if="type == 'province'" @tap="closeModal(province)" roww="*" columns="*,auto"
                            class="list-item"
                            v-for="province in items">
                    <Label row="0" col="0" textWrap=true :text="province.province_name"/>
                    <Label v-if="province.province_id == province_id" row="0" col="1" textWrap=true class="fa green"
                           :text="'fa-check' | fonticon"/>
                </GridLayout>

                <GridLayout v-if="type == 'amphur'" @tap="closeModal(amphur)" roww="*" columns="*,auto"
                            class="list-item"
                            v-for="amphur in items">
                    <Label row="0" col="0" textWrap=true :text="amphur.amphur_name"/>
                    <Label v-if="amphur.amphur_id == amphur_id" row="0" col="1" textWrap=true class="fa green"
                           :text="'fa-check' | fonticon"/>
                </GridLayout>

                <GridLayout v-if="type == 'district'" @tap="closeModal(district)" roww="*" columns="*,auto"
                            class="list-item"
                            v-for="district in items">
                    <Label row="0" col="0" textWrap=true :text="district.district_name"/>
                    <Label v-if="district.district_id == district_id" row="0" col="1" textWrap=true class="fa green"
                           :text="'fa-check' | fonticon"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex';

    const _ = require('lodash');

    export default {
        props: {
            province_id: [String, Number],
            amphur_id: [String, Number],
            district_id: [String, Number],
            type: [String],
        },
        data() {
            return {
                items: null
            };
        },
        computed: {
            ...mapState({
                provinces: state => state.district.provinces,
            }),

            ...mapGetters({
                getProvinceByCode: 'district/getProvinceByCode',
                getAmphurByCode : 'district/getAmphurByCode',
                getDistrictByCode : 'district/getDistrictByCode',
            })
        },
        async mounted() {
            console.log('Province Mounted')
            if (this.type == 'province') {
                this.items = this.provinces;
            } else if (this.type == 'amphur') {
                if (!this.province_id) {
                    this.closeModal(null);
                }

                let province = this.getProvinceByCode(this.province_id)
                this.items = province.amphurs;
                // console.log(province);
            }else if (this.type == 'district'){

                if (!this.province_id && !this.amphur_id) {
                    this.closeModal(null);
                }

                let amphur = this.getAmphurByCode(this.province_id,this.amphur_id);
                this.items = amphur.districts;
            }
        },
        methods: {
            closeModal: function (item) {
                this.$modal.close(item)
            }
        }
    };
</script>

<style scoped>

    .green {
        color: green;
    }

    .page {
        padding-left: 10rem;
        padding-right: 10rem;
    }

    .list {
        margin-left: 10rem;
        margin-right: 10rem;
    }

    .list-item {
        border-bottom-color: #9e9e9e;
        border-bottom-width: 1rem;
        border-bottom-style: solid;
        padding-top: 15rem;
        padding-bottom: 15rem;
        font-size: 20rem;

    }
</style>
