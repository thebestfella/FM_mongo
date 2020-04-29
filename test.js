//entry point
const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

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
      //unique: true,
    },
    favorite: [{ type: String }],
    info: {
      school: {
        type: String,
      },
      showSize: {
        type: Number,
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "school",
    },
  },
  { timestamps: true }
);

//will put school on the student, make sure that's how you decalre an array
const school = new mongoose.Schema({
  distric: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "district",
  },
  name: {
    type: String,
  },
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{ type: String }],
});

//need name to live uner district because there could be multiple "mlk" schools but just
//under different school district
school.index(
  {
    district: 1,
    name: 1,
  },
  { unique: true }
);

//advanced customed validation before mongoose validation (sync func)
school.pre("validate", function () {
  console.log("before validate");
});

//after mangoose validation (async func - it asks 2 argument)
school.post("save", function (doc, next) {
  setTimeout(() => {
    console.log("post save async", doc);
    next();
  }, 2000);
});

//school.pre("findOne",func...)
//school.post("save", function () {

//add Virtual getter, needs to be added before model creation
//dont use arrow function
school.virtual("staffCount").get(function () {
  console.log("in virtual");
  return this.staff.length;
});

//convert schema to mongoose/mongo model
//1.lowercase for the collection
//2.DONT PLURALIZE
//uppercase for model
const Student = mongoose.model("student", student);
const School = mongoose.model("school", school);

//connect to db async and create new student
const now = Date.now();
connect()
  .then(async (connection) => {
    //return a mongoose document, mongo however consumes and generates JSON

    const schoolConfig1 = {
      name: "MLK elementary",
      openSince: 2009,
      students: 1000,
      isGreat: true,
      staff: ["a", "b", "c"],
    };
    const schoolConfig2 = {
      name: "Larry Middle School",
      openSince: 1980,
      students: 600,
      isGreat: false,
      staff: ["d", "e", "f"],
    };

    const school = await School.create(schoolConfig1);
    console.log(school);
    console.log(school.staffCount);

    //const match = await School.findOne({ staff: "d" });
    //console.log(match);

    //const school = await School.create({ name: "MLK elementary" });
    // const student = await Student.create({
    //   firstName: "Tim10",
    //   school: school._id, //noted use ._id here
    // });

    //populate will check if schema has ref, and it will find the ref
    // const match = await Student.findById(student.id).populate("school");
    // console.log(match);

    //other useful methods
    //const found = Student.find({ firstName: "" });
    //const foundById = Student.findById("");
    //const foundByIdUpdate = Student.findByIdAndUpdate("", "");
  })
  .catch((e) => console.log(e));

//return data
//{ _id: 5ea8b1d762ad49a808e8efe6, firstName: 'Tim', __v: 0 }
//BSON? garantee unique id unlike others use a counter
