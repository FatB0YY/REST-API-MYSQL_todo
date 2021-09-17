const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const todoRoutes = require('./routes/todo')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'public')))

// парсим все json запросы
app.use(express.json())

// запросы с api префикс будут служить для отдачи данных (json)
app.use('/api/todo', todoRoutes)

// middleware который всега возвращает только одну страницу
// вместо get запросов
app.use((req, res, next) => {
  res.sendFile('/index.html')
})

async function start() {
  try {
    // {force: true} будет удалять таблицы
    await sequelize.sync()
    app.listen(PORT)
  } catch (error) {
    console.log(error)
  }
}
start()


// node index