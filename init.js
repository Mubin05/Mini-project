const mongoose = require("mongoose");
const Chat=require("./models/chat.js"); 
main()
.then(()=> {
     console.log("connection successful");
})
.catch(err => console.log(err));
async function main(){
 await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats=[
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam notes",
        created_at: new Date(), 
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "teach me JS callbacks",
        created_at: new Date(),
    },
    {
        from: "rohan",
        to: "priya",
        msg: "share some inshightful news",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "rohan",
        msg: "Tutankhamun curse or radiation from tomb? Mystery deaths of 1922: A new insight",
        created_at: new Date(),
    },
    {
        from: "mohit",
        to: "rohit",
        msg: "OK sure ",
        created_at: new Date(),
    },
]
Chat.insertMany(allChats);
