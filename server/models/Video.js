import mongoose from "mongoose"

const { model, Schema } = mongoose
const VideoSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
  },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model("video", VideoSchema)