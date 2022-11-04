  // Clear any user data stored in local storage
  export default function clearStorage() {
    localStorage.removeItem('activeStep')
    localStorage.removeItem('firstName')
    localStorage.removeItem('phoneNumber')
    localStorage.removeItem('userRvnuAccount')
    localStorage.removeItem('shareURL')
    localStorage.removeItem('myRvnuCode')
    localStorage.removeItem('animationCount')
    localStorage.removeItem('usedRvnuCodeId')
    localStorage.removeItem('paymentLink')
  }