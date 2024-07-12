// dateHelper.js
import { format } from 'date-fns';

export function parseAndFormatDate(dateString) {
    // Extract the time part (last 3 characters)
    const timePart = dateString.slice(-3);

    // Extract the date part and convert to Date object
    const datePart = dateString.slice(0, -3).trim();
    const dateObject = new Date(datePart);

    // Adjust the hours based on the time part
    const matches = timePart.match(/(\d+)(AM|PM)/);
    if (matches) {
        let hours = parseInt(matches[1]);
        if (matches[2] === 'PM' && hours !== 12) {
            hours += 12;
        } else if (matches[2] === 'AM' && hours === 12) {
            hours = 0;
        }
        dateObject.setHours(hours, 0, 0, 0);
    }

    // Format the date object using date-fns
    return format(dateObject, 'PPpp');
}