import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/User.Schema';
import { UserSetting } from './schema/UserSetting.Schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSetting.name) private userSettingModel: Model<UserSetting>) { }

    async createUser({ settings, ...createUserDto }: CreateUserDto) {
        if (settings) {
            const newSetting = new this.userSettingModel(settings);
            const saveSettinds = await newSetting.save();
            const newUser =new this.userModel({
                ...createUserDto,
                settings:saveSettinds._id
            })
            return newUser.save();
        }
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    // createUser(createUserDto: CreateUserDto) {
    //     const newUser = new this.userModel(createUserDto);
    //     return newUser.save();
    // }

    getAllUsers() {
        return this.userModel.find().populate('settings');
    }

    getUserById(id: string) {
        return this.userModel.findById(id).populate('settings');
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }


    // private users = [
    //     {
    //         id: 1,
    //         name: "rinkal",
    //         email: "r@gmaiol.com",
    //         role: "INTERN",
    //         password: "rinkal"
    //     },
    //     {
    //         id: 2,
    //         name: "dharmik",
    //         email: "d@gmaiol.com",
    //         role: "ADMIN",
    //         password: "dharu"
    //     },
    //     {
    //         id: 3,
    //         name: "harshdeep",
    //         email: "h@gmaiol.com",
    //         role: "ADMIN",
    //         password: "hashu"
    //     }
    // ];

    // findAll(role?: "INTERN" | "ADMIN") {
    //     if (role) {
    //         const roleArray = this.users.filter(user => user.role === role);
    //         if(roleArray.length===0){
    //             throw new NotFoundException("role not found"
    //             )
    //         }
    //         return roleArray;
    //     }
    //     return this.users;
    // }

    // findOne(id: number) {
    //     const user = this.users.find(user => user.id === id);
    //     if (!user) {
    //         throw new NotFoundException("user not found");
    //     }
    //     return user;
    //     //    return this.users.find(user => user.id === id);
    // }

    // create(createUserDto: CreateUserDto) {
    //     const highsId = [...this.users].sort((a, b) => b.id - a.id);
    //     const newUser = {
    //         id: highsId[0].id + 1,
    //         role: "INTERN", // Default role
    //         ...createUserDto
    //     };
    //     this.users.push(newUser);
    //     return newUser;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     this.users = this.users.map(user => {
    //         if (user.id === id) {
    //             return {
    //                 ...user,
    //                 ...updateUserDto
    //             };
    //         }
    //         return user;
    //     });
    //     return this.findOne(id);
    //     //    retrun this.users.find(user=>user.id===id);
    // }

    // delete(id: number) {
    //     this.users = this.users.filter(user => user.id !== id);
    //     return this.users;
    // }
}
