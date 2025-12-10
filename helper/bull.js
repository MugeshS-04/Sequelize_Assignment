import { email_work, dead_email_work, attend_work } from "../bull/bull_config.js";

export const email_send = async (req, res) => {

    const email = req.body.email

    await email_work.add({email : email}, {attempts : 5, backoff: { type: "exponential", delay: 1000 }, removeOnComplete: true});

    res.json({success : true, message: "Account registered Sucessfully, Verification Email is being sent!"})
}

export const dead_mail = async (req, res) => {

    const jobs = await dead_email_work.getJobs([
        "waiting",
        "active",
        "delayed",
        "failed",
        "completed"
    ]);

    res.json(jobs);
}

export const empty_dead_mail = async (req, res) => {
    
    dead_email_work.empty()

    res.json({success : true, message : "The queue is emptied successfully!"});
}

export const dailyattendence = async (req, res) => {

    const options = {
        repeat : {
            cron : "11 12 * * *"
        }
    }

    const message = "Today, Overall attendence is 23"

    await attend_work.add({message : message}, options)
    
    res.json({success : true, message : "Subscription for daily attendence is successfull!"})
}

