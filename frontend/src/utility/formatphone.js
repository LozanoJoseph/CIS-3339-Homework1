
export function normalizePhone(phone) {
    return String(phone || '').replace(/\D/g, '')
}

export function formatPhone(phone) {
    const digits = normalizePhone(phone)

    if (digits.length !== 10) {
        return phone
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}
