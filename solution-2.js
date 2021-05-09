{
    init: function(elevators, floors) {

        const elevator = elevators[0]
        
        
        elevator.on("stopped_at_floor", function(floorNum) {
          if(elevator.currentFloor() === 0) {
            elevator.destinationQueue.sort((a,b)=>a-b)
          }
            
          else if(elevator.currentFloor() === 4) {
            elevator.destinationQueue.sort((a,b)=>b-a)
          }            
        }) 
        

        floors.forEach(function(floor){ 
            floor.on("up_button_pressed", function(){               
                if (elevator.destinationQueue.includes(floor.floorNum())){
                  //do nothing
                }
                
                else if (elevator.destinationDirection()==='up' || elevator.destinationDirection()==='stopped'){                    
                    if (floor.floorNum()>elevator.currentFloor() 
                        && elevator.loadFactor()< 1 
                        && floor.floorNum()<elevator.destinationQueue[0]){                                
                            elevator.destinationQueue.unshift(floor.floorNum())
                        }
                    
                    else {elevator.goToFloor(floor.floorNum())}
                    }  
                
                else {elevator.goToFloor(floor.floorNum())}
            })

            floor.on("down_button_pressed", function(){
                if (elevator.destinationQueue.includes(floor.floorNum())){
                  //do nothing
                }
                
                else if (elevator.destinationDirection()==='down' || elevator.destinationDirection()==='stopped'){
                    if (floor.floorNum()<elevator.currentFloor() 
                        && elevator.loadFactor()< 1 
                        && floor.floorNum()>elevator.destinationQueue[0]){                                
                        elevator.destinationQueue.unshift(floor.floorNum())
                        }
                    
                    else {elevator.goToFloor(floor.floorNum())}
                    }  
                else {elevator.goToFloor(floor.floorNum())}
            })            
        });

        elevator.on("floor_button_pressed", function(floorNum) { 
            elevator.destinationQueue.push(floorNum)
        });
      
        elevator.on("stopped_at_floor", function(floorNum) {
          if(elevator.currentFloor() === 0) {
            elevator.destinationQueue.sort((a,b)=>a-b)
          }
            
          else if(elevator.currentFloor() === 4) {
            elevator.destinationQueue.sort((a,b)=>b-a)
          }            
        }) 
      
      
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
