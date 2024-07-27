// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { wrapFromAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
// import { Modal } from "antd";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  // ReactQuill 만든 사람들이 만든 onChange 이므로 event 안들어옴
  const onChangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능!!
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됐으니까 에러검증 같은것들 해달라고 react-hook-form에 알려주는 기능!!
    void trigger("contents");
  };

  //   useEffect(() => {
  //     async function aaa(): Promise<void> {
  //       const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
  //       Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });
  //     }
  //     void aaa();
  //   }, []);

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });

    const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
    Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });

    const boardId = result.data.createBoard._id;
    void router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`);
  };

  return (
    <form onSubmit={wrapFromAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제목: <input type="text" {...register("text")} />
      <br />
      내용: <ReactQuill onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}
