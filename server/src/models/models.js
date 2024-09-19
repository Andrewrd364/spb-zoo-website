const sequelize = require('./db.js')
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
  inStock: { type: DataTypes.BOOLEAN, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false }
});

const SouvenirCategory = sequelize.define('souvenir_category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, unique: true, allowNull: false }
})

Animal.belongsTo(AnimalSpecies, { foreignKey: 'speciesId', as: 'species' });
AnimalSpecies.hasMany(Animal, { foreignKey: 'speciesId' });

NewsCategory.hasMany(News)
News.belongsTo(NewsCategory)

Animal.hasMany(News)
News.belongsTo(Animal)

Animal.hasMany(Event)
Event.belongsTo(Animal)

SouvenirCategory.hasMany(Souvenir)
Souvenir.belongsTo(SouvenirCategory)

Animal.hasOne(Guardianship, { as: 'animals' });
Guardianship.belongsTo(Animal);

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

async function seedDatabase() {
  // Создание пользователей
  await User.bulkCreate([
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' }
  ]);

  // Создание видов животных
  const species1 = await AnimalSpecies.create({ species: 'Mammal' });
  const species2 = await AnimalSpecies.create({ species: 'Bird' });

  // Создание животных
  const animal1 = await Animal.create({
    name: 'Elephant',
    latinName: 'Loxodonta africana',
    description: 'A large herbivore.',
    habitat: 'Savannah',
    food: 'Plants',
    imageUrl: 'https://example.com/elephant.jpg',
    speciesId: species1.id
  });

  const animal2 = await Animal.create({
    name: 'Eagle',
    latinName: 'Aquila chrysaetos',
    description: 'A bird of prey.',
    habitat: 'Mountains',
    food: 'Small mammals',
    imageUrl: 'https://example.com/eagle.jpg',
    speciesId: species2.id
  });

  // Создание события
  await Event.create({
    title: 'Elephant Conservation Day',
    description: 'A special day to raise awareness about elephants.',
    date: new Date(),
    price: 20.0,
    imageUrl: 'https://example.com/elephant_event.jpg',
    animalId: animal1.id
  });

  // Создание новостей
  const newsCategory1 = await NewsCategory.create({ category: 'Conservation' });
  const newsCategory2 = await NewsCategory.create({ category: 'Research' });

  await News.create({
    title: 'Elephant Population Decline',
    content: 'The population of African elephants is decreasing.',
    imageUrl: 'https://example.com/news_elephant.jpg',
    newsCategoryId: newsCategory1.id,
    animalId: animal1.id
  });

  await News.create({
    title: 'New Eagle Research',
    content: 'Research reveals new insights into eagle behavior.',
    imageUrl: 'https://example.com/news_eagle.jpg',
    newsCategoryId: newsCategory2.id,
    animalId: animal2.id
  });

  // Создание опекунства
  await Guardianship.create({
    name: 'John Doe',
    guardianUrl: 'https://example.com/guardian.jpg',
    guardianImg: 'https://example.com/guardian_avatar.jpg',
    animalId: animal1.id
  });

  // Создание услуги
  await Service.create({
    title: 'VIP Safari Tour',
    description: 'Experience a private tour with our experts.',
    price: 150.0,
    imageUrl: 'https://example.com/safari.jpg'
  });

  // Создание билетов
  await Ticket.create({
    name: 'Adult Ticket',
    description: 'General admission ticket for adults.',
    price: 25.0
  });

  await Ticket.create({
    name: 'Child Ticket',
    description: 'General admission ticket for children.',
    price: 15.0
  });

  // Создание вакансии
  await Vacancy.create({
    name: 'Zookeeper',
    content: 'We are looking for an experienced zookeeper to join our team.'
  });

  // Создание сувениров
  const souvenirCategory1 = await SouvenirCategory.create({ category: 'Plush Toys' });
  const souvenirCategory2 = await SouvenirCategory.create({ category: 'T-shirts' });

  await Souvenir.create({
    name: 'Elephant Plush Toy',
    description: 'A soft toy elephant.',
    inStock: true,
    souvenirCategoryId: souvenirCategory1.id,
    imageUrl: 'asdasd123123'
  });

  await Souvenir.create({
    name: 'Zoo T-shirt',
    description: 'A T-shirt with the zoo logo.',
    inStock: true,
    souvenirCategoryId: souvenirCategory2.id,
    imageUrl: 'asdasd123123'
  });

  console.log('Database has been seeded successfully.');
}

// seedDatabase();
