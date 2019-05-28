<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  props: ['options'],
  mixins: [ reactiveProp ],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>