const bcrypt = require("bcryptjs");
const AppError = require("../utils/app-error");

module.exports = class UserService {
  constructor({ User }) {
    this.User = User;
  }

  // Crear usuario
  async createUser(data) {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      throw new AppError("Name, email, and password are required", 400);
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.User.findOne({ email });
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.User.create({
      name,
      email,
      password: hashedPassword,
      role, 
    });

    return { id: user._id, name: user.name, email: user.email };
  }

  // Login de usuario
  async loginUser(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Both email and password are required", 400);
    }

    const user = await this.User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    return { id: user._id, email: user.email, name: user.name, role: user.role };
  }

  async getAllUsers(limit = 10, pageNum = 1) {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.User.countDocuments();
    const users = await this.User.find()
      .select("-password") 
      .populate("reservations") 
      .lean()
      .skip(pagination)
      .limit(limit);

    return { data: users, totalCount };
  }


  async getUserById(id) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const user = await this.User.findById(id)
      .select("-password")
      .populate("reservations"); 
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

 
  async updateUser(id, data) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

  
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    return updatedUser;
  }


  async deleteUser(id) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const deletedUser = await this.User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }

    return deletedUser;
  }

  async getWithReservations(id) {
    // console.log("Buscando usuario con ID:", id);
    const user =  await this.User.findById(id).populate("reservations");
    console.log(user.reservations);  // Aquí verás el array de reservas pobladas.
    return user;
  };
};
