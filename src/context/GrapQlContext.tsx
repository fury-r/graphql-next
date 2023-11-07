import React, { createContext, useContext } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const GraphQlContext = createContext<any>(null);

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});
export const GraphQlContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApolloProvider client={client}>
      <GraphQlContext.Provider value={{}}>{children}</GraphQlContext.Provider>
    </ApolloProvider>
  );
};

export const useGraphQlContext = useContext(GraphQlContext);
