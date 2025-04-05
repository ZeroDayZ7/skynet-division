export function validateEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return "Niepoprawny adres e-mail";
    }
    return "";
  }
  
  export function validatePassword(password: string): string {
    if (password.length < 6) {
      return "Hasło musi mieć co najmniej 6 znaków";
    }
    return "";
  }
  