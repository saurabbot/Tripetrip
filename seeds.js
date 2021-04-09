var mongoose = require("mongoose");
var Package = require("./models/package");
var Review = require("./models/review");
var Car = require("./models/car");
var Traveller = require("./models/traveller");
var Bus = require("./models/bus");
var Bike = require("./models/bike");
var travellerData = [
	{
	name: "Force Traveller",
    power: 115,
    seats: 12,
    image: "https://ik.imagekit.io/TrucksBuses/uploads/Force%20Tempo%20Traveller%203350%20Super(1)(2).jpg",
	price: 44,
	}
]
var bikeData = [
	{
	brand: "KTM",
    model: "Duke 390",
    power: 44,
    image: "https://images.unsplash.com/photo-1560693312-f3be1898e06c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGR1a2UlMjAyMDB8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	price: 22,
	}
]
var busData = [
	{
	brand: "Ashok Leyland",
    model: "Oyster Wide",
    power: 147,
    image: "https://www.autocarpro.in/Utils/ImageResizer.ashx?n=http://img.haymarketsac.in/autocarpro/e675b06b-9c23-4825-a9d6-c540b817215c.jpg",
	price: 88,
		
	}
]
var carData = [
	{
		brand: "Tata",
		model: "Indica",
		power: 69,
		seats: 5,
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/2012_Tata_Indica_Safire_rear.JPG/440px-2012_Tata_Indica_Safire_rear.JPG",
		price: 333,
		
	}
]

var data = [
	{
		name: "manali",
		image: "https://images.unsplash.com/photo-1546180801-a9b3dd6ad440?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
		Itternary: "Day-1The journey starts with boarding an evening Volvo from Delhi to Bhuntar.Day-2	Arrive at Kasol by noon Enjoy the scenic view and explore the local markets.En route to Chalal, explore the ‘Little Amsterdam’, the lanes of Kasol lined with vibrant souvenir shops and Israeli cafes on your own.Day-3-Pack your rucksacks and head towards Bharsaini.Bharsaini is the starting point of the 12 km long trek to Kheerganga.While hiking through the splendid landscape of the beautiful valley, you will be treated to majestic sights of nature.On reaching the peak of Kheerganga wash off all your fatigue in the natural hot water spring near the ancient shiv mandir.Enjoy the night camping under the sky full of stars.Day-4Wake up to a magnificent view of the Himalayan peaks, and prepare for the journey back to Barshaini through the same route you took to reach Kheerganga.Head toward Manikaran and explore the indigenous religion and culture at the famous temples.Day-5	End of the trip ~ Reach Delhi in Morning with a bag full of memories.",
		smdesc: "Kasol, often called the mini Israel of India, is a small village situated along the banks of Parvati river",
		description: "Kasol, often called the mini Israel of India, is a small village situated along the banks of Parvati river. Located at an altitude of 1581m in Kullu district, Kasol is known for its picturesque landscapes and interesting culture. Its serene beautiful nature and adventure-packed experience of trekking, rafting, camping, sightseeing, and parties make it a hotspot destination for backpackers who are looking for getaways.",
		PTV: "Chalal trek– Resonating with the Israeli culture, the Chalal Village is enriched with the true essence which is depicted by its houses and mouth-watering cuisines. While looking for places to eat here you must visit the Tosh Cafe and try out some lip-smacking dishes from the Israeli cuisine.Kheerganga– Amongst the best places to visit in Kasol, Kheer Ganga showcases the panoramic beauty of the lush green hills and clear skies. A holy place, it lies at the extreme end of the Parvati Valley, transfixing you with the skies that are bluer and the hills that are greener than usual. A striking opportunity for beginners, the Kheer Ganga trek is counted as one of the easiest treks of Kasol. You sure don’t want to miss this chance.Manikaran– At a towering height of 1760 meters, Shiv Mandir in Manikaran is one of the remarkable Kasol tourist places. It is an ancient Hindu temple dedicated to Lord Shiva where he is worshipped in the form of a Shivalinga. Besides, the Shiv Mandir is immensely popular for its hot water springs and mountainous landscape. During the annual festival of Maha Shivaratri, celebrated in honor of Lord Shiva, this place attracts a huge number of devotees and pilgrims from around the world.Tosh– Located at an altitude of 2,400m above sea level, Tosh is a small village located on the banks of River Tosh. Situated at one edge of the Parvati Valley, Tosh is an offbeat destination in Kasol that attracts a lot of tourists from across the country because of its scenic beauty.Malana Village– An ancient village nestled away amidst the towering mountains of Himachal Pradesh, Malana is rather famous as the perfect holiday destination for hipsters. The location is surrounded by lush, green trees and incredible valleys, making it apt for those who love nature in its truest essence.Hot springs– The natural geological marvel, full of hot boiling water that is rich in Uranium and radioactive substances. The water within is considered auspicious and said to have healing properties for the human body that can cure skin and other disorders. There are folklores attached to the spring that hail their origin from Hindu and Sikh religions.",
		agency: "abc",
		price: 5000,
		
	},
	{
		name: "Kasol",
		image: "https://images.unsplash.com/photo-1546180801-a9b3dd6ad440?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
		Itternary: "Day-1The journey starts with boarding an evening Volvo from Delhi to Bhuntar.Day-2	Arrive at Kasol by noon Enjoy the scenic view and explore the local markets.En route to Chalal, explore the ‘Little Amsterdam’, the lanes of Kasol lined with vibrant souvenir shops and Israeli cafes on your own.Day-3-Pack your rucksacks and head towards Bharsaini.Bharsaini is the starting point of the 12 km long trek to Kheerganga.While hiking through the splendid landscape of the beautiful valley, you will be treated to majestic sights of nature.On reaching the peak of Kheerganga wash off all your fatigue in the natural hot water spring near the ancient shiv mandir.Enjoy the night camping under the sky full of stars.Day-4Wake up to a magnificent view of the Himalayan peaks, and prepare for the journey back to Barshaini through the same route you took to reach Kheerganga.Head toward Manikaran and explore the indigenous religion and culture at the famous temples.Day-5	End of the trip ~ Reach Delhi in Morning with a bag full of memories.",
		smdesc: "Kasol, often called the mini Israel of India, is a small village situated along the banks of Parvati river",
		description: "Kasol, often called the mini Israel of India, is a small village situated along the banks of Parvati river. Located at an altitude of 1581m in Kullu district, Kasol is known for its picturesque landscapes and interesting culture. Its serene beautiful nature and adventure-packed experience of trekking, rafting, camping, sightseeing, and parties make it a hotspot destination for backpackers who are looking for getaways.",
		PTV: "Chalal trek– Resonating with the Israeli culture, the Chalal Village is enriched with the true essence which is depicted by its houses and mouth-watering cuisines. While looking for places to eat here you must visit the Tosh Cafe and try out some lip-smacking dishes from the Israeli cuisine.Kheerganga– Amongst the best places to visit in Kasol, Kheer Ganga showcases the panoramic beauty of the lush green hills and clear skies. A holy place, it lies at the extreme end of the Parvati Valley, transfixing you with the skies that are bluer and the hills that are greener than usual. A striking opportunity for beginners, the Kheer Ganga trek is counted as one of the easiest treks of Kasol. You sure don’t want to miss this chance.Manikaran– At a towering height of 1760 meters, Shiv Mandir in Manikaran is one of the remarkable Kasol tourist places. It is an ancient Hindu temple dedicated to Lord Shiva where he is worshipped in the form of a Shivalinga. Besides, the Shiv Mandir is immensely popular for its hot water springs and mountainous landscape. During the annual festival of Maha Shivaratri, celebrated in honor of Lord Shiva, this place attracts a huge number of devotees and pilgrims from around the world.Tosh– Located at an altitude of 2,400m above sea level, Tosh is a small village located on the banks of River Tosh. Situated at one edge of the Parvati Valley, Tosh is an offbeat destination in Kasol that attracts a lot of tourists from across the country because of its scenic beauty.Malana Village– An ancient village nestled away amidst the towering mountains of Himachal Pradesh, Malana is rather famous as the perfect holiday destination for hipsters. The location is surrounded by lush, green trees and incredible valleys, making it apt for those who love nature in its truest essence.Hot springs– The natural geological marvel, full of hot boiling water that is rich in Uranium and radioactive substances. The water within is considered auspicious and said to have healing properties for the human body that can cure skin and other disorders. There are folklores attached to the spring that hail their origin from Hindu and Sikh religions.",
		agency: "abc",
		price: 5000,
		
	}
]

