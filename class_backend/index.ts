// const qqq: string = "안녕하세요~~";

// console.log(qqq);

import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// API-DOCS 만들기
const typeDefs = `#graphql
input CreateBoardInput {
  writer: String
  title: String
  contents: String
}

type MyBoard {
  number: Int
  writer: String
  title: String
  contents: String
}

  type Query {
    fetchBoards: [MyBoard]
  }

  type Mutation {
    # 연습용(backend-example 방식)
    # createBoard(writer: String, title: String, contents: String): String

    # 실무용(backend-practice 방식)
    createBoard(createBoardInput: CreateBoardInput): String
  }
`;

// API 만들기
const resolvers = {
  Query: {
    fetchBoards: async () => {
      // 1. 모두 꺼내기
      const result = await Board.find();
      console.log(result);

      // 2. 한개만 꺼내기
      // const result = await Board.find({
      //    where: { number: 3 }
      //    });
      // console.log(result);

      return result;
    },
  },

  Mutation: {
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.insert({
        ...args.createBoardInput,

        // 하나 하나 모두 입력하는 비효율적인 방식
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents,
      });

      return "게시글 등록에 성공했어요!!";
    },

    // updateBoards: async () => {
    //   // 3번 게시글을 영희로 바꿔줘!
    //   await Board.update({ number: 3 }, { writer: "영희" });
    // },

    // deleteBoard: async () => {
    //   await Board.delete({ number: 3 }); // 3번 게시글 삭제해줘!
    //   await Board.update({ number: 3 }, { isDeleted: true }); // 3번 게시글 삭제했다 치자! (소프트삭제) => isDeleted가 false 이면? 삭제 안된거, true 이면? 삭제 된거
    //   await Board.update({ number: 3 }, { deletedAt: new Date() }); // 3번 게시글 삭제했다 치자! (소프틓삭제) => deletedAt이 초기값인 NULL 이면? 삭제 안된거, new Date() 들어가 있으면? 삭제된거
    // },
  },
};

// @ts-ignore
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // 선택한 사이트만 풀어주고 싶을 때
  // cors: {
  //   origin: ["http://naver/com", "http://coupang.com"]
  // }
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "데이터베이스 깔린 컴퓨터 IP 주소",
  port: "데이터베이스 깔린 컴퓨터 포트",
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다!!!");

    startStandaloneServer(server).then(() => {
      console.log("그래프큐엘 서버가 실행되었습니다!!!"); // 포트: 4000
    });
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });
