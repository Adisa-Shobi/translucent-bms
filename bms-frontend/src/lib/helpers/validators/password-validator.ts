export function validatePassword(password: string) {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;
  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (countOfLowerCase < 1) {
    return "Password must contain at least one lowercase letter";
  }
  if (countOfUpperCase < 1) {
    return "Password must contain at least one uppercase letter";
  }
  if (countOfSpecialChar < 1) {
    return "Password must contain at least one special character";
  }
  if (countOfNumbers < 1) return "Password must contain at least one number";
}
