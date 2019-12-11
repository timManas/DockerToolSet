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





