var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var axios = require("axios");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
const nodemailer = require("nodemailer");
//Mongoose Connection
mongoose.connect("mongodb://localhost/tripetrip");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
//Passport configs
app.use(require("express-session")({
	secret: "Once again rusty wins the cutest dog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});
//bodyParserSetup
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/",function(req, res){
	res.render("landing");
});

app.get("/register", function(req, res){
	res.render("register");
});
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username,email: req.body.email,phoneno:req.body.phoneno});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		});
	});
});

app.get("/login", function(req, res){
	res.render("login");
});
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

app.get("/contact-us", function(req, res){
	res.render("contactus");
});
app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.tripetrip.in',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: ''  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <beenanambiar8@gmail.com>', // sender address
      to: 'saurabhnamb@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	  res.render("contactus")
  });
  });
app.listen(3000, () => {
	console.log("The Tripetripserver has started");
});
