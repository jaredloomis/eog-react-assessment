import { createClient } from "urql";

export const gqlClient = createClient({
  url: "https://react.eogresources.com/graphql"
});

export default {};
