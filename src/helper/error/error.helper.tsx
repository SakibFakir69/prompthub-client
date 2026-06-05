





import { IError } from '@/src/interfaces/error/error.interface'
import { toast } from 'react-toastify';

function CatchErrorHandel({error}:IError) {

    const {message} =  error?.data || {};


    if(message)
    {
        toast.error(`${message}`);
    }



 

}

export default CatchErrorHandel;