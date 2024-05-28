// 내가 만든 boards index 파일

import {
  Wrapper,
  PostWrapper,
  PostText,
  InputWrapper,
  UserWrapper,
  Text,
  UserInput,
  TitleInput,
  ContentInput,
  ZipcodeWrapper,
  Zipcode,
  SearchButton,
  ZipcodeInput,
  ZipcodeInput2,
  YoutubeInput,
  ImgWrapper,
  ImgButtonWrapper,
  ImgButton,
  OptionWrapper,
  RadioButton,
  RadioText,
  ButtonWrapper,
  SubmitButton,
} from "../../styles/boards";

export default function BoardsPage() {
  return (
    <Wrapper>
      <PostWrapper>
        <PostText>게시물 등록</PostText>
      </PostWrapper>
      <UserWrapper>
        <InputWrapper>
          <Text>작성자</Text>
          <UserInput type="text" placeholder="이름을 적어주세요." />
        </InputWrapper>
        <InputWrapper>
          <Text>비밀번호</Text>
          <UserInput type="text" placeholder="비밀번호를 입력해주세요." />
        </InputWrapper>
      </UserWrapper>
      <InputWrapper>
        <Text>제목</Text>
        <TitleInput type="text" placeholder="제목을 작성해주세요." />
      </InputWrapper>
      <InputWrapper>
        <Text>내용</Text>
        <ContentInput type="text" placeholder="내용을 작성해주세요." />
      </InputWrapper>
      <InputWrapper>
        <Text>주소</Text>
        <ZipcodeWrapper>
          <Zipcode placeholder="07250" />
          <SearchButton>우편번호 검색</SearchButton>
        </ZipcodeWrapper>
        <ZipcodeInput />
        <ZipcodeInput2 />
      </InputWrapper>
      <InputWrapper>
        <Text>유튜브</Text>
        <YoutubeInput type="text" placeholder="링크를 복사해주세요." />
      </InputWrapper>
      <ImgWrapper>
        <Text>사진 첨부</Text>
        <ImgButtonWrapper>
          <ImgButton>+</ImgButton>
          <ImgButton>+</ImgButton>
          <ImgButton>+</ImgButton>
        </ImgButtonWrapper>
      </ImgWrapper>
      <OptionWrapper>
        <Text>메인 설정</Text>
        <RadioButton type="radio" />
        <RadioText>유튜브</RadioText>
        <RadioButton type="radio" />
        <RadioText>사진</RadioText>
      </OptionWrapper>
      <ButtonWrapper>
        <SubmitButton>등록하기</SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
