//Global variables
//audio clips
var audio = new Audio('assets/music/imperial_march.mp3');
var force = new Audio('assets/music/force.mp3');
var blaster = new Audio('assets/music/blaster-firing.mp3');
var jediKnow = new Audio('assets/music/jedi-know.mp3');
var lightsaber = new Audio('assets/music/light-saber-on.mp3');
var rtwoo = new Audio('assets/music/R2D2.mp3');
//
var saber          = new Audio("assets/music/sabersounds/coolsaber.wav");
var darkMusic      = new Audio("assets/music/themes/immolation.mp3");
var battle         = new Audio("assets/music/themes/battle.mp3");
var slowSaber      = new Audio("assets/music/sabersounds/slowSabr.wav");
// var yoda        = new Audio("http://www.yodajeff.com/multimedia/sounds/episode5/use_the_force.wav");
// var emperor     = new Audio("assets/music/voices/emperor.mp3");
var vader          = new Audio("assets/music/voices/vader.wav");
var maul           = new Audio("assets/music/sabersounds/double bladed twirl.wav")
var luke           = new Audio("assets/music/voices/luke.wav");
var obi            = new Audio("assets/music/sabersounds/fx4.wav");
var vader2         = new Audio("assets/music/voices/haveyou.wav");

//Array of Playable Characters
var characters = {
    'Maul': {
        name: 'Maul',
        health: 120,
        attack: 8,
        imageUrl: "assets/images/dark_side/maul.jpg",
        enemyAttackBack: 15
    }, 
    'Darth': {
        name: 'Darth',
        health: 100,
        attack: 14,
        imageUrl: "assets/images/dark_side/vader.png",
        enemyAttackBack: 5
    }, 
    'Kenobi': {
        name: 'Kenobi',
        health: 150,
        attack: 8,
        imageUrl: "assets/images/light_side/kenobi.jpg",
        enemyAttackBack: 20
    }, 
    'Luke': {
        name: 'Luke',
        health: 180,
        attack: 7,
        imageUrl: "assets/images/light_side/luke.jpg",
        enemyAttackBack: 20
    }
};

var currSelectedCharacter;
var currDefender;
var combatants = [];
var indexofSelChar;
var attackResult;
var turnCounter = 1;
var killCount = 0;

//  Main page of the star wars - battle
$(document).ready(function() {

var renderOne = function(character, renderArea, makeChar) {
    
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
    // conditional render
    if (makeChar == 'enemy') {
      $(charDiv).addClass('enemy');
    } else if (makeChar == 'defender') {
      currDefender = character;
      $(charDiv).addClass('target-enemy');
    }
  };

  // Create function to render game message to DOM
  var renderMessage = function(message) {
    var gameMesageSet = $("#gameMessage");
    var newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
      gameMesageSet.text('');
    }
  };

  var renderCharacters = function(charObj, areaRender) {
    //render all characters
    if (areaRender == '#characters-section') {
      $(areaRender).empty();
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          renderOne(charObj[key], areaRender, '');
        }
      }
    }
    //render player character
    if (areaRender == '#selected-character') {
      $('#selected-character').prepend("Your Character");       
      renderOne(charObj, areaRender, '');
      $('#attack-button').css('visibility', 'visible');
    }
    //render combatants
    if (areaRender == '#available-to-attack-section') {
        $('#available-to-attack-section').prepend("Choose Your Next Opponent");      
      for (var i = 0; i < charObj.length; i++) {

        renderOne(charObj[i], areaRender, 'enemy');
      }
      //render one enemy to defender area
      $(document).on('click', '.enemy', function() {
        //select an combatant to fight
        name = ($(this).data('name'));
        //if defernder area is empty
        if ($('#defender').children().length === 0) {
          renderCharacters(name, '#defender');
          $(this).hide();
          renderMessage("clearMessage");
        }
      });
    }
    //render defender
    if (areaRender == '#defender') {
      $(areaRender).empty();
      for (var i = 0; i < combatants.length; i++) {
        //add enemy to defender area
        if (combatants[i].name == charObj) {
          $('#defender').append("Your selected opponent")
          renderOne(combatants[i], areaRender, 'defender');
        }
      }
    }
    //re-render defender when attacked
    if (areaRender == 'playerDamage') {
      $('#defender').empty();
      $('#defender').append("Your selected opponent")
      renderOne(charObj, '#defender', 'defender');
      lightsaber.play();
    }
    //re-render player character when attacked
    if (areaRender == 'enemyDamage') {
      $('#selected-character').empty();
      renderOne(charObj, '#selected-character', '');
    }
    //render defeated enemy
    if (areaRender == 'enemyDefeated') {
      $('#defender').empty();
      var gameStateMessage = "You have defated " + charObj.name + ", you can choose to fight another enemy.";
      renderMessage(gameStateMessage);
      blaster.play();
    }
  };
  //this is to render all characters for user to choose their computer
  renderCharacters(characters, '#characters-section');
  $(document).on('click', '.character', function() {
    name = $(this).data('name');

  //-- Function to play the related theme music ---------------------
  
     //----- Darth
    if (name == 'Vader')
    {
      vader.play();
    }
  //----- Maul
    if (name == 'Maul')
    {
      maul.play();
    }
  //----- Kenobi
    if (name == 'Kenobi')
    {
      obi.play();
    }
  //----- Luke
    if (name == 'Luke')
    {
      luke.play();
    }
    //if no player char has been selected
    if (!currSelectedCharacter) {
      currSelectedCharacter = characters[name];
      for (var key in characters) {
        if (key != name) {
          combatants.push(characters[key]);
        }
      }
      $("#characters-section").hide();
      renderCharacters(currSelectedCharacter, '#selected-character');
      //this is to get all characters for user to choose fight against
      renderCharacters(combatants, '#available-to-attack-section');
    }
  });
// });  

  // ----------------------------------------------------------------


  // Create functions to enable actions between objects.
  $("#attack-button").on("click", function() {
    //if defernder area has enemy
    if ($('#defender').children().length !== 0) {
      //defender state change
      var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
      renderMessage("clearMessage");
      //combat
      currDefender.health = currDefender.health - (currSelectedCharacter.attack * turnCounter);

      //win condition
      if (currDefender.health > 0) {
        //enemy not dead keep playing
        renderCharacters(currDefender, 'playerDamage');
        //player state change
        var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        currSelectedCharacter.health = currSelectedCharacter.health - currDefender.enemyAttackBack;
        renderCharacters(currSelectedCharacter, 'enemyDamage');
        if (currSelectedCharacter.health <= 0) {
          renderMessage("clearMessage");
          restartGame("You have been defeated...GAME OVER!!!");
          force.play();
          $("#attack-button").unbind("click");
        }
      } else {
        renderCharacters(currDefender, 'enemyDefeated');
        killCount++;
        if (killCount >= 3) {
          renderMessage("clearMessage");
          restartGame("You Won!!!! GAME OVER!!!");
          jediKnow.play();
          // The following line will play the imperial march:
          setTimeout(function() {
          audio.play();
          }, 2000);

        }
      }
      turnCounter++;
    } else {
      renderMessage("clearMessage");
      renderMessage("No enemy here.");
      rtwoo.play();
    }
  });

//Restarts the game - renders a reset button
  var restartGame = function(inputEndGame) {
    //When 'Restart' button is clicked, reload the page.
    var restart = $('<button class="btn">Restart</button>').click(function() {
      location.reload();
    });
    var gameState = $("<div>").text(inputEndGame);
    $("#gameMessage").append(gameState);
    $("#gameMessage").append(restart);
  };

});