const errorHandler = (err,req,res,next)=>{
    console.log(err.name)

    if(err.name === 'CastError'){
        return res.status(400).json({error: 'Invalid ID format ' })
    }
    if(err.name === 'ValidationError'){
        return res.status(400).json({error: err.message})//*ONLY here we can use the validation message
    }
    if(err.code === 11000){
        return res.status(400).json({error: "dublicated Key"})
    }
    if(err.name === 'SyntaxError'){
       return res.status(400).json({error: 'JSON parsing error'})
    }
    res.status(500).json({error: 'Internal Server error'})
}

module.exports = errorHandler