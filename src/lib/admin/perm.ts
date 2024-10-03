import type { User } from "./types"

export const ADMIN = 0b1
export const TREASURER = 0b10

export function isPermAuthorized(user: number, perm: number) {
    return (user & perm) === perm || (user & ADMIN) === ADMIN
}

export function isAuthorized(user: { permissions: number }, perm: number) {
    return isPermAuthorized(user.permissions, perm)
}

export function isPermAuthorizedAll(user: number, ...perms: number[]) {
    return (user & ADMIN) === ADMIN || perms.every(perm => isPermAuthorized(user, perm))
}

export function isAuthorizedAll(user: { permissions: number }, ...perms: number[]) {
    return isPermAuthorizedAll(user.permissions, ...perms)
}

export function createPerm(...perms: number[]) {
    return perms.reduce((acc, perm) => acc | perm, 0)
}
