require('dotenv').config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var axios = require("axios");
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Package = require("./models/package");
var Review = require("./models/review");
var Car = require("./models/car");
var Bus = require("./models/bus");
var Bike = require("./models/bike");
var Traveller = require("./models/traveller");
const nodemailer = require("nodemailer");
const seedDB = require("./seeds");
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// var api_key = 'ab203954980ee87825bd327c8e1a04cb-e687bab4-6fb1dc56';
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox70d5a1f9e67b4d72846bd5f72b8e3900.mailgun.org';
// const mg = mailgun({apiKey: api_key, domain: DOMAIN});

//Mongoose Connection
mongoose.connect("mongodb://localhost/tripetrip");
app.set("view engine", "ejs");
seedDB();
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
//Passport configs
app.use(require("express-session")({
	secret: "Once again rusty wins the cutest dog",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(Admin.authenticate()));
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
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
	if(req.body.adminCode === 'trip672#') {
      newUser.isAdmin = true;
    }
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
// app.post('/send', async (req, res) => {
// 	var email = req.body.email;
// 	var name = req.body.name;
// 	var message = req.body.message;
// 	const msg = {
// 		  to: 'saurabhnamb@gmail.com',
// 		  from: 'tripetrip01@gmail.com', // Use the email address or domain you verified above
// 		  subject: 'Sending with Twilio SendGrid is Fun',
// 		  text: 'and easy to do anywhere, even with Node.js',
// 		  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// 		};
// 	try {
// 		await sgMail.send(msg);
// 		//req.flash('success', 'Thank you for your email, we will get back to you shortly.');
// 		res.redirect('/contact');
// 	  } catch (error) {
// 		console.error(error);
// 		if (error.response) {
// 		  console.error(error.response.body)
// 		}
// 		//req.flash('error', 'Sorry, something went wrong, please contact admin@website.com');
// 		res.redirect('back');
// 	  }
// });
	//FOR MAILGUN.js
	// const output = `
	// <p>You have a new contact request</p>
	// <h3>Contact Details</h3>
	// <ul>  
	// <li>Name: ${req.body.name}</li>
	// <li>Company: ${req.body.company}</li>
	// <li>Email: ${req.body.email}</li>
	// <li>Phone: ${req.body.phone}</li>
	// </ul>
	// <h3>Message</h3>
	// <p>${req.body.message}</p>
	// `;
	// var data = {
	//   from: 'Saurabh<nambiarfirefox@yahoo.com>',
	//   to: 'nambiarfirefox@yahoo.com',
	//   subject: 'Hello',
	//   text: 'hi there'
	// };

	// mg.messages().send(data, function (error, body) {
	// 	if(error){
	// 		console.log(error);
	// 	} else {
	// 		console.log(body);
	// 		res.redirect("/contact-us")
	// 	}
	  
	// });
  //IF NODEMAILER IS USED
  // const output = `
  //   <p>You have a new contact request</p>
  //   <h3>Contact Details</h3>
  //   <ul>  
  //     <li>Name: ${req.body.name}</li>
  //     <li>Company: ${req.body.company}</li>
  //     <li>Email: ${req.body.email}</li>
  //     <li>Phone: ${req.body.phone}</li>
  //   </ul>
  //   <h3>Message</h3>
  //   <p>${req.body.message}</p>
  // `;

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: 'mail.traversymedia.com',
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //       user: 'beenanambiar8@gmail.com', // generated ethereal user
  //       pass: 'beenavinod'  // generated ethereal password
  //   },
  //   tls:{
  //     rejectUnauthorized:false
  //   }
  // });

  // // setup email data with unicode symbols
  // let mailOptions = {
  //     from: '"Nodemailer Contact" <beenanambiar8@gmail.com>', // sender address
  //     to: 'saurabhnamb@gmail.com', // list of receivers
  //     subject: 'Node Contact Request', // Subject line
  //     text: 'Hello world?', // plain text body
  //     html: output // html body
  // };

  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  // alert("Eauth Issue");
  //     }
  //     console.log('Message sent: %s', info.messageId);   
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // res.render("contactus")
  // alert("Email sent");
  // });

app.get("/packages", function(req, res){
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		//get all packages
		Package.find({name: regex}, function(err, allPackeages){
			if(err){
				console.log(err);

			} else {
				
				if(allPackeages.length < 1){
					var noMatch = "Nothing was Found.Please Try Again.";
				}
				res.render("package", {package: allPackeages,noMatch: noMatch});
			}
		});
	} else {
		Package.find({}, function(err, allPackeages){
			if(err){
				console.log(err);

			} else {
				res.render("package", {package: allPackeages});
			}
		});
	}
	
});
//New Packages only for isAdmin
app.get("/packages/new", (req, res)=>{
	res.render("packnew");
});
app.post("/packages", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var Itternary = req.body.Itternary;
	var description = req.body.description;
	var PTV = req.body.PTV;
	var smdesc = req.body.smdesc;
	var agency = req.body.agency;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newPackage = {name: name,image: image,Itternary: Itternary,description: description,PTV: PTV,smdesc: smdesc,agency: agency,price: price,author: author};
	Package.create(newPackage, function(err, package){
		if(err){
			console.log("err");
		} else {
			res.redirect("/packages")
		}
	});
});
//Specific Package
app.get("/packages/:id", isLoggedIn, (req, res) => {
	//Find a package with respect to the id
	Package.findById(req.params.id).populate("reviews").exec(function(err, package){
        if(err){
            console.log(err);
        } else {
            console.log(package)
            //render show template with that campground
            res.render("show", {pack: package});
        }
    });
});

