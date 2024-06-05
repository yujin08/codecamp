import BoardDetailUI from "./BoardDetail.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { DELETE_BOARD, FETCH_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  const onClickDelete = (event) => {
    deleteBoard({
      variables: {
        boardId: router.query.boardId,
      },
    });
    router.push("/boards/");
  };

  return <BoardDetailUI data={data} onClickDelete={onClickDelete} />;
}
