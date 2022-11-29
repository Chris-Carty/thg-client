  // Clear any user data stored in local storage
  export default function clearStorage() {
    localStorage.removeItem('activeStep')
    localStorage.removeItem('smsSent')
    localStorage.removeItem('dob-day')
    localStorage.removeItem('dob-month')
    localStorage.removeItem('dob-year')
    localStorage.removeItem('Firstname')
    localStorage.removeItem('Lastname')
    localStorage.removeItem('Mobile')
    localStorage.removeItem('dateOfBirth')
    localStorage.removeItem('Username')
  }