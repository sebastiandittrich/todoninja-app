export default [
    { name: 'updatedAt', written_name: 'Last Updated', direction: 'desc' },
    { name: task => task.title.toLowerCase(), written_name: 'Alphabetically', direction: 'asc' },
    { name: task => task.createdAt, written_name: 'Oldest', direction: 'asc' },
    { name: task => task.createdAt, written_name: 'Newest', direction: 'desc' },
    { name: 'todayAt', written_name: 'Today first', direction: 'desc' },
    { name: 'state', written_name: 'State', direction: 'desc' },
    { name: task => task.isDone(), written_name: 'Open/Done', direction: 'asc' }
]