export function generateArrayOfYears() {
    var max = new Date().getFullYear()
    var min = max - 100
    var years = []
  
    for (var i = max; i >= min; i--) {
      years.push(i)
    }
    return years
  };

export function generateArrayOfMonths() {
     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    return months
  }

export function getMonthNumber(month) {
    switch (month) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
      default:
        throw new Error('Unknown Month');
    }
}


