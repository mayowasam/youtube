import mongoose from "mongoose"

const { model, Schema } = mongoose


const CommentSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
  },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("comment", CommentSchema);