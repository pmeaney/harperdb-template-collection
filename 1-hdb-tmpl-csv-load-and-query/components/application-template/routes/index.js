import { main } from "../routesLibrary/esexample.js";

const routesIndex = async (server, { hdbCore, logger }) => {
  server.route({
    url: "/getAll",
    method: "GET",
    handler: async (request) => {
      request.body = {
        operation: "sql",
        sql: "SELECT * FROM data.Dog",
      };
      return hdbCore.requestWithoutAuthentication(request);
    },
  });

  server.route({
    url: "/check_citiesPopList",
    method: "GET",
    handler: async (request) => {
      request.body = {
        operation: "sql",
        sql: "SELECT * FROM data.citiesPopList ORDER BY Population DESC LIMIT 10",
      };
      return hdbCore.requestWithoutAuthentication(request);
    },
  });

  server.route({
    url: "/runMain",
    method: "GET",
    handler: async (request, reply) => {
      await main(reply);
    },
  });
};
export default routesIndex;
