const getters = {
  countries: state => state.countries.data,
   isCountryDataReady: state => state.countries.isReady
}
export default getters
