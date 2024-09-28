const { Ticket } = require('../models/models');

// Получить все билеты с пагинацией
exports.getAllTickets = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Пагинация по умолчанию
  const offset = (page - 1) * limit;

  try {
    const tickets = await Ticket.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.json({
      totalItems: tickets.count,
      totalPages: Math.ceil(tickets.count / limit),
      currentPage: parseInt(page),
      data: tickets.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении билетов' });
  }
};

// Получить билет по ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (ticket) {
      return res.status(200).json(ticket);
    } else {
      return res.status(404).json({ message: 'Билет не найден' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при получении билета' });
  }
};

// Создать новый билет
exports.createTicket = async (req, res) => {
  const { name, description = null, price } = req.body;

  try {
    const newTicket = await Ticket.create({
      name,
      description: description || null, // Присваиваем null, если description не указано или пусто
      price: price || null,
    });

    return res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при создании билета' });
  }
};

// Обновить билет по ID
exports.updateTicket = async (req, res) => {
  const { name, description = null, price } = req.body;

  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Билет не найден' });
    }

    await ticket.update({
      name,
      description: description || null, // Присваиваем null, если description не указано или пусто
      price: price || null,
    });

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при обновлении билета' });
  }
};

// Удалить билет по ID
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Билет не найден' });
    }

    await ticket.destroy();
    return res.status(200).json({ message: 'Билет успешно удален' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка при удалении билета' });
  }
};
