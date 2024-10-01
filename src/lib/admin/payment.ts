export function generateUpiLink(name: string, id: string, amount: number, desc: string): string {
    return `upi://pay?pa=${id}&pn=${name}&tn=${desc}&am=${amount}&cu=INR`;
}
