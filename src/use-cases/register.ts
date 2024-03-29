import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user-already-exists-erro";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUsecase {
  private usersRepository: any;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: registerUseCaseRequest) {
    {
      const password_hash = await hash(password, 6);

      const userWithSameEmail = await this.usersRepository.findByEmail(email);

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
      }

      await this.usersRepository.create({
        name,
        email,
        password_hash,
      });
    }
  }
}
