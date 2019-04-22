"use strict";
// Creating DOM variables
let heading = document.getElementsByClassName("topic-header")[0];
let paragraph = document.getElementsByClassName("topic-text");
let image = document.getElementsByClassName("topic-image");
let btnContainer = document.getElementById("button-container");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let statBtn = document.getElementById("stat");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyA7ubRngdHYxkhJz15gd8-I2uqT5ShGX7o",
	authDomain: "eas-project.firebaseapp.com",
	databaseURL: "https://eas-project.firebaseio.com",
	projectId: "eas-project",
	storageBucket: "eas-project.appspot.com",
	messagingSenderId: "1007350491336"
};
firebase.initializeApp(config);
var db = firebase.firestore();

// Adds to database count for opening the web page
var docRef = db.collection("views").doc("count");
docRef.get().then(function(doc) {
    if (doc.exists) {
        var siteViews = db.collection("views");
		siteViews.doc("count").set({"count": doc.data().count + 1});
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// Updates first page views
sendToDb(0);

// Normal variables
let imageArray = ["first-page-image.jpg", "fate-quote.jpg", "star-intro.png", "proto-disk.jpg", "accretion-disc.jpg", "gravity.jpg", "planetesimals.png", "life-planet.jpg", "books.png"];
let paraArray = [
					[""],
					[
					"Welcome to Planet Formation 101! By clicking on that next button, you’ll start a journey through time, before humans existed, before the dinosaurs existed, before our solar system even existed. It’s truly a wonder how we even got to this point, where you’re clicking through this information and teaching yourself about planets. It must be fate.",
					"Without further ado, click the button below to begin!"
					],
					[
					"Stars are the backbone of a solar system. They provide energy and the potential for life. But how did they get here? Was it a god? Are religions correct? Or is there a scientific way to explain their existence?",
					],
					[
					"Before there can be stars, there must be molecular clouds. These are simply large clouds made up of dust and rock that, over time, collapse under its own gravity. Once this happens, the cloud begins spinning and a protostar is able to form in the center.",
					"Where do planets come in?",
					"So why is star formation important? How does this relate to planet formation? The key is in the disk that forms around the star: the protoplanetary disk."
					],
					[
					"The material in the protoplanetary disk is the same material that was in the molecular cloud before the protostar formed - rocks and stellar dust. As the disk orbits the young star, these particles gradually stick together and create larger and larger particles. This process is known as accretion."
					],
					[
					"The increasing size of these particles eventually begins to pull other particles towards it because of its larger gravitational force. This begins a snowball effect, in which the larger particle size leads to a larger gravitational force which attracts more particles, which creates a larger particle, which leads to…"
					],
					[
					"These particles, in time, grow big enough to be classified as planetesimals. There are, of course, differences in the types of planets that will form from these planetesimals. A lot of this has to do with the distance from the star at which the planetesimals form. For example, because the star will have accumulated most of the gas in the solar system, the planetesimals closer to the star will become rocky planets. When you start getting further away from the star, planetesimals can become ice and gas giants."
					],
					[
					"As planetesimals continue to orbit the star, they will continue to gather loose material in its orbit and grow in size. Planetesimals, because of their increasing gravitational pull, may even collide with other planetesimals! After millions of years, some planets may even become habitable, but that’s a conversation for another day.",
					"Why does this matter?",
					"Stars and planets allow us to exist, protecting us from the dark recesses of space and providing us with enough energy to survive on our planet. For this reason, we, as the inhabitants of planet Earth, must do as much as possible to give back and protect our planet from ourselves. Improved sustainability will allow us to exist for millennia to come.",
					"Where do we go from here?",
					"There are several new theories as to how planets may form. For example, according to Laird Close in his article, “A giant surprise”, around the star HR 8799, there are 4 giant planets that seem to have formed in conjunction, which doesn’t make sense considering our current planet-forming process.",
					"Understanding how our planets form is incredibly important. It gives us an appreciation for our own home and will hopefully inspire us to make sure we continue to have a future on Earth."
					],
					[
					"Close, Laird. “Extrasolar Planets: A Giant Surprise.” Nature News, Nature Publishing Group, 8 Dec. 2010, www.nature.com/articles/nature09716.s<br>" +
					"“Discovering Planets Beyond - How Do Planets Form?” HubbleSite, hubblesite.org/hubble_discoveries/discovering_planets_beyond/how-do-planets-form."
					]
				];
let headingArray = ["Planet Building", "Introduction", "Stars Intro", "Star Formation 1", "Planet Formation 1", "Planet Formation 2", "Planet Formation 3", "Planet Formation 4", "Works Cited"];
const numPages = headingArray.length;
let count = 0;


// Events that change the view of the window
nextBtn.addEventListener("click", function() {
	sendToDb(count + 1);
	count++;
	changeInfo();
});

prevBtn.addEventListener("click", function() {
	sendToDb(count - 1);
	count--;
	changeInfo();
});

function changeInfo() {
	count = count % numPages;
	heading.innerHTML = headingArray[count];
	for (let i = 0; i < paraArray[count].length; i++) {
		paragraph[i].innerHTML = paraArray[count][i];
	}
	for (let i = paraArray[count].length; i < paragraph.length; i++) {
		paragraph[i].innerHTML = "";
	}
	image[0].src = "images/" + imageArray[count];
	if ((count > 0) && (count != numPages - 1)) {
		btnContainer.style.justifyContent = "space-between";
		prev.style.display = "block";
		next.innerHTML = "Next";
	} else {
		prev.style.display = "none";
		if (count == numPages - 1) {
			next.innerHTML = "Restart";
			stat.style.display = "block";
		} else {
			btnContainer.style.justifyContent = "flex-end";
			next.innerHTML = "Next";
			stat.style.display = "none";
		}
	}
}

function sendToDb(num) {
	var ref = db.collection("clicks").doc("page" + num);

	ref.get().then(function(doc) {
	    if (doc.exists) {
	        var docData = doc.data().count;
	        return ref.update({
			    count: docData + 1
			})
			.then(function() {
			    console.log("Document successfully updated!");
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    console.error("Error updating document: ", error);
			});
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});
}