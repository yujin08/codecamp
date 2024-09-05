import { getDate } from "../../../../commons/libraries/utils";
import BoardCommentWrite from "../write/BoardCommentWrite.container";
import * as S from "./BoardCommentList.styles";
import type { IBoardCommentListUIProps } from "./BoardCommentList.types";

export default function BoardCommentListUI(
  props: IBoardCommentListUIProps
): JSX.Element {
  return (
    <div>
      {props.data?.fetchBoardComments.map((el: any) => (
        <S.ItemWrapper key={el._id}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{el.writer}</S.Writer>
              </S.WriterWrapper>
              <S.Contents>{el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" 
              onClick={props.onClickUpdate}
              />
              <S.DeleteIcon
                id={el._id}
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={props.onClickDelete}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      ))}
      {isEdit && <BoardCommentWrite isEdit = {true} setIsEdit={setIsEdit} el={props.el}}
    </div>
  );
}
