# DockerToolSet


utput you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

7. How does Docker run on my computer ? 
When you install  docker, you technically installed a linux virtual machine on your computer
- Inside VM, is where all the containers are executed

8. docker ps --all : shows all process that has been created previously

9 docker run image = "docker create image"  + "docker start image"

10. When we create the container - we take the snapshot from the image and prep it up for start

11. Creating the container is setting up file system and starting it is executing the file system

12. docker start -a imageId : the -a watches any output when started 

13. Once a container stops does NOT mean it is dead. we can still restart it again. Running docker ps will show it is just exited 

14. To delete all stopped containers
- docker system prune
** You will need to re-download all containers again

15. How to get container logs ?
docker logs <container id>

16. How to stop a container ? 
- docker stop <container id> : System shuts itself down and do a clean up. Soft stop
or
- docker kill <container id> : Kills the process completely. Stop RIGHT NOW
** ideally: use docker stop

17. How to execute additional commands in container 
- docker exec -it <containerid> <command>
** Use this to access the CLI 
- The "-it" flag is actually -i -t
-i : Attach StdIn
-t : Attach StdOut

18. When everything is being run on Docker, they actually inside a VM.

19. How to open a shell inside a container 
- docker ps 
- get container id
- docker exec -it containerid sh

20. Containers DO NOT interact with other components unless instructed to do so. They are completely isolated to each other


21. How to create our own Docker image ? 
What you will need ?
1. DockerFile: Configutation to define how our container should  behave
2. Run command on Docker Client
3. Docker Server executes command and takes docker file and executes them
4. Image is Run

22. Creating a Docker File
1. Specify a base image
2. Run some commands to install additional programs
3. Specify a command to run on container setup

23. Created a docker image. Take a look at the redid-image folder:
FROM: Specify the docker image we want to use as a base
RUN: Execute some command while we are preparing our image 
CMD: Specify what command should be used to start up a brand new container
** Note there are ALOT OF them


24. Note: 
Writing a docker file == Being given a computer with no OS and told to install Chrome

25. Why did we use alpine as a base image ? 
-> They come with preinstalled set of program that are useful to me =)

26. Why do we use docker build . ? 
> Allows us give our docker file to the docker CLI

27. Note ...You will STEPS 1/3, 2/3, 3/3
> These are the commands outputs from our DockerFile !!!!! 

28. When running these instructions, it will create temporary containers for building and downloading
> With every instructions we take image and create a new container out of it  and take a snapshot as a new image

29. How to add a Tag to an image ? 
> dickerId / ProjectName : version
ex. -t timmanas/redis:latest 
docker build -t timmanas/redis:latest .

30. How to execute a tagged docker image ?
docker run timmanas/redis
** if you don't put ":latest" - it will use latest image

31. You use images to create containers 
However we can also create a container which creates an image =) 

32.  Reminder this is the format we are following:
Template
- Specify a base image
- Run some commands to install additional program
- Specify a command to run on container start up

Redis
- FROM alpine
- Run apk add --update redis
- CMD ["redis-server"]

Node
- FROM alpine
- RUN npm install
- CMD ["npm", "start"]


33. Reminder that how to build the docker file is
docker build .

34. why do we see "nom: not found" ?? when running docker file ?
- Because alpine is a very vanilla image
- You need to do some additional fixes
	1. You could find a new base image which has node already installed in it
	2. You could use the base alpine image and install node on top of it 

35. Alpine is a term in the docker works which is as small and compact as possible 


36. Getting this error:
Sending build context to Docker daemon  4.096kB
Step 1/3 : FROM node:alpine
 ---> 5f8b3338a759
Step 2/3 : RUN npm install
 ---> Running in 0d6975c09ffa
npm WARN saveError ENOENT: no such file or directory, open '/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/package.json'
npm WARN !invalid#2 No description
npm WARN !invalid#2 No repository field.
npm WARN !invalid#2 No README data
npm WARN !invalid#2 No license field.

up to date in 0.58s
found 0 vulnerabilities

Removing intermediate container 0d6975c09ffa
 ---> a7b0d7e5fb84
Step 3/3 : CMD ["npm", "start"]
 ---> Running in ac6ac5232f3b
Removing intermediate container ac6ac5232f3b
 ---> 8e4f9c2b93c4
Successfully built 8e4f9c2b93c4


This is because the package.json is not part of the segmented hard drive on the container. None of the files in the folder "SimpleWeb" are not part of the container initialization. You can specify this issue though
- Add this line to resolve issue.
cp <Path to folder to copy from> <Place to  copy stuff to inside>

ex. COPY ./ ./
Hence the instructions should now be 
# Specify a base image
# FROM alpine
FROM node:alpine

# Install some dependencies
COPY ./ ./
RUN npm install

# Default command
CMD ["npm", "start"]

37. How to execute the NodeDocker File ?
docker build -t timmanas/simpleweb . 
docker run timmanas/simpleweb

38. You might to do some Port mapping even if you start up Node + Docker 
Why ? Because Port 8080 is located INSIDE the container. You will need to access it. Hence you will need to do some port mapping
** this only needs to happen for incoming requests but outside an be request an be made automatically by docker containers


39. Port forwarding is a run time constraint 
Syntax is:
docker run -p 8080:8080 <imageId>
ex docker build -t timmanas/simpleweb . 

40. How to access the container 'Node Docker(SimpleWeb)'
docker run -it timmanas/simpleweb sh

41. You don't want to overtire some files on the container when copying
Use this command
WORKDIR /usr/app

42. How to run a shell while a container is running ?
- docker ps  ... to get the docker container id
- docker exec -it containerid sh

43. In order to get dynamic rebuilding (Why ? Because we want changes to automatically update on the GUI)

44. Two containers do NOT have automatic communication between each other. Both are isolated
- We need to set up some network infrastructure

45. Two options for 2 containers to communicate with each other
1. Use Docker CLI's networking features
2. Use Docker Compose

46. Don't use the first option ...Use docker compose instead

47. What is docker compose ? 
- It is a separate CLI that's gets installed along with Docker
- Used to start up multiple Docker containers
- Automates some of the long-winded arguments that were passing to 'docker run'

48. Docker composes uses YAML files 
Ex. docker commands -> Docker-compose.yml -> Docker compose cli 

49. Docker compose file example

version: '3'
services: 
    redis-server:
        image: 'redis'
    node-app:
        build: .
        ports:
            - "4001:8081"



'services' are like container
"build: . " - Refers to build current Docker file
"image: 'redis'" - Refer to building redis from docker hub


50. Docker compose comparison to docker lingo
docker 			docker-compose
docker run myImage	docker-compose up 

docker build .		docker-compose up --build 
docker run myImage

51. How to Launch in background
docker-compose up -d

52. How to stop docker-compose containers
docker-compose down

53. If one of our components crash inside a container
- You will need to set up code as per the docker restart policies as follows:
"no" - Never attempt to restart this . container if it stops or crashes (Default behaviour)
always - If the container stops for any reason always attempt to restart it 
on-failure - Only restart if the container stops with an error code
unless-stopped - Always restart unless we forcibly stop it

54. Clean up your docker shit
docker rmi $(docker images -q)
docker system prune
docker volume rm $(docker volume ls -f dangling=true -q)
docker system df

55. To get the ps of docker compose...use
docker-compose ps
** Needs to be run in a docker compose directory with a YAML file
