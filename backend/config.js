module.exports= {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://hakkym50:hakkym50@cluster0.8duln.mongodb.net/amazona?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYSTACK_CLIENTID: process.env.PAYSTACK_CLIENTID
}