import Queue from 'bull'

const port = process.env.REDIS_PORT
const host = process.env.REDIS_HOST

export const email_work = new Queue( 'email_queue' , { redis : { port : port, host : host }})
export const dead_email_work = new Queue( 'dead_email_queue' , { redis : { port : port, host : host }})
export const attend_work = new Queue( 'attend_queue' , { redis : { port : port, host : host }})
