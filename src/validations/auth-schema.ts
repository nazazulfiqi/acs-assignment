import { z } from "zod";

export const formSignInSchema = z.object({
	username: z
		.string({ required_error: "Email is requied" }),
	password: z.string({ required_error: "Password is required" }),
});