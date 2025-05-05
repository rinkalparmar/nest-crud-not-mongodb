import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';

@Controller('users')//used to add last of localhost:3000/users
export class UsersController {

    constructor(private readonly userservice: UsersService) {
        // constructor is used to inject the UsersService into the UsersController
    }

    @Post()//POST /users
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userservice.createUser(createUserDto);
    }

    @Get()//GET /users
    getAllUsers() {
        return this.userservice.getAllUsers();
    }

    @Get(':id')//GET /user/:id
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new NotFoundException("user not found");
        }
        const findId = await this.userservice.getUserById(id);
        if (!findId) {
            throw new NotFoundException("user not found");
        }
        return findId;
    }

    @Put(':id')//PUT /users/:id
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new NotFoundException("user not found");
        }
        const updateId = await this.userservice.updateUser(id, updateUserDto);
        if (!updateId) {
            throw new NotFoundException("user not found");
        }
        return updateId;
    }

    @Delete(':id')//DELETE /users/:id
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new NotFoundException("user not found");
        }
        const deleteId = await this.userservice.deleteUser(id);
        if (!deleteId) {
            throw new NotFoundException("user not found");
        }
        return deleteId;
    }

    // @Get() // GET /users 
    // findAll(@Query('role') role?: "INTERN" | "ADMIN") { //localhost:3000/users?role=ADMIN
    //     return this.userservice.findAll(role);
    // }

    // @Get(':id') // GET /users/:id //for validation used
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.userservice.findOne(id);
    // }
    // @Post()//POST /users 
    // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    //     return this.userservice.create(createUserDto);
    // }
    // // @Post()//POST /users 
    // // create(@Body() user: { name: string, email: string, password: string, role: "INTERN" | "ADMIN"; }) {
    // //     return this.userservice.create(user);
    // // }

    // @Put(':id') //PUT /users/:id
    // update(@Param('id') id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    //     return this.userservice.update(id, updateUserDto);
    // }

    // @Delete(':id') //DELETE /users/:id
    // delete(@Param('id') id: number) {
    //     return this.userservice.delete(+id);//this name come from uservice
    // }

}
