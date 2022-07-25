<template>
    <div class="upload">
        <label for="file" class="label-file">{{ text }}</label>
        <input class="input-file" id="file" type="file" @change="previewFile">
        <div v-if="data != null" class="row">
            <h1>{{name}}</h1>
            <span class="close-icon" @click="clear"></span>
        </div>
    </div>
</template>

<script>
import getDataService from '../services/DataService.js'

const DataService = getDataService();

export default {
    name: "UploadData",
    props: {
    },
    data() {
        return {
            data: null,
            text: "Select record",
            name: "",
        }
    },
    methods: {
        previewFile(event) {
            if (event.target.files && event.target.files.length > 0) {
                let reader = new FileReader();

                reader.onload = (event) => {
                    this.data = JSON.parse(event.target.result);
                    this.loadData();
                }

                reader.readAsText(event.target.files[0]);
                this.name = event.target.files[0].name;
                this.text = "Select new record";
            }
        },
        loadData() {
            DataService.setData(this.data);
        },
        clear() {
            this.data = null;
            this.name = "";
            this.text = "Select record";
            DataService.setData(null);
        }
    }
}
</script>