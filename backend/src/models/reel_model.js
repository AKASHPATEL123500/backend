import mongoose, { Schema } from "mongoose";

const reelSchema = new mongoose.Schema({

  // 🎥 VIDEO FILE (Cloudinary URL)
  videoUrl: {
    type: String,
    required: true
  },

  // 🖼️ THUMBNAIL / POSTER IMAGE
  thumbnailUrl: {
    type: String,
    required: true
  },

  // ⏱️ VIDEO DURATION (seconds)
  duration: {
    type: Number,
    required: true
  },

  title : {
    type : String,
  },

  // 📐 VIDEO RATIO (9:16 etc)
  aspectRatio: {
    type: String,
    default: "9:16"
  },

  // 👤 REEL OWNER
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 👁️ VIEWS COUNT
  viewsCount: {
    type: Number,
    default: 0
  },

  // ❤️ LIKES (users who liked)
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  // 💬 COMMENTS
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // 🔁 SHARES COUNT
  sharesCount: {
    type: Number,
    default: 0
  },

  // 🔖 SAVED BY USERS
  savedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  // 🚩 REPORTS
  reports: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    reason: String,
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // ⚙️ VISIBILITY CONTROLS
  isPublished: {
    type: Boolean,
    default: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  isBlocked: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Reel = mongoose.model("Reel", reelSchema);
export default Reel;
