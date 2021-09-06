<template>
  <div class="chart">
    <div class="row">
      <div class="col-md-2 text-left">
        <b-form-select v-model="selected">
          <b-form-select-option value="">select</b-form-select-option>
          <b-form-select-option v-for="option in 12" :value="option.toString()"
                                :key="option">{{ option }}
          </b-form-select-option>
        </b-form-select>
      </div>
    </div>
    <BarChart v-bind="barChartProps"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {Chart, registerables} from "chart.js";
import {BarChart, useBarChart} from "vue-chart-3";
import messageServices from "@/services/messageServices";

Chart.register(...registerables);

export default defineComponent({
  name: "Chart",
  components: {
    BarChart,
  },
  setup() {
    let data = ref<number[]>([]);
    let labels = ref<string[]>([]);
    let selected = ref();

    const chartData = computed(() => {
      let dataValue = data.value;
      if (selected.value) {
        dataValue = dataValue.map(function (value) {
          return value / (24/selected.value)
        })
      }

      return {
        labels: labels.value,
        datasets: [
          {
            data: dataValue,
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      }
    });

    onMounted(() => {
      apiCall();
    });

    const apiCall = async () => {
      const response = await messageServices.charts();
      data.value = Object.values(response.data);
      labels.value = Object.keys(response.data);
    };

    const {barChartProps, barChartRef} = useBarChart({
      chartData,
    });

    return {barChartProps, barChartRef, selected};
  },
});
</script>
