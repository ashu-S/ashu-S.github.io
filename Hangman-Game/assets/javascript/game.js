window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var topics;         // Array of topics
  var chosenTopic;     // Selected topic
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var i=0;

  // Get elements
  var showLives = document.getElementById("guessesRemained");
  var showTopic = document.getElementById("stopic");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  var showImg = document.getElementById("hangman")



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectTopic = function () {
    if (chosenTopic === topics[0]) {
      topicName.innerHTML = "The Chosen Topic Is Films";
    } else if (chosenTopic === topics[1]) {
      topicName.innerHTML = "The Chosen Topic Is Cities" ;
    } 
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

     // Animate man
  // var animate = function () {
  //   var drawMe = lives ;
  //   drawArray[drawMe]();
  // }

      // Create hangman div

    var imageList = ["<img src='../assets/images/hangman0.jpg'>",
                     "<img src='../assets/images/hangman1.jpg'>",
                     "<img src='../assets/images/hangman2.jpg'>",
                     "<img src='../assets/images/hangman3.jpg'>",
                     "<img src='../assets/images/hangman4.jpg'>",
                     "<img src='../assets/images/hangman5.jpg'>",
                     "<img src='../assets/images/hangman6.jpg'>",
                     "<img src='../assets/images/hangman7.jpg'>" ] 


      showHangman = function() {
        console.log(i);
        if (i>0)
        {
          console.log("removing child");
          showImg.removeChild(image);
        }
        if (lives < 7)  
        {  

         console.log("creating child"); 
        var image = document.createElement("div");
        image.innerHTML = imageList[i];
        showImg.appendChild(image);
        i++;
      }
   }



  


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        showHangman();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    topics = [
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenTopic = topics[Math.floor(Math.random() * topics.length)];
    word = chosenTopic[Math.floor(Math.random() * chosenTopic.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectTopic();
    // showHangman();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  // document.getElementById('reset').onclick = function() {
  //   correct.parentNode.removeChild(correct);
  //   letters.parentNode.removeChild(letters);
  //   showClue.innerHTML = "";
  //   context.clearRect(0, 0, 400, 400);
  //   play();
  // }
}