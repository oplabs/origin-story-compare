export function formatNumber(num, dec = 2, trailingZeros = false) {
    const dsep = '.',
      tsep = ','
    num = num.toFixed(~~dec)
    const parts = num.split('.'),
      fnums = parts[0]
    let decimals = parts[1] && parts[1] > 0 ? dsep + parts[1] : ''
    if (!trailingZeros) {
      decimals = decimals.replace(/\.?0+$/g, '')
    }
    const withSeparator = fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep)
    return `${withSeparator}${decimals}`
  }
