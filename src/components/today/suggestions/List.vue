<script>
import TasksList from '@c/tasks/List'

export default {
    extends: TasksList,
    props: {
        filter: false,
    },
    computed: {
        displayTasks() {
            const inPast = { $lte: moment().endOf('day') }

            return this.$store.getters['tasks/find']({ query: { 
                today: null,
                doneAt: null, 
                $or: [
                    { deadline: inPast },
                    { remindAt: inPast }
                ]
            }}).data
        }
    }
}
</script>

<style>

</style>
