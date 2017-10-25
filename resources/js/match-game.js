var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var cardValues = MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues, $('#game'));
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardNumbers = [];
  for (var i = 1; i < 9; i++) {
    cardNumbers.push(i, i);
  };
  var randomOrder = [];
  while (cardNumbers.length > 0) {
    var random = Math.floor(Math.random() * cardNumbers.length);
    var temp = cardNumbers.splice(random, 1)[0];
    randomOrder.push(temp);
  };
  return randomOrder;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColor = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $('#game').empty();
  $('#game').data('flippedCards', []);
  for (i = 0; i < cardValues.length; i++) {
    var $newcard = $('<div class="card col-3"></div>').data('card-value', cardValues[i]).data('flipped', false).data('card-color', cardColor[cardValues[i] - 1]);
    $('#game').append($newcard);
  };
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};
/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  }

  $card.css('background-color', $card.data('card-color')).text($card.data('card-value')).data('flipped', true);

  var flippedCards = $('#game').data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('card-value') === flippedCards[1].data('card-value')) {
      var match = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(match);
      flippedCards[1].css(match);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)').text('').data('flipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)').text('').data('flipped', false);
      }, 350);
    }
    $('#game').data('flippedCards', []);
  }
};
