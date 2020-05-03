const config = {
   // production: {
   //   SECRET: process.evn.SECRET,
   //   DATABASE: process.env.MONGODB_URI
   // },
  default: {
    SECRET: 'SUPERSECRETPASSWORD123',
    DATABASE: 'mongodb://localhost:27017/pweb'
  }
}

exports.get = function get(env) {
  return config[env] || config.default
}
