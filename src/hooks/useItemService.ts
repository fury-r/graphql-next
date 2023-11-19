import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { generateAQuote, quotesQueryName } from "@src/graphql/queries";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import awsExports from "@src/aws-exports";
interface UpdateQouteData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

interface IUseItemService {
  numberOfQuotes: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  updateQuoteInfo: () => Promise<void>;
  fetchQuote: () => Promise<string | undefined>;
}
interface GeneratedQuoteData {
  generateAQuote: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
}
Amplify.configure(awsExports, {
  ssr: true,
});
const client = generateClient();
const isGraphQLResultForQuotesQuery = (
  response: any
): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQouteData];
  };
}> => {
  return response.data && response?.data?.quotesQueryName.items;
};
export const useItemService = (): IUseItemService => {
  const [numberOfQuotes, setNumberOfQuotes] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const updateQuoteInfo = useCallback(async () => {
    try {
      const response = await client.graphql<UpdateQouteData>({
        query: quotesQueryName,
        authMode: "iam",
        variables: {
          queryName: "LIVE",
        },
      });

      if (isGraphQLResultForQuotesQuery(response)) {
        setNumberOfQuotes(
          response?.data?.quotesQueryName.items[0]?.quotesGenerated
        );
      } else {
        throw new Error("Invalid Type");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const runFunction = "runFunction";
      const runFunctionStringified = JSON.stringify(runFunction);
      const response = await client.graphql<GeneratedQuoteData>({
        query: generateAQuote,
        authMode: "iam",
        variables: {
          input: runFunctionStringified,
        },
      });
      const responseStringified = JSON.stringify(response);
      const responseReStringified = JSON.stringify(responseStringified);
      const bodyIndex = responseReStringified.indexOf("body=") + 5;
      const body = responseReStringified.substring(bodyIndex);
      setLoading(false);
      return body.split(",")[0];
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);
  return {
    numberOfQuotes,
    updateQuoteInfo,
    fetchQuote,
    loading,
    setLoading,
  };
};
