import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

// jwt token을 반환 login secret 과 secret과 같다면

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
