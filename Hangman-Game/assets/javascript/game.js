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
  var mute = false;               //To mute or unmute sound  
  var mySound = new sound("../Hangman-Game/assets/music/Bg-tune.mp3");
  var gameOver_tune= new sound("../Hangman-Game/assets/music/gameOver-tune.mp3");
  var applause_tune= new sound("../Hangman-Game/assets/music/applause-tune.mp3");

  // Get elements
  var showLives = document.getElementById("guessesRemained");
  var showTopic = document.getElementById("stopic");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  var showImg = document.getElementById("hangman");
  var showGuessImg= document.getElementById("showGuessImg");



  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
  }

  //mute sound function

  stopMusic.onclick =function()
  {
    mySound.stop();
  } 

  playMusic.onclick =function()
  {
    mySound.play();
  } 






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

  // // Show the image related to the Guess word.

  guessImages = [
        ["<img class='guess-img' src='../Hangman-Game/assets/images/Alien.jpg'> ",
            "<img class='guess-img' src='../Hangman-Game/assets/images/harry.jpg'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/gladiator.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/findingNemo.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/jaws.jpg'>"],
        ["<img class='guess-img' src='../Hangman-Game/assets/images/manchester.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/milan.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/madrid.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/amsterdam.png'>",
            "<img class='guess-img' src='../Hangman-Game/assets/images/prague.png'>"]
      ];

  showGuessImage = function(){

      var topicIndex = topics.indexOf(chosenTopic);
      var imgIndex = chosenTopic.indexOf(word);
      showGuessImg.innerHTML = guessImages[topicIndex][imgIndex];
      
    }
  
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      gameOver_tune.play();
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        applause_tune.play();
        showLives.innerHTML = "You Win!";
        showGuessImage(); 
      }
    }
  }

   // Create hangman div

    var imageList = ["<img class='hangman-img' src='../Hangman-Game/assets/images/background.png'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman0.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman1.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman2.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman3.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman4.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman5.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman6.jpg'>",
                     "<img class='hangman-img' src='../Hangman-Game/assets/images/hangman7.jpg'>" ] 


      showHangman = function() {
        console.log("inside showHangman");
        console.log(i);
        if(i<imageList.length)
        { 
        showImg.innerHTML = imageList[i];
             i++; }
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
      console.log(j);
      if (j === -1) {
        lives -= 1;
        showHangman();
        comments();
        
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
    mySound.play();
    result();
    comments();
    selectTopic();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var topicIndex = topics.indexOf(chosenTopic);
    var hintIndex = chosenTopic.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [topicIndex][hintIndex];
  };

  

  // Reset or Play again

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    showImg.innerHTML = "";
    showGuessImg.innerHTML = "";
    i=0;
    play();
  }
}