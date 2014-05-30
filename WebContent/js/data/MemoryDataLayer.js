/**
 * 
 */
var memory = memory || {};
memory.ArrayFunctions = (function() {
	return {
		shuffle: function(o) {
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;			
		},
		duplicate: function(a) {
			var temp = [];
			a.forEach(function(value) {
				temp.push(value);
				temp.push(value);
			});
			return temp;		
		}
	};
})();

//Store images locally temp
var images = ["images/panda.jpg", "images/frog.jpg", "images/cheetah.jpg", "images/elephant.jpg"];
//The shuffled array of images containing two of each
var shuffledImages = memory.ArrayFunctions.shuffle(memory.ArrayFunctions.duplicate(images));

var imageWithIdArray = [];
for (var i = 0; i < shuffledImages.length; i++) {
	var id = i + 1;
	imageWithIdArray.push({id: "pos-" + id, image: shuffledImages[i]});
}


define(["dojo/_base/declare", "dojo/topic"], function(declare, topic) {
	
	return declare(null, {
		constructor: function(topicName){
			this.topicName = topicName;
		},
    
		startGame: function() {	
			//Gameinfo
			topic.publish(this.topicName, {
				functionName: "gameInfo",
				args : {
					images: imageWithIdArray,
					player1: "Jonas",
					player2: "Moya"	
				}
			});
			
			//Your turn
			topic.publish(this.topicName, {
				functionName: "yourMove",
				args : true
			});
	    },
	    
	    firstCellSelected: function(tdId) {
	    	//Do nothing
	    },
	    
	    secondCellSelected: function(tdId) {
	    	var self = this;
	    	window.setTimeout(function() {
	    		topic.publish(self.topicName, { 
	    			functionName: "moveResult",
	    			args: {
		    			score: { 
		    				player1: 2,
							player2: 2
						}
	    			}
	    		});
	    	}, 2000);
	    	window.setTimeout(function() {
	    		topic.publish(self.topicName, { 
	    			functionName: "moveResult",
	    			args: {
		    			score: { 
		    				player1: 2,
							player2: 3
						},
						previousMove: {
							id1: "pos-1",
							id2: "pos-3"
						},
						yourMove: true
	    			}
	    		}	
	    		);
	    	}, 4000);
	    },
    
	});

});