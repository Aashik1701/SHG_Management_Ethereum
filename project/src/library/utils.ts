// src/lib/utils.ts

/**
 * Combines class names into a single string, filtering out any falsy values.
 * @param classes - A list of class names to combine.
 * @returns A string of combined class names.
 */
export function cn(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * A utility function to check if a value is an array.
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

/**
 * A utility function to deep clone an object.
 * @param obj - The object to clone.
 * @returns A deep clone of the object.
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * A utility function to merge two objects.
 * @param target - The target object to merge into.
 * @param source - The source object to merge from.
 * @returns The merged object.
 */
export function merge<T, U>(target: T, source: U): T & U {
    return { ...target, ...source };
}