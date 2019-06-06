import States from '@/assets/js/State'
import { escape } from 'lodash'

export default function(data, { store, Model, Models }) {
    return {
        state: 0,
        title: '',
        doneAt: null,
        description: '',
        workspaceId: null,
        waiting: null,
        deadline: null,
        today: null,
        tags: [],

        get workspace() {
            return store.getters['workspaces/withStandard'].filter(workspace => workspace.id === this.workspaceId)[0] || store.getters['workspaces/getStandard']
        },
        get fullTags() {
            return Models.Workspace.findInStore({ query: { id: { $in: this.tags } } }).data
        },
    
        get deadlineAsDate() {
            if(!this.deadline || this.deadline instanceof Date) {
                return this.deadline
            }
    
            return new Date(this.deadline)
        },
        set deadlineAsDate(value) {
            return this.deadline = value
        },
    
        isDone() {
            return this.doneAt != null
        },
        isWaiting() {
            return this.state === States.waiting
        },
        isDo() {
            return this.state == States.do || this.isDeadlineToday() || this.isDeadlineOver()
        },
        hasDeadline() {
            return this.deadline != null && this.deadline.length > 0
        },
        isToday() {
            return this.today != null && this.today.length > 0
        },
        wasToday() {
            return this.isToday() ? this.todayMoment().isBefore(moment(), 'day') : false
        },
        isDeadlineToday() {
            return !this.isDone() && this.hasDeadline() && this.deadlineMoment().isSame(moment(), 'day')
        },
        isDeadlineOver() {
            return !this.isDone() && this.hasDeadline() && this.deadlineMoment().isBefore(moment(), 'day')
        },

        renderedDescription() {
            return escape(this.description)
                .replace(/((https|http):\/\/)?[\w]+(\.[^\s.,;]+)+/g, match => `<a target="_blank" href="${match.startsWith('http') ? match : `http://${match}`}" class="link">${match}</a>`)
                .replace(/\n/g, '<br>')
        },
    
        toggleState() {
            if(!this.isDone()){
                this.doneAt = new Date()
            } else {
                this.doneAt = null
            }
        },
        toggleToday() {
            if(!this.isToday()) {
                this.today = new Date()
            } else {
                this.today = null
            }
        },
        resetDeadline() {
            this.deadline = null
        },
        deadlineMoment() {
            return this.deadline ? moment(this.deadline).startOf('day') : this.deadline
        },
        todayMoment() {
            return this.today ? moment(this.today) : this.today
        },
        doneMoment() {
            return this.doneAt ? moment(this.doneAt) : this.doneAt
        },
        remindAtMoment() {
            return this.remindAt ? moment(this.remindAt) : this.remindAt
        },
        humanDeadline() {
            return this.deadlineMoment() ? this.deadlineMoment().calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse(now) {
                    if(this.isSame(now, 'year') && this.isAfter(now)) {
                        return 'D. MMMM'
                    }
                    return 'D. MMMM YYYY'
                }
            }) : null
        },
        humanRemindAt() {
            return this.remindAtMoment() ? this.remindAtMoment().calendar(null, {
                sameDay: '[Today] [at] H:mm A',
                nextDay: '[Tomorrow] [at] H:mm A',
                nextWeek: 'dddd [at] H:mm A',
                lastDay: '[Yesterday] [at] H:mm A',
                lastWeek: '[Last] dddd [at] H:mm A',
                sameElse: 'D. MMMM YYYY [at] H:mm A'
            }) : null
        }
    }
}