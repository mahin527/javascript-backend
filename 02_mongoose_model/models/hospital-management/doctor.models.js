import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        qualifications: {
            type: String,
            required: true
        },
        experienceInYear: {
            type: Number,
            required: true,
            default: 0
        },
        worksInHospitals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Hospital'
            }
        ],
        gender: {
            type: String,
            enum: ['M', 'F', 'O'],
            required: true
        },


    }, { timestamps: true }
)

export const Doctor = mongoose.model('Doctor', doctorSchema)