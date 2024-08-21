import React, { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";

interface IUseMe {
  me: {
    id: string;
    username: string;
    avatar: string;
  };
}

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

export default function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<IUseMe>(ME_QUERY, {
    skip: !hasToken, // 사용자가 LocalStorage를 통해 로그인한 경우에만 실행
  });

  useEffect(() => {
    if (data?.me.id === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
