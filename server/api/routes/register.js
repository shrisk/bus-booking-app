const register = require('../../models/register');

module.exports = function(router) {


    router.post('/register', function(req, res){
        let note = new register(req.body)
        note.save(function(err, note){
            if(err){
                return res.status(400).json(err)
            }        
            res.status(200).json(note)
        })
    })



    router.get('/register', function (req, res) {
        register.find({}, (err, register) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err}); //Return error message
            } else {
                // Check if register found in database
                if(!register){
                    res.json({ success: false, message: 'No register found'}); //Return error of register found
                } else {
                    res.json({ success: true, register: register}); //Return success and register array
                }
            }
        })
    })
}
    
    //UPDATE - PUT
    /*router.put('/updateRegister', (req, res) => {
        // Check if id was provided
        if (!req.body._id) {
          res.json({ success: false, message: 'No standup id provided' }); // Return error message
        } else {
            // Check if id exists in database
          Register.findOne({ _id: req.body._id }, (err, register) => {
            // Check if id is a valid ID
            if (err) {
              res.json({ success: false, message: 'Not a valid register id' }); // Return error message
            } else {
                register.teamMember = req.body.teamMember;
                register.project = req.body.project;
                register.workYesterday = req.body.workYesterday;
                register.workToday = req.body.workToday;
                register.impediment = req.body.impediment;
                register.createdOn = req.body.createdOn;
                register.save((err) => {
                    if (err) {                    
                        res.json({ success: false, message: err }); // Return error message                    
                    } else {
                        res.json({ success: true, message: 'register Updated!' }); // Return success message

                    }
                });            }});        }    });

    // Delete

    router.delete('/deleteRegister/:id', (req, res) => {
        // Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' }); // Return error message
        } else {
            // Check if id is found in database
            Register.findOne({ _id: req.params.id }, (err, standup) => {
            // Check if error was found
            if (err) {

                res.json({ success: false, message: 'Invalid id' }); // Return error message
            } else {              
                // Remove the standup from database
                register.remove((err) => {
                if (err) {
                res.json({ success: false, message: err }); // Return error message
                } else {
                res.json({ success: true, message: 'Register deleted!' }); // Return success message
            }
        });
        }
        });
    }
    });

}*/