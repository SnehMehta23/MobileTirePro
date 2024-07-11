// server/api/appointments/checkAvailability.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { day } = body;

    if (!day) {
        return {
            status: 'error',
            message: 'Day is required',
        };
    }

    try {
        // Parse the date from the request body
        const targetDate = new Date(day);
        targetDate.setMinutes(0, 0, 0); // Set minutes and seconds to zero

        // Determine if the day is a weekday or weekend
        const isWeekend = targetDate.getDay() === 0 || targetDate.getDay() === 6; // 0: Sunday, 6: Saturday

        // Define the target hours based on weekday or weekend
        let targetHours;
        if (isWeekend) {
            targetHours = Array.from({ length: 10 }, (_, i) => i + 7); // 7 AM to 4 PM
        } else {
            targetHours = [16, 17]; // 4 PM to 5 PM
        }

        // Create an object to store the availability status
        const availability = targetHours.reduce((acc, hour) => {
            const period = hour < 12 ? 'AM' : 'PM';
            const hourFormatted = hour <= 12 ? hour : hour - 12;
            const key = `${hourFormatted}${period}`;
            acc[key] = true;
            return acc;
        }, {});

        // Loop through each target hour and check if there's an appointment
        for (const hour of targetHours) {
            const startOfHour = new Date(targetDate);
            startOfHour.setHours(hour);

            const endOfHour = new Date(startOfHour);
            endOfHour.setMinutes(59, 59, 999); // Set to the end of the hour

            const appointment = await aptsSchema.findOne({
                appointmentDate: {
                    $gte: startOfHour,
                    $lte: endOfHour,
                },
            });

            if (appointment) {
                const period = hour < 12 ? 'AM' : 'PM';
                const hourFormatted = hour <= 12 ? hour : hour - 12;
                const key = `${hourFormatted}${period}`;
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
            message: error.message,
        };
    }
});