export function formatDate (date:string) {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
