import Error from "next/error"


export interface IError extends Error {


    data: {
        message: string,
        success: boolean,
        status: boolean
        
    }
}
