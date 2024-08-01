import { defineEventHandler, readBody } from 'h3';
import moment from 'moment-timezone';

function generateDateObjects() {
    const intervals = [];
    const now = moment().tz('America/Chicago').toDate();

    for (let i = 0; i < 7; i++) {
        const currentDate = moment(now).tz('America/Chicago').add(i, 'days').toDate();
        const dayOfWeek = currentDate.getDay();

        // Skip Sunday (day 0)
        if (dayOfWeek === 0) continue;

        let startHour, endHour;
        if (dayOfWeek === 6) { // Saturday
            startHour = 7;
            endHour = 16;
        } else { // Weekday (Monday to Friday)
            startHour = 16;
            endHour = 18;
        }

        for (let hour = startHour; hour < endHour; hour++) {
            const dateObject = moment(currentDate).tz('America/Chicago').set({
                hour: hour,
                minute: 0,
                second: 0,
                millisecond: 0
            }).toDate();
            intervals.push(dateObject);
        }
    }

    return intervals;
}

export default defineEventHandler(async (event) => {
    try {
        // Generate date objects for the next 7 days
        const dateObjects = generateDateObjects();

        // Create a map to store availability status for each day
        const availabilityMap = {};

        // Loop through each date object and check if there's an appointment
        for (const dateObject of dateObjects) {
            const dayKey = moment(dateObject).tz('America/Chicago').format('MM-DD-YYYY');

            if (!availabilityMap[dayKey]) {
                availabilityMap[dayKey] = [];
            }

            const startOfHour = moment(dateObject).tz('America/Chicago').startOf('hour');
            const endOfHour = startOfHour.clone().endOf('hour');

            const appointment = await aptsSchema.findOne({
                appointmentDate: {
                    $gte: startOfHour.toDate(),
                    $lte: endOfHour.toDate(),
                },
            });

            if (!appointment) {
                availabilityMap[dayKey].push(dateObject);
            }
        }

        return availabilityMap;
    } catch (error) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});