import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
  type IQuery,
  type IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUiPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: "특정게시글ID" } },
  );

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLike = (): void => {
    void likeBoard({
      variables: {
        boardId: "특정게시글ID",
      },
      // refetchQueries: [{}],
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "특정게시글ID" },
          data: {
            fetchBoard: {
              _id: "특정게시글ID",
              __typename: "Board",
              likeCount: data?.likeBoard, // 좋아요 갯수(6)
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div>현재 카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기!!</button>
    </>
  );
}
