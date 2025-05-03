import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from './schema/User.Schema'

@Module({
    imports:[MongooseModule.forFeature([{
        name: User.name,//name of model
        schema:UserSchema,//schema name
    }])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {

}
