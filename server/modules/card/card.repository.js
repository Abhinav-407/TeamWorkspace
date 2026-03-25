const Card = require("./card.model")

const create = async (data) => {
    return await Card.create(data)
}

const findByColumn = async (columnId) => {
    return await Card.find({ columnId }).sort({ position: 1 })
}

const findById = async (id) => {
    return await Card.findById(id)
}

const update = async (id, data) => {
    return await Card.findByIdAndUpdate(id, data, { new: true })
}

const deleteCard = async (id) => {
    return await Card.findByIdAndDelete(id)
}

const move = async (cardId, columnId, position) => {
    return await Card.findByIdAndUpdate(
        cardId,
        { columnId, position },
        { new: true }
    )
}

module.exports = { create, findByColumn, findById, update, deleteCard, move }