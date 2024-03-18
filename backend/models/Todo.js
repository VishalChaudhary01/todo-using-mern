const mongoose = require("mongoose");
const joi = require("joi");

const todoSchema = new mongoose.Schema(
     {
          title: {
               type: String,
               required: true
          },
          description: {
               type: String,
          },
          completed: {
               type: Boolean
          }
     },
     { timeseries: true }
);

const schema = joi.object({
     title: joi.string().required(),
     description: joi.string(),
     completed: joi.boolean(),
})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
     Todo,
     schema
}