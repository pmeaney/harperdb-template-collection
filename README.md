# HarperDB Template Collection

A Collection of HarperDB Templates

### Main templates

- harperdb-application-template

  - The basic template

- harperdb-application-template-dockerized

  - The basic template, set into a docker-compose project.
  - Give it a shot:
    - `cd harperdb-application-template-dockerized`
    - `docker compose up`
    - Add a dog: (For other examples see the `RequestExamples-curl.md` file.)
    - ```bash
      curl -X POST \
        http://localhost:9926/Dog \
        -H "Content-Type: application/json" \
        -H "Authorization: Basic SERCX0FETUlOOnBhc3N3b3Jk" \
        -d '{
          "name": "Harper",
          "breed": "Labrador",
          "age": 3,
          "tricks": ["sits"]
      }'
      ```

#### Templates of Project Examples

- 1-hdb-tmpl-csv-load-and-query
  - A template using HarperDB's Operations API and REST API to create, load, and query a data table from a local CSV file (Cities & population data).
