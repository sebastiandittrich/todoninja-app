import { isMoment } from "moment";

export default {
    state: 0,
    title: '',
    doneAt: null,
    description: '',
    tags: [],
    workspaceId: null,
    workspace: 'Workspace',
    deadline: null,

    get deadlineAsDate() {
        if(!this.deadline || this.deadline instanceof Date) {
            return this.deadline
        }

        return new Date(this.deadline)
    },
    set deadlineAsDate(value) {
        return this.deadline = value
    },

    get isDone() {
        return this.doneAt != null
    },

    toggleState() {
        if(!this.isDone){
            this.doneAt = new Date()
        } else {
            this.doneAt = null
        }
    },
    deadlineMoment() {
        return this.deadline ? moment(this.deadline) : this.deadline
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