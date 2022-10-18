const mongoose = require('mongoose');

const itemShema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  });
  
const Todolist = mongoose.model("todolist", itemShema);

    const getFood = new Todolist({
      name: "Welcome to your todolist",
    });
    const cookFood = new Todolist({
      name: "<--- Click to delete this todolist",
    });
    const eatFood = new Todolist({
      name: "Add new todolist below and click +",
    });
  
    const defaultItems = [getFood, cookFood, eatFood];
    Todolist.find({}, function (err, list) {
      try {
        if(list.length === 0) {
          Todolist.insertMany(defaultItems);
        }
      }catch (err) {
        console.log(err.message);
      }
    });

const customListSchema = new mongoose.Schema({
  name: String,
  items: [itemShema]
})

const CustomList = mongoose.model('List', customListSchema);

module.exports = {CustomList, Todolist, defaultItems};
