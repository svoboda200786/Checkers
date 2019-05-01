  var cell = {
    number: {
      "0": "empty",
      "1": "wall",
      "2": "path",
      "3": "deadlock"
    }
  }
  function getPath(x, y, cell) {
    if(getPath.path) {
      getPath.path.push([x, y, cell])
    } else {
      getPath.path = [];
      getPath.path.push([x, y, cell])
    }
  }
  function start3(map){
    return solveMaze(map, getPath);   
  }
 
  function solveMaze(map, callback) {
    var startPoint = findEnter();
    
    var move = {   
      x: 0,
      y: 0,
      direction: null,
      routes: 0,
      freeCell: 0,
      defaultCell: 0,
      finish: false,
      callback: callback,
      run: function() {
        this.x = startPoint[0];
        this.y = startPoint[1];        
        while(!this.finish) {
          this.search();
          this.checkRoad();
          if(this.callback) this.callback(this.x, this.y, map[this.x][this.y]);
          this[this.direction]();
          this.freeCell = this.defaultCell;
        }
      },
      // removeMarkers: function() {
      //   for(var i = 0; i < map.length; i++) {
      //     for(var j = 0; j < map[i].length; j++) {
      //       if(map[i][j] == 3) {
      //         map[i][j] = 0
      //       }
      //     }
      //   }
      // },
      checkFinish: function() {
        var cells = [map[this.x-1][this.y], map[this.x][this.y+1], map[this.x+1][this.y], map[this.x][this.y-1]];
        if(cells.includes(undefined)) {
          this.finish = true;
          map[this.x][this.y] = 2;
          //this.removeMarkers();
        }
      },
      checkDeadlock: function() {
        this.freeCell = 2;
        this.search();
      },
      checkRoad: function() {
        if(this.routes >= 1) {
          if(this.freeCell == 0) {
            map[this.x][this.y] = 2;
          }
        } else {
          map[this.x][this.y] = 3;
          this.checkFinish();
          this.checkDeadlock();
        }
      },
      search: function() {
        this.routes = 0;         
        if(map[this.x-1][this.y] == this.freeCell) {
          this.direction = "left";
          this.routes++;
        }     
        if(map[this.x][this.y+1] == this.freeCell) {
          this.direction = "down";
          this.routes++;
        }
        if(map[this.x+1][this.y] == this.freeCell) {
          this.direction = "right";
          this.routes++;
        }
        if(map[this.x][this.y-1] == this.freeCell) {
          this.direction = "up";
          this.routes++;
        }
      },
      right: function() {
        this.x++;
      },
      down: function() {
        this.y++;
      },
      up: function() {
        this.y--;
      },
      left: function() {
        this.x--;
      }
    }

    function findEnter() {
      var enter = [];   
      for(var x = 0; x < map.length - 1; x++) {
        for(var y = 0; y < map[y].length -1; y++) {
          if(!map[x][0]) { enter.push(x,0); break}
          if(!map[x][map[x].length-1]) { enter.push(x,map[x].length - 1); break}          
          if(!map[0][y]) { enter.push(0,y); break}
          if(!map[map.length - 1][y]) { enter.push(map.length - 1,y); break}
        }
      }
      console.log(enter);      
      return enter;

    }
    move.run();      
    return map;
}

