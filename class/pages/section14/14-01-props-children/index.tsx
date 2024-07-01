import Example from "../../../src/components/units/14-props-children-example";

export default function PropsChildrenPage(): JSX.Element {
  return (
    <div>
      <div>++++++++++빨간색 파란색 초록색 ++++++++</div>
      {/* 쏙들어가기! 땡겨오기! */}
      <Example school="다람쥐초등학교">
        <div>
          <input type="text" />
          <div>저는 철수입니다</div>
          <button>클릭해주세요!</button>
        </div>
      </Example>
      <div>++++++++++빨간색 파란색 초록색 ++++++++</div>
    </div>
  );
}
