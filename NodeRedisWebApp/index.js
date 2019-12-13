const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({     // Note here in the create Client we specify the hose
    host: 'redis-server',                // Notice this is the exact name in the docker compose file
    port: 6379                        // Default redis port
});        
client.set('visits', 0);

app.get('/', (req, res) => {
//   process.exit(0)                    // Only uncomment this to test out the restart policy
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
