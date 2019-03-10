const login = async (_, { email }, { dataSources }) => {
  const user = await dataSources.userAPI.findOrCreateUser({ email })
  if (user) return Buffer.from(email).toString('base64')
}

export default {
  login,
}
