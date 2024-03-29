import cookieUniversal from 'cookie-universal'

export default ({ req, res }, inject) => {
  const options = {
  "alias": "cookiz",
  "parseJSON": false
}
  inject(options.alias, cookieUniversal(req, res, options.parseJSON))
}
