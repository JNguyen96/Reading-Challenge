# Reading-Challenge

Justin Nguyen and Joseph Kompella

A2FSB Winter Reading Challenge

Software Download:
  MacOS
  - Node.js - https://nodejs.org/dist/v8.9.3/node-v8.9.3.pkg
  - MongoDB - https://www.mongodb.com/dr/fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.6.1.tgz/download
  
  Windows
  - Node.js - https://nodejs.org/dist/v8.9.3/node-v8.9.3-x86.msi
  - MongoDB - https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.1-signed.msi/download

Set Up Database:
  - Navigate to project directory, Run 'mkdir data'
  - In new terminal, Navigate to where mongo is downloaded
  - Run './mongod --dbpath FILEPATH/Reading-Challenge/data'
  - In new terminal, Navigate to same directory, Run './mongo'
  - In Command interface, Run 'use Reading-Challenge'
  
Start Server:
  - Navigate to project directory
  - Run 'npm install'
  - Run 'npm install -g express-generator'
  - Run 'npm start'
  - Open localhost:3000 in browser
