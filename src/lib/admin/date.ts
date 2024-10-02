export function formatDateTime(date: string): String {
    // the date is in UTC
    // we need to convert it to the local timezone
    const localDate = new Date(date);
    // convert to local timezone
    const localTime = localDate.getTime();
    const offset = localDate.getTimezoneOffset() * 60000;
    const localTimezone = localTime - offset;
    const localDateTime = new Date(localTimezone);
    return localDateTime.toLocaleString();
}
