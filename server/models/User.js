import mongoose from "mongoose"
import bcrypt  from "bcryptjs"

// const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|outlook)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
// const passwordReg = new RegExp (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
// const role = ['ADMIN', 'USER']

const { model, Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true, //removed because of the google login

    },
    img: {
        type: String,
        default: ""

    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    if(this.password){
        this.password = await bcrypt.hash(this.password, salt)
        next()

    }else{
        next()
    }
})


export default model("user", userSchema);