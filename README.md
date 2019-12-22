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

56. This is now the recommended way to generate an app with Create React App.

Instead of this:

npm install -g create-react-app

create-react-app client

Just do this:

npx create-react-app client

57. How to create a react app ?
npx create-react-app frontend


57. Node Stuff
nom run start - Starts up a development server. Only for dev uese only
npm run test - Runs tests associated with the project
npm run build - Builds a production version of the application

58. How to set up a production Flow with docker ?
1. Create
Dockerfile.dev -> Only for dev env
Dockerfile -> For production env



59. If multiple docker files include use -f "Specify which docker file"
> docker build -f Dockerfile.dev .    ---- Don't forget the "."

60. Remember running the docker build ... will create a Docker image =) Then from the image you can start a container using docker run 
- However, you will to PORT over your port 3000 
Ex docker run -p 3000:3000 951a83499a04

61. 
How to Execute 
docker run -p 3000:3000 951a83499a04

-p : Stands for port forward

Notes
1. You will need to have Dockerfile in code 
2. You will need to run           
docker build -f Dockerfile.dev .    
3. You will need to run using 
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app 

How to allow for dynamic loading when code changes instead of having to rebuild container
- You will need to use docker volumes 


62. What is a docker volume ?
- It is  reference to a folder outside a container
- Similar to mapping where to map ports to outside container
- Volumes a have a reference to folders outside containers

63. docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app

64. The -v without the ":" is a bookmark on the node_modules folder which will NOT try to map into anything else 

65. You can use docker compose to minimize the command when using docker volume ("-v")

66. Docker compose can do the build and the run of the file when you execute
> docker-compose up 


67. How to execute the tests in docker file ?
docker run -it 10123c900599 npm run test

68. docker attach - Attaches the stdin, stdout and stereo of the container 

69. Why do we need to use Nginx ?
Tradiationally
Client -> Container (WebServer -> Index.Html + main.js)

However, when running npm run build:
The WebServer is not gone, hence we need to replace the Webserver with something else 

Enter....NGINX

Now
Client -> Container(NGINX -> index.Html + main.js)

70. You can run multi step build process 
Build Phase
1. use node:alpine
2. Copy package.json file
3. Install dependencies
4. Run nom run build

Run Phase
1. Use nginx
2. Copy over results of npm run build
3. Start nginx


72. How to execute Production Build on Docker
docker build .   # Notice how we don't have the -f flag since the production grade itself is just Dockerfile instead of Dockerfile.dev
> docker build .
> docker run -p 8080:80 40b774e6452e


73. Instructions for Prod Flow for Travis
1. Tell travis we need a copy of docker running
2. Build our image using Dockerfile.dev
3. Tell travis how to run our test suite
4. Tell travis how to deploy our code to AWS


133.  What is Kubernetes ? 
- System for running many different containers over multiple different machines (NOT just one machine)

134. Why use Kubernetes ? 
- When you need to run many different containers with different images

135. Theres a big distinction between using Kubernetes in Dev vs Prod Env
- Dev env > We use a program called "minikube"
- Prod Env > We use Amazon Elastic Container services for Kubernetes (EKS)
           > Google Cloud Kubernetes Engine

136. What is a MiniKube ? 
- Used for managing the VM Itself
- Local Env Only
-  Will create a Kubernetes Cluster on local machine 
	-> It will create a VM which will run a # containers

137. What is KubeCtl ? 
- Used for managing containers in a node 
- Prod and Dev Env compatible

138. How to install Kubernetes into local machine ?
1. Install KubeCtl - CLI  for interacting with our master
2. Install a VM driver virtual box - Used to make a VM that will be single node
3. Install miniKube - Runs a single Node on VM


How to install Kubernetes ?
- Make sure brew is installed
> Download brew @ brew.sh

> brew install kubectl
> Download Virtualbox @ virtualbox.org
> break install minikube
> minikube start 

139. How to start Minikube ?
> minikube start

140. Docker Compose 	vs Kubernetes
DC- Each entry can optionally get docker compose to build an image
K - Expects all images to already be built

DC - Each Entry represents a container we want to create
K - One config file per object we want to create

DC - Each entry defines the networking requirements (ports)
K - We have to manually set up all networking

141. How to get the simple container running on local kubernetes cluster running ?
1. Make sure image is hosted on docker hub
2. Make one config file to create the container
3. Make one config file to set up networking	

142. What is a object in Kubernetes ?
- Config files is used to create 'objects'
- Objects serve different purposes
ex. Running a container, monitoring a container, setting up networking, etc

143. Examples of Object Types ?
- StatefulSet
- ReplicateContainer
- Pod
- Service

74. Why do we need to make a Pod ? 
- To group containers with very similar purpose 
- Must be deployed together and run together
- Tightly coupled

75. In kubernetes - you cannot create single containers by themselves. You would need to create pods which is a collection of containers 
- Want a container ? Create a pod first

76. Why do we need to make a service ? 
- Sets up networking in Kubernetes Cluster

77. What are different types of Services ?
1. ClusterIP
2. NodePort	-> Exposes a contiainer to the outside world (only for Dev purposes)
3. LoadBalancer
4. Ingress 


78. Flow when a request comes in 
1. User sends request > Kube Proxy > Service NodePort -> Pod[port:3000 -> Multi-Client container]

79. How to feed a config file too KubeCtl ?
> kubectl apply -f <filename>

80. How to print the status of all running pods 
> kubectl get pods


81. How to print the status of all running services 
> kubectl get services

82. How to get Minikube ip address ?
- minikube ip

83. NOTE !!! YOU WILL NOT BE ABLE TO USER LOCAL HOST FOR KUBERNETES
- YOU WILL NEED TO USE THE MINIKUBE ADDRESS : NodePort


85. Takeaways from Kubernetes
- KBN is a system to deploy containerized apps
- Nodes are inidivual machines (VMS) that run containers
- Masters are machines (or Vm's) with a set if programs to manage nodes
- KBN didn't build our images - it got them from somewhere else
- KBN MASTER decided where to run each container - each node can run a similar set of containers 
- To deploy something, we update the desired state of the master with a config file
- Master works constantly to meet  your desired state

86. Imperative Deployment
- Do exactly these steps to arrive at this container setup

87. Declarative 
- This is what i want the container to look like

88. Declarative is the standard =) but Kubernetes can do both

89. How to get detailed info about an object inside a cluster ? 
> kubectl describe <object type> <object name>

90. What is a deployment object in Kibernetes ? 
- Maintains a set of identical pods
- Ensures they have correct config and the right # exists
-  Similar in nature to a pod 

91. We can run either Pods or deployment in Kubernetes to execute containers

92. Pods vs Deployment
Pods
- Runs a single set of containers
- Good for one-off dev purposes
- Rarely used directly in production

Deployment
- Runs a set of identical pods
- Monitors the state of each pod, updating as necessary
- Good for dev
- Good for production 

93. How to remove a Kubernetes object ? 
> kubectl delete -f <config file >

94. Pulling a new version of an image is a PIA when triggering updates
Solutions:
1. Manually delete pods to get the deployment to recreate them with latest version  (Deleting pods manually is silly)
2. Tag built images with real version # and specify that version in the config file (Adds an extra step in production deployment process)


95. How to configure the VM to use your docker server ? 
eval $(minikube docker-env)
*** This only configured your current terminal window
*** Temporary solutions only

96. Why mess with Docker in the node ? 
- Uses all the same debugging techniques we learned with Docker CLI
- Manually kills containers to test kubernetes ability to self-help
- Delete cached images in the node

