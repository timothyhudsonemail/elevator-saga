{
    init: function(elevators, floors) {

        const elevator = elevators[0]
        
        
        floors.forEach(function(floor){ 
            floor.on("up_button_pressed", function(){      
              
              //if the button was pressed on a floor that is already in the destination queue, do nothing
                if (elevator.destinationQueue.includes(floor.floorNum())){
                  //do nothing
                }
              
              //then, if the elevator is going up or is stopped, and the button was pressed on a floor that makes sense to stop at to pick up passengers, make it the next stop
                else if (elevator.destinationDirection()==='up' || elevator.destinationDirection()==='stopped'){                    
                    if (floor.floorNum()>elevator.currentFloor() 
                        && elevator.loadFactor()< 1 
                        && floor.floorNum()<elevator.destinationQueue[0]){                                
                            elevator.destinationQueue.unshift(floor.floorNum())
                        }
               //in all other cases, add the floor to the end of the destination queue     
                    else {elevator.goToFloor(floor.floorNum())}
                    }  
                
                else {elevator.goToFloor(floor.floorNum())}
            })

            floor.on("down_button_pressed", function(){
              
              //this is the same logic as the on up button pressed, but modified to account for when a down button is pressed
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

      
      //add floor buttons pressed in elevator to destination queue
        elevator.on("floor_button_pressed", function(floorNum) { 
            elevator.destinationQueue.push(floorNum)
        });
      
      //to increase efficiency, rearrange destination queue whenever the elevator is at top or bottom floor (ascending from bottom, descending from top)
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
