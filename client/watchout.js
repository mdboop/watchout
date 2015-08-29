var gameOptions = {
  width: 600,
  height: 600,
  numEnemies: 20
};

var gameStats = {
  high: 0,
  current: 0,
  collisions: 0
};

var d3gameBoard = 
  d3.select('body')
  .append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)

var axes = {
  x : d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y : d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};

//Enemy functions and behavior

var Enemy = function(id) {
  this.id = id;
  this.x = Math.random() * 100;
  this.y = Math.random() * 100;
};

var enemyUpdate = function(data) {
  
  //DATA JOIN
  var d3enemies = d3gameBoard.selectAll('.enemies').data(data, function(d) { return d.id });

  //UPDATE
  d3enemies
  .transition()
  .duration(1500)
  .attr('cx', function(d) { return axes.x(d.x); })
  .attr('cy', function(d) { return axes.y(d.y); })

 
  //ENTER
  d3enemies
  .enter()
  .append('circle')
  .attr('class', 'enemies')
  .attr('cx', function(d) { return axes.x(d.x); })
  .attr('cy', function(d) { return axes.y(d.y); })
  .attr('r', 10)
  .attr('fill', 'red')

  //EXIT
  d3enemies.exit().remove();
};

var moveEnemies = function() {
  var newEnemies = [];

  for (var i = 0; i < gameOptions.numEnemies; i++) {
    newEnemies.push(new Enemy(i));
  }
  enemyUpdate(newEnemies);
};

//Player functions and behavior

var Player = function(id) {
  this.id = id;
  this.x = 50;
  this.y = 50;
};

var drag = d3.behavior.drag()
  .on('drag', function() { 
    d3Player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y); 
  });


var players = [];
players.push(new Player(1));

var d3Player = d3gameBoard.selectAll('.player')
  .data(players, function(d) { return d.id; })
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10)
  .style('fill', 'blue')
  .call(drag)


setInterval(moveEnemies, 2000);


