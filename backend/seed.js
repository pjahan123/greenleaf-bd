require('dotenv').config();const mongoose=require('mongoose'),bcrypt=require('bcryptjs');const Product=require('./models/Product'),User=require('./models/User');
const products=[
{name:'Laxmi Kamal',price:149,oldPrice:299,category:'Succulents',image:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=85'},
{name:'Monstera Adansonii',price:590,oldPrice:790,category:'Indoor Plants',image:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85'},
{name:'Crassula Jade Plant',price:390,oldPrice:520,category:'Succulents',image:'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=900&q=85'},
{name:'String of Pearls',price:490,oldPrice:650,category:'Succulents',image:'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=85'},
{name:'Pink Adenium',price:690,oldPrice:850,category:'Flowering Plants',image:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85'},
{name:'Peace Lily',price:620,oldPrice:790,category:'Indoor Plants',image:'https://images.unsplash.com/photo-1593482892290-f54927ae1bb3?auto=format&fit=crop&w=900&q=85'},
{name:'Snake Plant',price:550,oldPrice:720,category:'Air Purifying Plants',image:'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85'},
{name:'Rubber Plant',price:680,oldPrice:850,category:'House Plants',image:'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85'},
{name:'Areca Palm',price:890,oldPrice:1100,category:'Outdoor Plants',image:'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=85'},
{name:'Jade Mini',price:299,oldPrice:399,category:'Succulents',image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85'},
{name:'Philodendron',price:720,oldPrice:920,category:'Indoor Plants',image:'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85'},
{name:'Flowering Garden Plant',price:590,oldPrice:750,category:'Flowering Plants',image:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85'}];
(async()=>{try{await mongoose.connect(process.env.MONGO_URI);await Product.deleteMany({});await Product.insertMany(products);if(!await User.findOne({email:'demo@greenleafbd.com'}))await User.create({name:'Demo User',email:'demo@greenleafbd.com',password:await bcrypt.hash('123456',10)});console.log('Seed complete');await mongoose.disconnect()}catch(e){console.error(e);process.exit(1)}})();
