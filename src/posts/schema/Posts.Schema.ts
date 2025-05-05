import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;


    @Prop({ required: true })
    description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);