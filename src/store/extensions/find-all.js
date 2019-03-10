export const actions = {
    async findAll({ dispatch }, options = {}) {
      options = Object.assign({
        $limit: 10,
        $skip: 0,
      }, options)
  
      const countquery = await dispatch('find', { query: { ...options, $limit: 0 } })
      const total = countquery.total
  
      for(options.$skip; options.$skip < total; options.$skip = options.$skip + options.$limit) {
        await dispatch('find', { query: { ...options } })
      }
    }
  }