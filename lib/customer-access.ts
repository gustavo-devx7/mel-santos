const ACCESS_WINDOW_DAYS = 7
const ACCESS_WINDOW_MS = ACCESS_WINDOW_DAYS * 24 * 60 * 60 * 1000

export function getCustomerAccessExpiresAt(paymentDate: string | Date) {
  const paidAt = paymentDate instanceof Date ? paymentDate : new Date(paymentDate)
  return new Date(paidAt.getTime() + ACCESS_WINDOW_MS)
}

export function isCustomerAccessExpired(paymentDate: string | Date, now = new Date()) {
  return getCustomerAccessExpiresAt(paymentDate).getTime() <= now.getTime()
}

export function getCustomerAccessWindowDays() {
  return ACCESS_WINDOW_DAYS
}
