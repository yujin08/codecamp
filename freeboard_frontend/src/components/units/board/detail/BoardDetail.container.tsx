import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import { DELETE_BOARD, FETCH_BOARD } from "./BoardDetail.queries";
import { FETCH_BOARDS } from "../list/BoardList.queries";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";

export default function BoardDetail(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickMoveToBoardEdit = (): void => {
    if (typeof router.query.boardId !== "string") {
      alert("시스템에 문제가 있습니다.");
      return;
    }

    void router.push(`/boards/${router.query.boardId}/edit`);
  };

  const onClickDelete = (): void => {
    deleteBoard({
      variables: {
        boardId: router.query.boardId,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
    router.push(`/boards/`);
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickDelete={onClickDelete}
    />
  );
}
