import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
constructor(){}

    private users = [
        {
            id: 1,
            name: "rinkal",
            email: "r@gmaiol.com",
            role: "INTERN",
            password: "rinkal"
        },
        {
            id: 2,
            name: "dharmik",
            email: "d@gmaiol.com",
            role: "ADMIN",
            password: "dharu"
        },
        {
            id: 3,
            name: "harshdeep",
            email: "h@gmaiol.com",
            role: "ADMIN",
            password: "hashu"
        }
    ];

    findAll(role?: "INTERN" | "ADMIN") {
        if (role) {
            const roleArray = this.users.filter(user => user.role === role);
            if(roleArray.length===0){
                throw new NotFoundException("role not found"
                )
            }
            return roleArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        return user;
        //    return this.users.find(user => user.id === id);
    }

    create(createUserDto: CreateUserDto) {
        const highsId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: highsId[0].id + 1,
            role: "INTERN", // Default role
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
                };
            }
            return user;
        });
        return this.findOne(id);
        //    retrun this.users.find(user=>user.id===id);
    }

    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return this.users;
    }
}
