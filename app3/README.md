# vfOS-Hackathon
vfOS-Hackathon Archetype

# Local launch
vfOS-Hackathon\hello> npm run start-pc

# Docker 

## Build a container using this command line 
vfOS-Hackathon\hello> docker build --tag=helloworld .

## Launch the created container with a specific port number
vfOS-Hackathon\hello> docker run -p 4201:4201 helloworld
