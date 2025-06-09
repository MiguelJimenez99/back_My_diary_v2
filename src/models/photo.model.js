const mongoose = require("mongoose");

const photoSchema = mongoose.Schema(
  {
    description: { type: String, trim: true },
    url: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    cloudinaryId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
