import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  //   const mystyles = {
  //     margin: "10px",
  //   };

  const onClickPage1 = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  //   const onClickPage1 = (event: MouseEvent<HTMLSpanElement>): void => {
  //     void refetch({ page: Number(event.currentTarget.id) });
  //   };

  //   const onClickPage2 = (event: MouseEvent<HTMLSpanElement>): void => {
  //     void refetch({ page: Number(event.currentTarget.id) });
  //   };

  //   const onClickPage3 = (event: MouseEvent<HTMLSpanElement>): void => {
  //     void refetch({ page: Number(event.currentTarget.id) });
  //   };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}

      {[new Array(10).fill(1)].map((_, index) => {
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage1}>
          {index + 1}
        </span>;
      })}

      {/* {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => {
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage1}>
          {index + 1}
        </span>;
      })} */}

      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => {
        <span key={el} id={String(el)} onClick={onClickPage1}>
          {el}
        </span>;
      })} */}

      {/* <span id="1" onClick={onClickPage1}>
        1
      </span>
      <span id="2" onClick={onClickPage2}>
        2
      </span>
      <span id="3" onClick={onClickPage3}>
        3
      </span> */}
    </div>
  );
}
