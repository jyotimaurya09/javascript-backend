import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'; // For bearer token
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary URL
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

//don't use arrow function here instead always use function syntax
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.username,
            fullName: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);