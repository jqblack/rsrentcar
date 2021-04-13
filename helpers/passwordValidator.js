export function passwordValidator(password) {
  if (!password) return "La contraseña no puede estar vacía"
  if (password.length < 2) return 'la clave es muy corta'
  return ''
}
