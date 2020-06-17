<template>
    <div class="performance-container"> 
        <oSelection 
            class="performance-child-container" :showButtons="'selection-btn-reset'"
            v-on:selections-reseted="selectionResetted"
        />
        <oPerformanceOptions 
            class="performance-child-container"
            :selectedInteractionNames="getSelectionNames" 
            @start-measurement="startPerformancePrediction"
        />
        <oPerformanceOutput 
            class="performance-child-container"
            :resultStatus="resultStatus"
            :resultData="resultData"
            :savedLocationInfo="savedLocationPath"
            @save-measurements="saveMeasurement"
            @save-td="saveTD"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import oSelection from '@/components/03_organisms/oSelection.vue';
import oPerformanceOptions from '@/components/03_organisms/oPerformanceOptions.vue';
import oPerformanceOutput from '@/components/03_organisms/oPerformanceOutput.vue';
import { StatusEnum } from '@/util/enums';
import { mapActions, mapGetters } from 'vuex';
import { getCurrentDate } from '@/util/helpers';
import TdAnnotater from '@/backend/TdAnnotater';

export default Vue.extend({
    name: 'tPerformance',
    components: {
        oSelection,
        oPerformanceOptions,
        oPerformanceOutput
    },
    data() {
        return {
            resultData: undefined as any,
            resultStatus: StatusEnum.NOT_STARTED,
            savedLocationPath: ''
        };
    },
    computed: {
        ...mapGetters('TdStore', ['getSelections']),
        ...mapGetters('SidebarStore', ['getSavedTd']),
        // Returns name of selected interactions
        getSelectionNames() {
            const arrOfSelectionNames: any[] = [];
            ((this as any).getSelections).forEach(element => {
                arrOfSelectionNames.push(element.interactionName);
            });
            return arrOfSelectionNames;
        }
    },
    methods: {
        ...mapActions('TdStore', ['getPerformancePrediction']),
        startPerformancePrediction(settings: WADE.PerformanceMeasurementSettings) {
            // Reset location path
            this.savedLocationPath = '';
            // const {BrowserWindow} = require('electron');

            // const win = BrowserWindow.getAllWindows()[0];
            // const ses = win.webContents.session;

            // ses.clearCache(() => {
            // alert("Cache cleared!");
            // });
            this.resultStatus = StatusEnum.LOADING;
            this.resultData = (this as any).getPerformancePrediction(settings)
                .then((res) => {
                    this.resultStatus = StatusEnum.COMPUTED;
                    return res;
                })
                .catch((err) => {
                    this.resultStatus = StatusEnum.ERROR;
                    return err;
                });
        },
        // Save performance measurements
        saveMeasurement(measurements) {
            const storage = require('electron-json-storage');

            // Generate file name from names of measurement elements and add current date / time (to make it more individual)
            const key = measurements.reduce((acc, curr) => acc + curr.name + '_', '' ).toLowerCase().replace(/\s|:/g, '') + `_${getCurrentDate()}`;

            // Convert measurements into one data obj with each measurement element name as key
            const data = measurements.reduce((obj, item) => (obj[item.name] = item, obj) , {});

            // Save file
            storage.set(key, data, (error) => { if (error) throw error; });

            // Return full file path to user
            this.savedLocationPath = `Saved to: ${storage.getDataPath()}/${key}`;
        },

        // Save annotated TD to electron storage
        saveTD(measurements) {
            if (this.resultStatus !== StatusEnum.COMPUTED) return;
            const storage = require('electron-json-storage');
            const annotatedTD =
                new TdAnnotater((this as any).getSavedTd((this as any).$route.params.id), measurements).getAnnotatedTD();
            const name =
                `${(this as any).$route.params.id}_annotated_${getCurrentDate()}.json`;
            storage.set(name, annotatedTD, (error) => {
                if (error) throw error;
            });
            storage.get(name, (error, data) => {
                if (error) throw error;
                this.savedLocationPath = `Annotated TD saved to: ${storage.getDataPath()}`;
            });
        },
        selectionResetted() {
            // Reset location path
            this.savedLocationPath = '';

            // Reset result status and clear output field
            this.resultStatus = StatusEnum.NOT_STARTED;
            this.resultData = new Promise((rej, res) => {rej([]); res([]); });
        }
    }
});
</script>

<style scoped>
.performance-container {
    height: 100%;
    width: 100%;
    display: flex;
}

.performance-child-container {
    width: 33.33%;
    padding: 0px 7px 7px 7px;
}

</style>