import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')//used to add last of localhost:3000/users
export class UsersController {
    /**
     *GET get all users,
     *GET get user by id
     *POST create new user
     *PUT update user
     *DELETE delete user
     */
    constructor(private readonly userservice: UsersService) {
        // constructor is used to inject the UsersService into the UsersController
    }

    @Get() // GET /users 
    findAll(@Query('role') role?: "INTERN" | "ADMIN") { //localhost:3000/users?role=ADMIN
        return this.userservice.findAll(role);
    }

    @Get(':id') // GET /users/:id //for validation used
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userservice.findOne(id);
    }
    @Post()//POST /users 
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userservice.create(createUserDto);
    }
    // @Post()//POST /users 
    // create(@Body() user: { name: string, email: string, password: string, role: "INTERN" | "ADMIN"; }) {
    //     return this.userservice.create(user);
    // }

    @Put(':id') //PUT /users/:id
    update(@Param('id') id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userservice.update(id, updateUserDto);
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id') id: number) {
        return this.userservice.delete(+id);//this name come from uservice
    }

}
