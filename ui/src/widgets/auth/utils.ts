export function isValidUsername(username: string): boolean {
  // Допустимы: буквы, цифры, подчёркивания, длина 3–20
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
}

// Проверка email
export function isValidEmail(email: string): boolean {
  // Упрощённая, но надёжная проверка RFC 5322 совместимая
  const re = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Проверка пароля
export function isValidPassword(password: string): boolean {
  // Минимум 8 символов, хотя бы 1 буква, 1 цифра и 1 спецсимвол
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,}$/;
  return re.test(password);}