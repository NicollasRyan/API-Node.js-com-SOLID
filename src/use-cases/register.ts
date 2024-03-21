import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUsecase {
  private usersRepository: any;

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: registerUseCaseRequest) {
    {
      const password_hash = await hash(password, 6);

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        throw new Error("E-mail already exists.");
      }

      await this.usersRepository.create({
        name,
        email,
        password_hash,
      });
    }
  }
}
