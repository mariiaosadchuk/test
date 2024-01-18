import request from 'postman-request';

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?country=ua&proximity=ip&access_token=pk.eyJ1IjoibWFyeWJyb3duIiwiYSI6ImNscXhvNmNpcTAxaHEyamxsb2R1OTRnM3YifQ.ECCgZZp1i1giKfhtp59CUw`
  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the server!')
    } else if (body.features.length === 0){
      callback('No matching result for your request :(')
    } else {
      const coordinates = body.features[0].geometry.coordinates
      callback(undefined, {
        latitude: coordinates[1],
        longitude: coordinates[0],
        address
      })
    }
  })
}

export { geocode }
