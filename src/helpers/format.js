const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const timeSince = (date) => {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000)
  const minutes = 60;
  const hours = 3600;
  const days = 86400;
  const months = 2592000;
  const years = 31536000;
  let interval;
  let s = ((i, sufix='', plural_ind='s') => (
      i !== 1? `${sufix}${plural_ind}` :  plural_ind
  ));
  if ((interval = Math.floor(seconds / years)) >= 1)
      return interval + ` year${s(interval)} ago`
  if ((interval = Math.floor(seconds / months)) >= 1)
      return interval + ` month${s(interval)} ago`
  if ((interval = Math.floor(seconds / days)) >= 1)
      return interval + ` day${s(interval)} ago`
  if ((interval = Math.floor(seconds / hours)) >= 1)
      return interval + ` hour${s(interval)} ago`
  if ((interval = Math.floor(seconds / minutes)) >= 1)
      return interval + ` minute${s(interval)} ago`
  return 'seconds ago'
}

export {
    nFormatter,
    timeSince
}