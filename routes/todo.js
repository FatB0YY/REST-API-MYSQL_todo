const { Router } = require('express')
const Todo = require('../models/todo')
const router = Router()

// получение списка задач
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll() 
    res.status(200).json(todos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'server error' })
  }
})

// создание новой задачи
router.post('/', async (req, res) => {
  try {
    // сохранение туду
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    })
    // возвращаем статус 201, эл был создан
    res.status(201).json({ todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'server error' })
  }
})

// изменение задачи
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(+req.params.id)
    todo.done = req.body.done
    await todo.save()
    res.status(200).json({todo})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'server error' })
  }
})

// Удаление задачи
router.delete('/:id', async (req, res) => {
  try {
    // ищем только определнный туду, у котрого совпадает id 
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id
      }
    })
    // удаляем этот элемент
    await todos[0].destroy()
    // контента нет, но все прошло успешно
    res.status(204).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router
