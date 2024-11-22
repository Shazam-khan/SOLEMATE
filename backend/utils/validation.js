export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
export const validatePassword = (password) => {
    // Ensure the password is at least 8 characters long
    return password.length >= 8;
};

export const validatePhoneNumber = (phoneNumber) => {
    // Allow only numeric phone numbers of length 11
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
};