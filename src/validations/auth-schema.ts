import { z } from "zod";

export const formSignInSchema = z.object({
	email: z
		.string({ required_error: "Email is requied" })
		.email({ message: "Email is not valid" }),
	password: z.string({ required_error: "Password is required" }),
});