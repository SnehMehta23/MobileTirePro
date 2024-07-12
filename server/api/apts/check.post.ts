import {defineEventHandler, readBody} from 'h3';
import moment from 'moment-timezone';


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {day} = body;

    if (!day) {
        return {
            status: 'error',
            message: 'Day is required',
        };
    }

    try {
        // Parse the date from the request body and convert to CST
        const targetDate = moment.tz(day, 'America/Chicago').startOf('day');

        // Determine if the day is a weekday or weekend
        const isWeekend = targetDate.day() === 0 || targetDate.day() === 6; // 0: Sunday, 6: Saturday

        // Define the target hours based on weekday or weekend
        let targetHours;
        if (isWeekend) {
            targetHours = Array.from({length: 10}, (_, i) => i + 7); // 7 AM to 4 PM
        } else {
            targetHours = [16, 17]; // 4 PM to 5 PM
        }

        // Create an object to store the availability status
        const availability = targetHours.reduce((acc, hour) => {
            const period = hour < 12 ? 'AM' : 'PM';
            const hourFormatted = hour <= 12 ? hour : hour - 12;
            const key = `${hourFormatted}${period}`;
            //@ts-ignore
            acc[key] = true;
            return acc;
        }, {});

        // Loop through each target hour and check if there's an appointment
        for (const hour of targetHours) {
            const startOfHour = targetDate.clone().hour(hour).minute(0).second(0).millisecond(0);
            const endOfHour = startOfHour.clone().minute(59).second(59).millisecond(999);

            const appointment = await aptsSchema.findOne({
                appointmentDate: {
                    $gte: startOfHour.toDate(),
                    $lte: endOfHour.toDate(),
                },
            });

            if (appointment) {
                const period = hour < 12 ? 'AM' : 'PM';
                const hourFormatted = hour <= 12 ? hour : hour - 12;
                const key = `${hourFormatted}${period}`;
                //@ts-ignore
                availability[key] = false;
            }
        }

        return {
            status: 'success',
            data: availability,
        };
    } catch (error) {
        return {
            status: 'error',
            //@ts-ignore
            message: error.message,
        };
    }
});
