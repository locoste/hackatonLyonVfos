# vfOS-Hackathon
vfOS-Hackathon Archetype

# Local launch
archetypeHackathonLyonVfos\app1\hello> npm run start

# Docker 

## Build a container using this command line 
archetypeHackathonLyonVfos\app1\hello> docker build --tag=app1 .

## Launch the created container with a specific port number
archetypeHackathonLyonVfos\app1\hello> docker run -p 4201:4201 app1
