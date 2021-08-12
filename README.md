# bus-booking-app

# To Start Angular Application

    navigate to angapp folder
    npm install
    ng serve

# To Start Backend

    navigate to server folder
    npm install
    npm start run
    
# To Add bus using POSTMAN

Request: POST
URL: http://localhost:8081/api/bus
Body:   
        {
          "busType": "Asia Line",
          "departure": "11:00PM",
          "arrival": "10:00PM",
          "date": "30/06/2021",
          "availableSeats": "30",
          "fare": "600"
        }
