const states = {
    do: 0,
    postponed: 1,
    calendar: 2,
    waiting: 3,
}

export default Object.freeze({
    ...states,
    states: [
        { state: states.do, name: 'Do', icon: 'feather icon-zap' },
        { state: states.postponed, name: 'Postponed', icon: 'feather icon-chevrons-right' },
        { state: states.calendar, name: 'Calendar', icon: 'feather icon-calendar' },
        { state: states.waiting, name: 'Waiting', icon: 'feather icon-clock' },
    ]
})