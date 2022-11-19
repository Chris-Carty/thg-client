  // Clear any user data stored in local storage
  export default function clearStorage() {
    localStorage.removeItem('activeStep')
    localStorage.removeItem('firstName')
    localStorage.removeItem('phoneNumber')
    localStorage.removeItem('payerRvnuAccount')
    localStorage.removeItem('paymentID')
    localStorage.removeItem('recommenderID')
    localStorage.removeItem('commissionSmsSent')
  }