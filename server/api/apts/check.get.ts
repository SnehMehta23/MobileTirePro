import {defineEventHandler, readBody} from 'h3';
import moment from 'moment-timezone';

function generateDateObjects() {
    const intervals = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(now);
        currentDate.setDate(now.getDate() + i);
        const dayOfWeek = currentDate.getDay();

        let startHour, endHour;
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend (Saturday or Sunday)
            startHour = 7;
            endHour = 16;
        } else { // Weekday (Monday to Friday)
            startHour = 16;
            endHour = 18;
        }

        for (let hour = startHour; hour < endHour; hour++) {
            const dateObject = new Date(currentDate);
            dateObject.setHours(hour, 0, 0, 0);
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
            const dayKey = moment(dateObject).format('MM-DD-YYYY');

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

        return availabilityMap
    } catch (error) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});
