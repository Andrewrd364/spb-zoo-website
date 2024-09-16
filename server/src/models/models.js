const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
})

const Animal = sequelize.define('animal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false,  unique: true },
  latinName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  habitat: { type: DataTypes.STRING, allowNull: false },
  food: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false }
})

const AnimalSpecies = sequelize.define('animal_species', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  species: { type: DataTypes.STRING, allowNull: false }
})

const Event = sequelize.define('event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true }
})

const News = sequelize.define('news', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true }
})

const NewsCategory = sequelize.define('news_category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Guardianship = sequelize.define('guardianship', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  guardianUrl: { type: DataTypes.STRING, allowNull: true },
  guardianImg: { type: DataTypes.STRING, allowNull: true }
})

const Service = sequelize.define('service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2) },
  imageUrl: { type: DataTypes.STRING, allowNull: true }
})

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2) }
})

const Vacancy = sequelize.define('vacancy', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
})

const Souvenir = sequelize.define('souvenir', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  inStock: { type: DataTypes.BOOLEAN, allowNull: false }
});

const SouvenirCategory = sequelize.define('souvenir_category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, unique: true, allowNull: false }
})

Animal.hasMany(AnimalSpecies)
AnimalSpecies.belongsTo(Animal)

News.hasMany(NewsCategory)
NewsCategory.belongsTo(News)

News.hasMany(Animal)
Animal.belongsTo(News)

News.hasMany(AnimalSpecies)
AnimalSpecies.belongsTo(News)

Event.hasMany(Animal)
Animal.belongsTo(Event)

Event.hasMany(AnimalSpecies)
AnimalSpecies.belongsTo(Event)

Souvenir.hasMany(SouvenirCategory)
SouvenirCategory.belongsTo(Souvenir)

module.exports = {
  User,
  Animal,
  AnimalSpecies,
  Event,
  News,
  NewsCategory,
  Guardianship,
  Service,
  Vacancy,
  Souvenir,
  SouvenirCategory,
  Ticket
}