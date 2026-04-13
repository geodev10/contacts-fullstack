import { Schema, model } from "mongoose";
import { nameRegex, phoneRegex } from "../../constants/constants.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: [nameRegex, "Name invalid format"],
      required: [true, "Set name for contact"],
      minlength: [3, "Name is too short (min 3)"],
      maxlength: [50, "Name is too long (max 50)"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set Email for contact"],
      lowerCase: true,
      trim: true,
    },
    phone: {
      type: String,
      match: [phoneRegex, "Phone invalid number format"],
      required: [true, "Set phone for contact"],
      minlength: [7, "Phone is too short (min 7)"],
      maxlength: [20, "Phone is too long (max 20)"],
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true },
);

export const Contact = model("contacts", contactSchema);