//Treks page
app.get("/treks", function(req, res){
	res.render("treks");
});
//ADventures page
app.get("/adventures", function(req, res){
	res.render("adventures");
});
//Comments
//Comment New
app.get("/packages/:id/reviews/new", function(req, res){
	//Find the package according to id
	Package.findById(req.params.id, function(err, package){
		if(err){
			console.log(err);
		} else {
			res.render("new", {pack: package});
		}
	});
});
//Post the comment to the campground
app.post("/packages/:id/reviews", (req, res) => {
	//Look by id
	Package.findById(req.params.id, function(err, package){
		if(err){
			console.log(err);
			res.redirect("/packages");
		} else {
			Review.create(req.body.review, function(err, review){
				if(err){
					console.log(err);
				} else {
					//add username and ID to comment
                review.author.id = req.user._id;
                review.author.username = req.user.username;
                    //save comment
                    review.save();
                    package.reviews.push(review);
                    package.save();
                    res.redirect("/packages/" + package._id);
				}
			});
		}
	});
});
//delete package
app.delete("/packages/delete/:id", (req, res) => {
	Package.findByIdAndRemove(req.params.id, (err) =>{
		if(err){
			console.log(err);
			res.redirect("/packages");
		} else {
			res.redirect("/packages")
		}
	});
});
//review delete from packages
app.delete("/packages/:id/review/:review_id", (req, res) =>{
	var review_id = req.params.review_id
	Review.findByIdAndRemove(review_id, function(err){
		if(err){
			console.log(err)
			res.redirect("back");
		} else {
			res.redirect("/packages" + req.params.id);
		}
	});
});
app.get("/commutes", (req, res) => {
		Car.find({}, function(err, allCars){
			Traveller.find({}, function(err, allTravellers){
				Bus.find({}, function(err, allBuses){
					Bike.find({}, function(err, allBikes){
						if(err){
							console.log(err);
						}
					if(err){
						console.log(err);
					}
				if(err){
					console.log(err);
				}
			
			if(err){
				console.log(err);

			} else {
				
				res.render("commutes", {car: allCars,traveller: allTravellers,bus: allBuses,bike: allBikes});
			}
		    });
			});	
			});
		});
});
//newcar
app.get("/commutes/carnew", function(req, res){
	res.render("carnew")
});
app.post("/commutes/carnew", (req, res) => {
	var brand = req.body.brand;
	var model = req.body.model;
	var image = req.body.image;
	var price = req.body.price;
	var seats = req.body.seats;
	var power = req.body.power;
	var newCar ={brand: brand,model: model,image: image,price: price,seats: seats,power: power};
	Car.create(newCar, function(err, car){
		if(err){
			console.log(err);
		} else {
			res.redirect("/commutes");
		}
	})
});
//new bike
app.get("/commutes/bikenew", function(req, res){
	res.render("bikenew.ejs")
});
app.post("/commutes/bikenew", (req, res) => {
	var brand = req.body.brand;
	var model = req.body.model;
	var image = req.body.image;
	var price = req.body.price;
	var power = req.body.power;
	var newBike ={brand: brand,model: model,image: image,price: price,power: power};
	Bike.create(newBike, (err, bike) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/commutes");
		}
	});
});
app.get("/commutes/travellernew", (req, res) => {
	res.render("travellernew");
});
app.post("/commutes/travellernew", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var power = req.body.power;
	var seats = req.body.seats;
	var newTraveller = {name: name,image: image,price: price,power: power,seats: seats};
	Traveller.create(newTraveller, (err, traveller) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/commutes");
		}
	});
	
});
// addbus
app.get("/commutes/busnew", (req, res) => {
	res.render("busnew");
});
app.post("/commutes/busnew", (req,  res) => {
	var brand = req.body.brand;
	var model = req.body.model;
	var image = req.body.image;
	var price = req.body.price;
	var power = req.body.power;
	var newBus ={brand: brand,model: model,image: image,price: price,power: power};
	Bus.create(newBus, (err, traveller) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/commutes");
		}
	});
});
app.get("/commutes/car/:id", (req, res) => {
	Car.findById(req.params.id, function(err, foundCar){
		if(err){
			console.log(err);
		} else {
			res.render("showcar", {car: foundCar});
		}
	});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
// app.listen(5000, () => {
// 	console.log("The Tripetripserver has started");
// });
app.listen(3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});