<script>
import { store, themeColor } from '@/mixins'

import Greeting from '@c/Greeting'
import TasksDo from '@c/tasks/Do'
import TasksAll from '@c/tasks/All'

export default {
    components: { Greeting, TasksDo, TasksAll },
    mixins: [
        themeColor({ dark: 'black', light: 'white' }),
        store({
            getters: {
                workspace: 'workspaces/current',
            },
        })
    ],
    props: { 
        view: { type: String, default: 'do', } 
    },
    data: () => ({
        transition: 'opacity-slide-right',
    }),
    methods: {
        setView(name) {
            this.$router.replace({ ...this.$route, query: { ...this.$route.query, view: name }})
        },
    },
    computed: {
        TaskListView() {
            if(this.isDo) {
                return 'tasks-do'
            } else if(this.isAll) {
                return 'tasks-all'
            } else if(this.isToday) {
                return 'tasks-today'
            }
        },
        isDetailActive() {
            return [ 'Tasks.Create', 'Tasks.Detail' ].includes(this.$route.name)
        },
        isDo() {
            return !this.isToday && !this.isAll
        },
        isAll() {
            return this.view == 'all'
        },
        isToday() {
            return this.view == 'today'
        },
    },
    watch: {
        '$route': function(to, from) {
            if(from.query.view == 'do' || from.query.view == undefined) {
                this.transition = 'opacity-slide-left'
            } else if(from.query.view == 'all') {
                this.transition = 'opacity-slide-right'
            }
        }
    },
}
</script>

<style>

</style>
