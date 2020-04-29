//entry point
const mongoose = require("mongoose");

//return a promoise
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

//create collection
//can use primitive
//lowercased for collection (with a schema)
const student = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: [
      {
        type: String,
      },
    ],
    info: {
      school: {
        type: String,
      },
      showSize: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

//convert schema to mongoose/mongo model
//1.lowercase for the collection
//2.DONT PLURALIZE
//uppercase for model
const Student = mongoose.model("student", student);

//connect to db async and create new student
connect()
  .then(async (connection) => {
    //return a mongoose document, mongo however consumes and generates JSON
    const student = await Student.create({ firstName: "Tim" });
    //const found Student.find({ firstName: "" });
    //const foundById = Student.findById("");
    //const foundByIdUpdate = Student.findByIdAndUpdate("", "");
    console.log(student);
  })
  .catch((e) => console.log(e));

//return data
//{ _id: 5ea8b1d762ad49a808e8efe6, firstName: 'Tim', __v: 0 }
//BSON? garantee unique id unlike others use a counter
