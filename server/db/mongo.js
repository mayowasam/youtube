import mongoose from 'mongoose' 

export default function mongo () {
    mongoose
        .connect(process.env.MONGODB)
        .then(() => console.log('mongodb is connected'))
        .catch((err) => console.log(err))

    mongoose.connection.on('connected', () => console.log("mongoose is connected"))
    mongoose.connection.on('error', () => console.log("mongoose error occur", error))
    mongoose.connection.on('disconnected', () => console.log("mongoose is disconnected"))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("mongoose connection closed")
            process.exit(0)
        })
    })
}