//add Package
function seedDB(){
	Traveller.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed traveller")
		}
		//add a car
		travellerData.forEach(function(seed){
			Traveller.create(seed, function(err, traveller){
				if(err){
					console.log(err);
				} else {
					console.log("added a  traveller ");
				}
			});
		});
	});
	Bus.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed Bus")
		}
		//add a car
		busData.forEach(function(seed){
			Bus.create(seed, function(err, bus){
				if(err){
					console.log(err);
				} else {
					console.log("added a  bus ");
				}
			});
		});
	});
	Bike.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed bike")
		}
		//add a car
		bikeData.forEach(function(seed){
			Bike.create(seed, function(err, bike){
				if(err){
					console.log(err);
				} else {
					console.log("added a  bike");
				}
			});
		});
	});
	Car.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed Cars")
		}
		//add a car
		carData.forEach(function(seed){
			Car.create(seed, function(err, car){
				if(err){
					console.log(err);
				} else {
					console.log("added a  car ");
				}
			});
		});
	});
	//Remove package
	Package.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		Review.remove({}, function(err){
			if(err){
				console.log(err);
			}
			console.log("removed comments");
			//add a few comments
			data.forEach(function(seed){
				Package.create(seed, function(err, package){
					if(err){
						console.log(err);
					}
					else {
						console.log("added a package");
						//create a review
						Review.create({
							text: "This place is great, but i wish the internet comnection was good here",
							author: "Bashir"
						}, function(err, review){
							if(err){
								console.log(err);
							} else {
								package.reviews.push(review);
								package.save();
								console.log("New review made ");
							}
						});
					}
				});
			});
		});
	});
}

module.exports = seedDB;