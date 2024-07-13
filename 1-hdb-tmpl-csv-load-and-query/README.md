# Dockerized HarperDB Template

This is a dockerized template of the the official HarperDB [application-template](https://github.com/HarperDB/application-template).

### Start it up 🚀

- Clone the repo: `git clone git@github.com:pmeaney/harperdb-dockerized-template-app.git`
- Run the project with docker-compose: `docker compose up`
- Test out some example endpoints.

  - Try some of the request examples shown in the `RequestExamples.http` file. (Note: The file uses [the VS Code "REST Client" Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). It's basically a simplified, file-based http request tool with functionality similar to Postman, for testing endpoints.)
  - Or, if you prefer to use `curl` in your CLI, check out the `RequestExamples-curl.md` for curl examples.

### Loading CSV Files locally via Operations API

- In this example, we will load data from a CSV file into HarperDB.
  - We'll need to add a data volume to share with our harperdb docker container: `- ./data-for-hdb:/home/harperdb/hdb/data-for-hdb` in docker-compose.yml
  - We'll download a csv file into a new directory we create called `data-for-hdb`. The example csv file in this case is a list of the top 1000 US cities by population, from a repo by Plotly, at: https://raw.githubusercontent.com/plotly/datasets/master/us-cities-top-1k.csv
- We then create some http requests to our HarperDB Application.
- We also set up a query to take a look at some sample data to make sure our table looks as we expect it to.
  - **Note**:
    - table primary keys are created automatically (as is common with table migration tools)
    - keys are created as unique ids, rather than a series of numbers (e.g. 1, 2, 3)

```bash
###
# Create citiesPopList table so we can load data into it.
curl -X POST "http://localhost:9925/" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk" \
     -d '{
           "operation": "create_table",
           "table": "citiesPopList",
           "primary_key": "id"
         }'

###
# Import Cities & Population csv file via Operations API
# Data source: https://raw.githubusercontent.com/plotly/datasets/master/us-cities-top-1k.csv
curl -X POST "http://localhost:9925/" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk" \
     -d '{
           "operation": "csv_file_load",
           "action": "insert",
           "database": "data",
           "table": "citiesPopList",
           "file_path": "/home/harperdb/hdb/data-for-hdb/us-cities-top-1k.csv"
         }'

###
# Check our table
# SELECT * FROM data.citiesPopList LIMIT 10
curl -X GET "http://localhost:9926/application-template/check_citiesPopList" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk"
```

Yep! The new table exists now!

```json
[
  {
    "id": "823febfe-6c79-4114-bb80-75e6552b08e6",
    "City": "New York",
    "Population": 8405837,
    "State": "New York",
    "__createdtime__": 1720906323102.6558,
    "__updatedtime__": 1720906323102.6558,
    "lat": 40.7127837,
    "lon": -74.00594129999999
  },
  {...}
  {...etc}
]
```

### Making Http requests to HarperDB Endpoints

#### Include a Basic authorization header

- To make requests to HarperDB endpoints, you will need to use a an "Authorization: Basic" header, with your base64 encoded username:password (using the username & password you set in the environment section of the docker-compose file). In our case, that would be:
  - `Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk`
  - Which represents: `Authorization: Basic <base64 encoded username:password>`
  - For more info on base64 encoding check out this [MDN Example](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa#examples).

#### Routes are available at "app-name/routeEndpoint"

- As you can see in the `application-template/config.yaml` file, on line 13, endpoints are "relative to the app-name, like `http://server/app-name/route-name`".
- The app-name in our case is the directory name: "application-template". And the example GET endpoint shown in routes.js is "getAll". So, our http request would look like this:

```
curl -X GET "http://localhost:9926/application-template/getAll" \
     -H "Content-Type: application/json" \
     -H "Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk"
```

#### An example of CJS & ECMA functions are included

- The directory `application-template/libExamples` contains two example functions, to demonstrate that HarperDB's Fastify REST API is compatible with both CommonJS and ECMA style function module exports and imports.

### Overview of setting up this project:

- Convert the `docker run` command shown at the [HarperDB DockerHub page](https://hub.docker.com/r/harperdb/harperdb) into a docker-compose.yml file
- Clone the HarperDB application-template such that the entire directory of "application-template" sits in the `/home/harperdb/hdb/components` directory via a Docker bind mount (to share the app template directory and its files into the container), which will need to be defined in the docker-compose.yml.
- Add in snippets from the docs and make any small edits as necessary
- Set up some basic http requests which include an auth basic base64 header
- Modify the project from the original `application-template` to change the `./components/application-template/routes/index.js` file such that:
  - The exported function is now called "routesIndex"
  - It contains two example routes
- Add examples of CJS and ECMA style function modules to an example function lib directory ("libExamples")
