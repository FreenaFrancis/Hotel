const createError = (status,message)=>{
    const err = new Error();
    err.status = true
    err.message=message;
    return err;
}

module.exports = createError;