import { useMutation } from "@apollo/client";
import { useState } from "react";
import { 나의그래프큐엘셋팅 } from "./BoardWrite.queries"; // export는 골라서 가져오기 가능
import BoardWriteUI from "./BoardWrite.presenter"; // export default로 한개만 가져오기
// import Adkfjskldf from "./BoardWrite.presenter"; // export default로 이름 바꿔서 가져오기
// import Adkfjskldf, { apple } from "./BoardWrite.presenter"; // export default와 export 함께 가져오기

// import * as S from "./BoardWrite.presenter" // export 한방에 다 가져오기
// S.BlueButton // export 한방에 다 가져오기
// S.RedInput // export 한방에 다 가져오기

export default function BoardWrite() {
  const [isActive, setIsActive] = useState(false);

  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);

    if (event.target.value && title && contents) {
      setIsActive(true);
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);

    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);

    if (writer && title && event.target.value) {
      setIsActive(true);
    }
  };
  return (
    <div>
      <div>$$$$$$$$$$$$$$ 여기는 컨테이너입니다 $$$$$$$$$$$$</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        isActive={isActive}
      />
      <div>$$$$$$$$$$$$$$ 여기는 컨테이너입니다 $$$$$$$$$$$$</div>
    </div>
  );
}
