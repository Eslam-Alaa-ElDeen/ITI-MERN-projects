const nodemailer=require("nodemailer")
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:process.env.email_USER,
        pass:process.env.email_PASS
    }
})
const sendEmail=async(options)=>{
    try {
        const mailOptions={
            from:`Shop App ${process.env.email_USER}`,
            to:options.email,
            subject:options.subject,
            html:options.message
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports=sendEmail