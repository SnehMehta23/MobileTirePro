import {userSchema} from "~/server/models/user.schema";
import {aptsSchema} from "~/server/models/apts.schema";
//@ts-ignore
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {


    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "noreplymobiletirepro@gmail.com",
                pass: "fnxi ghcq dknc bxdg",
            },
        });


        const {carId, service, appointmentDate, address} = await readBody(event);
        const email = await getAuth(event)
        const user = await userSchema.findOne({email}).select('-password')
        const car = await carSchema.findById(carId)
        const apt = new aptsSchema({carId, service, appointmentDate, address, userId: user?._id})
        await apt.save()
        await userSchema.findByIdAndUpdate(user?._id, {$push: {apts: apt._id}})

        const clientmail = await transporter.sendMail({
            from: '', // sender address
            to: email, // list of receivers
            subject: "Mobile Tire Pro - Appointment confirmed", // Subject line
            text: "test", // plain text body
            html: "<b>Your appointment has been booked.</b>", // html body
        });
        const info = await transporter.sendMail({
            from: '', // sender address
            to: "rafsant345@gmail.com", // list of receivers
            subject: "New Appointment", // Subject line
            text: `Your got a new appointment \n ${service} \n ${address} \n ${car?.year} ${car?.make} ${car?.model}`
            // html: "`<p>Your got a new appointment.</p> <p>${service}</p><p>${address}</p> <p>${car?.year} ${car?.make} ${car?.model}</p>`", // html body
        });

        return 'OK'


    } catch (e) {

    }
})
