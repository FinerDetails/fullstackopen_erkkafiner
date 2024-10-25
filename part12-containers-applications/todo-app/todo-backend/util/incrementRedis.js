const {
    getAsync,
    setAsync
  } = require('../redis')

  const incrementRedis = async (operation, key) => {
    const visits = await getAsync(key) || 0
    const operator = operation === 'increment' ? 1 : -1
    setAsync(key, parseInt(visits) + operator)
  }

  module.exports = incrementRedis