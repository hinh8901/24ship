const formatNumber = (rawNumber) =>
  rawNumber?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default formatNumber
