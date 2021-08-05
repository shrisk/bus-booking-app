const Bus = require('../../models/bus');

module.exports = function(router) {

    router.post('/bus', function(req, res){
        let bus = new Bus(req.body)
        bus.save(function(err, bus){
            if(err){
                return res.json({success:false, bus:{}, err:err});
            }        
            res.json({success:true, bus:bus});
        })
    })

    router.get('/getbus', function (req, res) {
        Bus.find({}, (err, bus) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err}); //Return error message
            } else {
                // Check if bus details found in database
                
                    res.json({ success: true, bus: bus}); //Return success and bus array
                }
              })



    
            })
        
     router.patch('/updateseats', (req, res) => {
        // Check if id was provided
        if (!req.body._id) {
          res.json({ success: false, message: 'No ID' }); // Return error message
        } else {
          // Check if id exists in database
          Bus.findOne({ _id: req.body._id }, (err, bus) => {
            // Check if id is a valid ID
            if (err) {
              res.json({ success: false, message: 'Not a valid id' }); // Return error message
            
} else {
                bus.reservedSeats = bus.reservedSeats.concat(req.body.bookedSeats); 
                bus.availableSeats = bus.totalSeats - bus.reservedSeats.length;   
                bus.save((err) => {
                    if (err) {                    
                        res.json({ success: false, message: err }); // Return error message                    
                    } else {
                        res.json({ success: true, message: 'Seats Reserved!' }); // Return success
                    }
                });   }});        }    })
            }