const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const token = process.env.TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
};

const apiURL = 'http://20.244.56.144/train/trains';

async function sortTrains(trains) {
    try {
     
      await trains.sort((a, b) => a.price.sleeper - b.price.sleeper);
  
      await trains.sort((a, b) => {
        const ticketsA = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        const ticketsB = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        return ticketsB - ticketsA;
      });
  
      
     await trains.sort((a, b) => {
        const departureTimeA = new Date(0, 0, 0, a.departureTime.Hours, a.departureTime.Minutes + a.delayedBy, a.departureTime.Seconds);
        const departureTimeB = new Date(0, 0, 0, b.departureTime.Hours, b.departureTime.Minutes + b.delayedBy, b.departureTime.Seconds);
        return departureTimeB - departureTimeA;
      });
  
     
      console.log(trains);
  
  
      return trains;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

const getOrderedTrain = async(req,res) => {
    try {
        let Trains = await axios.get(apiURL,{headers});

    
        const sortedTrains = await sortTrains(Trains.data);
        console.log('helo-----',sortedTrains);
        return res.status(200).json({
            message: 'successfully fetched trains',
            data: sortedTrains,
            err:{}
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error while fetching',
            data:{},
            err: error
        })
    }
}
module.exports = {
    getOrderedTrain
}