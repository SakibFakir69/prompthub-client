import z, { email } from 'zod';




export const loginUserSchemaValidation = z.object({

    email:z.string().includes("@",{message:"Please Provide @ symbol"}),
    password:z.string()
})

export const registerUserSchemaValidation = z.object({
    name:z.string(),
    email:z.string().includes("@", {message:"Please Provide @ symbol"}),
    password:z.string().min(8,{message:"Must be 8 length"}).max(20, {message:"Must be under 20 length"})
})