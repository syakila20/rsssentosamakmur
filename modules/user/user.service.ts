/* eslint-disable @typescript-eslint/no-explicit-any */
import { userRepository } from "./user.repository";
import { hash } from "bcryptjs";

export const userService = {
  async register(payload: any) {
    const exist = await userRepository.findByEmail(payload.email);
    if (exist) throw new Error("Email exists");

    const password = await hash(payload.password, 10);

    return userRepository.create({
      ...payload,
      password,
    });
  },
};
