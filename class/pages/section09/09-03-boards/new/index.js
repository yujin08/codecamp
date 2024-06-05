import BoardWrite from "../../../../src/components/units/board/09-write/BoardWrite.container";

export default function GraphqlMutationPage(props) {
  // 한 줄일때는 괄호() 필요 없음
  return (
    <div>
      <div>###########여기는 페이지입니다 ######</div>
      <BoardWrite isEdit={false} />
      <div>###########여기는 페이지입니다 ######</div>
    </div>
  );
}
