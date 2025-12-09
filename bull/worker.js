import { email_work, dead_email_work, attend_work } from "./bull_config.js"
import { transporter } from "../helper/mail.js"

email_work.process( async (job) => {

    console.log("Sending email!!!....." + job.id)

    let mailOptions = {
        from: process.env.MAIL_ID,
        to: job.data.email,
        subject: 'Registration Confirmation',
        text: `Registration was Successfull! Now, verify your account by clicking the link below :  http://localhost:8080/auth/verify/${job.data.email}`
    }
        
    const info = await transporter.sendMail(mailOptions)

    console.log(info.response)
   
})

attend_work.process(async (job) => {

    console.log(job.data.data)

})

email_work.on("completed", async (job) => {
    console.log("Account registered Sucessfully, Verification Email is being sent!")
})

email_work.on("failed", async (job, err) => {
        
    console.log(`Job failed: ${job.attemptsMade}/${job.opts.attempts}`);

    if (job.attemptsMade >= job.opts.attempts) {

        const { email } = job.data;

        try{
            await dead_email_work.add({ email });

            await transporter.sendMail({
                from: process.env.MAIL_ID,
                to: email,
                subject: "Verification Email Failed",
                text: "We could not send your verification mail after multiple attempts. Please contact support.",
            });

            console.log("Fallback mail sent to:", email);
        }
        catch(error)
        {
            console.log("Issue in sending mail, job is waiting!!")
        }
        
    }
});