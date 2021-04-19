# Exercice Backend Accelerator App

## Assessment

Develop a Node.Js api that allows a client app to :
- Obtain the full directory listing of a given directory path on the local filesystem.
- Include the full path, file size and attribute information in the result.
- Cater for a large directory size ( at least 100 000).
- Make sure the application is containerized and can run on any system.

You can use REST or Graphql. We are a Graphql company, but if you don’t know it yet then I would suggest you use what you know best.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
- nodejs 
- docker >20.0

### On a mac

Make sure to allow full disk access to docker.app

## Running the application

1. Generate the filesystem :
```
sh script/generateFilesystem.sh
```

2. Run the API and expose it on port 49160 :

```
docker-compose up
```

3. You can access the API UI on your browser at :
```
localhost:49160/graphql
```

4. Query the API using this test query :
```graphql
{
  files(path: ""){
    path
    size
    attributes {
      lastRead
      lastUpdate
      lastMetadataUpdate
      birthTime
      isFile
      isDirectory
      isSymbolicLink
    }
  }
}

```

## Dependancies
- express
- docker
- apollo-server
- type-graphql
- fs stat

## Learnings

- Docker bind mounts : https://stackoverflow.com/questions/41299514/docker-compose-define-mount-for-bind-mount-and-managed-mount

- File system user access security : https://nodejs.org/en/knowledge/file-system/security/introduction/

- Meaning of stat.birthtime and nodeJS history about it's implementation : https://joshuatz.com/posts/2019/unix-linux-file-creation-stamps-aka-birthtime-and-nodejs/

- usage of docker-compose + typescript + express : https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/docker-compose.yml

- Using git tags : https://www.youtube.com/watch?v=govmXpDGLpo&ab_channel=AutomationStepbyStep-RaghavPal