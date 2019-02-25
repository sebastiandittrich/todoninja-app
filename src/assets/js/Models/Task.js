import States from '@/assets/js/State'

export default {
    state: 0,
    title: '',
    doneAt: null,
    description: '',
    tags: 'Tags',
    workspaceId: null,
    workspace: 'Workspace',
    waiting: null,
    deadline: null,
    today: null,

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
        return this.deadline ? moment(this.deadline) : this.deadline
    },
    todayMoment() {
        return this.today ? moment(this.today) : this.today
    },
    doneMoment() {
        return this.doneAt ? moment(this.doneAt) : this.doneAt
    },
    humanDeadline() {
        return this.deadlineMoment() ? this.deadlineMoment().calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'D. MMMM YYYY'
        }) : null
    }
}