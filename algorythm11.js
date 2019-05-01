function start2(map){
var cell_value = 0;

var i = 0;
	move_Oleg = {
		k: 0,	
		z: 0,
		x: 0,
		y: 0,
		xstart: 0,
		ystart: 0,
		search: function(){
			while (this.z != 1){		
					this.k = 0;
				        var cells = [map[this.x + 1], map[this.x - 1], map[this.x][this.y + 1],  map[this.x][this.y - 1]];
				        if(cells.includes(undefined) && (this.x != this.xstart || this.y != this.ystart)) {
				        	map[this.x][this.y] = 2;
				        	break;				        	
				        }		        	
			 	    l:
				    for(cell_value = 0; cell_value < 3; cell_value+=2){					    					    	
						if (this.y > 0 && map[this.x][this.y - 1] == cell_value){
							this.y = this.y - 1;
							this.k = 1;			
						}					    	
						else if (this.x < amount-1 && map[this.x + 1][this.y] == cell_value){
							this.x = this.x + 1;
							this.k = 1;
						}				    									    	
				    	else if (this.y < amount-1 && map[this.x][this.y + 1] == cell_value){
							this.y = this.y + 1;
							this.k = 1;		
						}
						else if (this.x > 0 && map[this.x - 1][this.y] == cell_value){
							this.x = this.x - 1;
							this.k = 1;		
						}						
						if (this.k == 1 && cell_value == 0){
							map[this.x][this.y] = 2;	
							break l;
						}
						if (this.k == 0){
							map[this.x][this.y] = 3;		
						}
					}
			}			
		},
		findEnter: function(){
		        m:
		        for (var x = 0; x < amount; x+=amount-1){
		            for (var y = 0; y < amount; y++){
		                if(map[x][y] == 0){
		                        this.x = x;
		                        this.y = y;
		                        break m;
		                }           
		                if(map[y][x] == 0){
		                        this.x = y;
		                        this.y = x;
		                        break m;                    
		                }           
		            }
		        }
		this.xstart = this.x;
		this.ystart = this.y;
		map[this.x][this.y] = 2;
		}		
	}
move_Oleg.findEnter();
move_Oleg.search();
return map;
}
