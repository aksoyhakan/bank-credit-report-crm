For running server=> You have to be in main folder (bank-credit-report-crm). In this folder; you write npm run server in the terminal. In order to reset database, you should write npm run resetdb in the terminal.

For running frontend app=> You have to be in react-server folder (In the main folder; you should write cd react-server). Then; you should write npm start in the terminal (where in react-server folder).

There are two external API which are TypeForm and PipeDrive API. You have to send API request with server-side for TypeForm. For this reason; all API request is sent by URL which have herouku domain in front of localhost. Hence; you have to request temporary access to demo server via https://cors-anywhere.herokuapp.com/corsdemo. Otherwise; you could not get all data came from TypeForm API.

There are two different roles which assist to active or disactive some proporties and modules. In order to see these difference in frontend side; you can use these two users data (first one ID NO:1977 Password:1977 these info belongs to admin and ID No:1997 Password:1987 these info belongs to credit analyst). Passwords are stored in database with hashed version instead of pure string version.
