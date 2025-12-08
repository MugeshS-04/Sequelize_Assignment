import Queue from 'bull'
import { transporter } from './mail.js'

export const email_send = async (req, res) => {

    const port = process.env.REDIS_PORT
    const host = process.env.REDIS_HOST

    const email = req.body.email
    
    const email_work = new Queue( 'email_queue' , { redis : { port : port, host : host }})

    email_work.process( async (job) => {

        console.log("Sending email!!!....." + job.id)

        let mailOptions = {
            from: process.env.MAIL_ID,
            to: job.data.email,
            subject: 'Registration Confirmation',
            text: `Registration was Successfull! Now, verify your account by clicking the link below :  http://localhost:8080/auth/verify/${email}`
        }
         
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                
            } else {
                console.log('Email sent: ' + info.response);
            }
        })

    })

    email_work.on('completed', (job, result) => {
        console.log("job finished!!!")
    })

    await email_work.add({email : email}, {attempt : 5, removeOnComplete: true, removeOnFail: true });

    res.json({success : true, message: "Email sent Successfuly!"})
}

