import { fnExampleCJS } from "../libExamples/cjsexample.cjs";
import {
  fnExampleES,
  catFactAPIExampleRequest,
} from "../libExamples/esexample.js";

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
    url: "/getAnotherRoute",
    method: "GET",
    handler: async (request, reply) => {
      fnExampleCJS();
      fnExampleES();
      await catFactAPIExampleRequest();
      return reply.send(
        "hello from /getAnotherRoute. Check the terminal for example console log statements from functions we have imported."
      );
    },
  });
};
export default routesIndex;
