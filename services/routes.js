const _ = require('lodash');
const {Todolist, defaultItems, CustomList} = require('../DataBaseConnection/todolistDBmodel');
const date = require('../Routes/date');

exports.homeRoute = async function (req, res) {
    const today = date.getDate();
    Todolist.find({}).then(function (todolist) {
      res.render("time", { listTitle: today, newItems: todolist });
    }).catch(function (err) {
      console.log(err.message);
    });
}

exports.postHomeRoute = async function (req, res) {
    const userItem = req.body.userInput;
    const listTitle = req.body.list;

    if(listTitle === date.getDate()) {
      await Todolist.insertMany({name: userItem});
        res.redirect('/');
    }else{
      const listUpdate = new Todolist({name: userItem});
      await CustomList.findOne({name: listTitle}, function(err, list){
        list.items.push(listUpdate);
        list.save();
      }).clone();
      res.redirect(`/${listTitle}`);
    }
}

exports.postDeleteItemRoute = async function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listTitle = req.body.listName;

  if(listTitle === date.getDate()) {
  await Todolist.findByIdAndDelete({_id: checkedItemId}).then(function(onfulfilled) {
    res.redirect('/');
  });
  }else{
    await CustomList.findOneAndUpdate({name: listTitle}, {$pull: {items: {_id: checkedItemId}}}).then(function(result){
      res.redirect(`/${listTitle}`);
  })
}}

exports.getUserDefinedRoute = async function(req, res) {
  const userParam = _.capitalize(req.params.userDefined);
  await CustomList.findOne({name: userParam}).then(function(list) {
    if(!list){
      const newList = new CustomList({
        name: userParam,
        items: defaultItems
      });
      console.log(`${newList.name} newList added to database successfully`);
      newList.save();
      res.redirect(`/${userParam}`);
    }else{
      res.render("time", { listTitle: list.name, newItems: list.items });
    }
  });
}