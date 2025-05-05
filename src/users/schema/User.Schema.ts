import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSetting } from "./UserSetting.Schema";
import { Post } from "../../posts/schema/Posts.Schema";

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    // reference of setting collection
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "UserSetting" })
    settings: UserSetting;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);