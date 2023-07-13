import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/users';

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'hello' })
})

// Route protector
app.use('/api', protect, router);

// Unprotected routes
app.post('/user', createNewUser)
app.post('/signin', signin)

// Global error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.json({ message: `had an error: ${err.message}` })
})

export default app;