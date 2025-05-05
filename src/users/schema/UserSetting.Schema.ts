import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSetting {

    @Prop({ required: true })
    receiveEmail: boolean;

    @Prop({ required: true })
    receiveSMS: boolean;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);