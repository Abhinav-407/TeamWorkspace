const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" }
}, { _id: false })

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [memberSchema]
}, { timestamps: true })

workspaceSchema.pre("save", async function () {
    if (this.isModified("name") || this.isNew) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
    }
})

module.exports = mongoose.model("Workspace", workspaceSchema)